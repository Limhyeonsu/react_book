import axios from 'axios';

const GET_USER_PENDING = 'users/GET_USER_PENDING';
const GET_USER_SUCCESS = 'users/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'users/GET_USER_FAILURE';

const getUsersPending = () => ({type: GET_USER_PENDING});
const getUsersSuccess = (payload) => ({type: GET_USER_SUCCESS, payload});
const getUsersFailure = (payload) => ({
  type: GET_USER_FAILURE,
  error: true,
  payload
});

export const getUsers = () => async (dispatch) => {
  try {
    dispatch(getUsersPending());

    const resp = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch(getUsersSuccess(resp));
  } catch (e) {
    dispatch(getUsersFailure(e));
    throw e;
  }
};

const initalState = {
  users: null,
  user: null,
  loading: {
    users: false,
    user: false
  },
  error: {
    users: null,
    user: null
  }
};

function users(state = initalState, action) {
  switch (action.type) {
    case GET_USER_PENDING:
      return {...state, loading: {...state.loading, users: true}};
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: {...state.loading, user: false},
        users: action.payload.data
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: {...state.loading, users: false},
        error: {...state.error, users: action.payload}
      };
    default:
      return state;
  }
}

export default users;
