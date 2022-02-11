import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

//여러개의 리듀서를 하나로 합칠때 combineReducers
const rootReducer = combineReducers({
  counter,
  todos,
});
export default rootReducer;
