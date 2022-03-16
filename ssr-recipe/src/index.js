import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer, {rootSaga} from './modules';
import createSagaMiddleware from 'redux-saga';
import {loadableReady} from '@loadable/component';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, window.__PRELOADED_STATE__, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(rootSaga);

//같은 내용을 쉽게 재사용할 수 있도록 렌더링할 내용을 하나의 컴포넌트로 묶음
const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

const root = document.getElementById('root');

//프로덕션 환경에서는 loadableReady와 hydrate를 사용하고 개발 환경에서는 기존 방식으로 처리
if (process.env.NODE_ENV === 'production') {
  loadableReady(() => {
    ReactDOM.hydrate(<Root />, root);
  });
} else {
  ReactDOM.render(<Root />, root);
}
