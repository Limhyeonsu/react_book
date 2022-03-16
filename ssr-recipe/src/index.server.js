import ReactDOMServer from 'react-dom/server';
import express from 'express';
import {StaticRouter} from 'react-router-dom';
import App from './App';
import path from 'path';
import fs from 'fs';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer, {rootSaga} from './modules';
import PreloadContext from './lib/PreloadContext';
import as from 'postcss-preset-env';
import createSagaMiddleware from 'redux-saga';
import {END} from 'redux-saga';
import {ChunkExtractor, ChunkExtractorManager} from '@loadable/server';

const statsFile = path.resolve('./build/loadable-stats.json');

function createPage(root, tags) {
  return `<!DOCTYPE html>
  <html lang='en'>
  <head>
    <meta charset='utf-8' />
    <link rel='shortcut icon' href='/favicon.ico' />
    <meta
      name='viewport'
      content='width=device-width, initial-scale=1, shrink-to-fit=no'
    />
    <meta name='theme-color' content='#000000' />
    <title>React App</title>
   ${tags.styles}
   ${tags.links}
  }
  </head>
  <body>
    <noscript> YOU need to enable JavaScript to run this app.</noscript>
    <div id='root'>
      ${root}
    </div>
    ${tags.scripts}
  </body>
  </html>
  `;
}

const app = express();

//서버 사이드 렌더링을 처리할 핸들러 함수
//404가 떠야하는 상황에서 404를 띄우지 않고 서버 사이드 렌더링을 해준다.
const serverRender = async (req, res, next) => {
  const context = {};
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

  const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();

  const preloadContext = {
    dong: false,
    promise: []
  };

  //필요한 파일을 추출하기 위한 ChunkExtractor
  const extractor = new ChunkExtractor({statsFile});

  const jsx = (
    <ChunkExtractorManager extractor={extractor}>
      <PreloadContext.Provider value={preloadContext}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </PreloadContext.Provider>
    </ChunkExtractorManager>
  );

  ReactDOMServer.renderToStaticMarkup(jsx);
  store.dispatch(END); //END액션을 발생시키면 액션을 모니터링하는 사가들이 모두 종료된다.
  try {
    await sagaPromise; //기존에 진행중이던 사가들이 모두 끝날때까지 기다린다.
    await Promise.all(preloadContext.promise);
  } catch (e) {
    return res.state(500);
  }
  preloadContext.done = true;
  const root = ReactDOMServer.renderToString(jsx);

  //JSON을 문자열로 변환하고, 악성 스크립트가 실행되는 것 방지하기 위해 < 치환
  const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u300c');
  const stateScript = `<script>__PRELOADED_STATE__= ${stateString}</script>`; //리덕스 초기 상태를 스크립트로 주입

  const tags = {
    scripts: stateScript + extractor.getScriptTags(),
    links: extractor.getLinkTags(),
    styles: extractor.getStyleTags()
  };

  res.send(createPage(root, tags)); //클라이언트에게 결과물을 응답
};

const serve = express.static(path.resolve('./build'), {
  index: false // /경로에서 index.html을 보여주지 않도록 설정
});

app.use(serve);
app.use(serverRender);

//5000번 포트로 서도 가동
app.listen(5000, () => {
  console.log('Running on http://localhost:5000');
});
const html = ReactDOMServer.renderToString(<div>Hello Server Side Rendering!</div>);

console.log(html);
