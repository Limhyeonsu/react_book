import {handleActions} from 'redux-actions';
import * as api from '../lib/api';
import createRequestThunk from '../lib/createRequestThunk';

//1. 액션 타입 선언
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
//const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
//const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

//2. thunk 함수 생성 : 함수 내부에서는 시작시, 성공시, 실패시 다른 액션을 디스패치 한다.
export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

//3. 초기 상태 선언
const initialState = {
  /*
  loading: {
    GET_POST: false,
    GET_USERS: false
  },
  */
  post: null,
  user: null
};

const sample = handleActions(
  {
    // [GET_POST]: (state) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_POST: true
    //   }
    // }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      // loading: {
      //   ...state.loading,
      //   GET_POST: false
      // },
      post: action.payload
    }),
    // [GET_USERS]: (state) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_USERS: true
    //   }
    // }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      // loading: {
      //   ...state.loading,
      //   GET_USERS: false
      // },
      users: action.payload
    })
  },
  initialState
);

export default sample;
