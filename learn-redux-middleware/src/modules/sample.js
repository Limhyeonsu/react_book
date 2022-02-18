import {handleActions} from 'redux-actions';
import * as api from '../lib/api';

//1. 액션 타입 선언
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

//2. thunk 함수 생성 : 함수 내부에서는 시작시, 성공시, 실패시 다른 액션을 디스패치 한다.
export const getPost = (id) => async (dispatch) => {
  dispatch({type: GET_POST}); //요청 시작 알림
  try {
    const response = await api.getPost(id);
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data
    }); //요청 성공
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
      error: true
    }); //에러 발생
    throw e;
  }
};

export const getUsers = () => async (dispatch) => {
  dispatch({type: GET_USERS}); //요청 시작 알림
  try {
    const response = await api.getUsers();
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data
    }); //요청 성공
  } catch (e) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true
    }); //에러 발생
    throw e;
  }
};

//3. 초기 상태 선언
const initialState = {
  loading: {
    GET_POST: false,
    GET_USERS: false
  },
  post: null,
  user: null
};

const sample = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: true
      }
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false
      },
      post: action.payload
    }),
    [GET_POST_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false
      }
    }),
    [GET_USERS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: true
      }
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false
      },
      users: action.payload
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false
      }
    })
  },
  initialState
);

export default sample;
