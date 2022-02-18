import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './modules';
import {Provider} from 'react-redux';
import loggerMiddleware from './lib/loggerMiddleware';
import {createLogger} from 'redux-logger/src';
import ReduxThunk from 'redux-thunk';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);