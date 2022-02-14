import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import rootReducer from './modules';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

//1. 스토어 생성
// composeWithDevTools : 리덕스 개발자 도구 패키지
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  // 2.스토어를 사용할 수 있도록 <App>을 <Provider>로 감싸준다.(이때 store를 props로 전달해야함)
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
