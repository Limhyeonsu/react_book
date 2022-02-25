import {startLoading, finishLoading} from '../modules/loading';

export default function createRequestThunk(type, req) {
  //성공 및 실패 액션 타입을 정의
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({type}); //시작
    dispatch(startLoading(type));

    try {
      const resp = await req(params);
      dispatch({
        type: SUCCESS,
        payload: resp.data
      }); //성공
      dispatch(finishLoading(type));
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true
      }); //에러
      dispatch(startLoading(type));
      throw e;
    }
  };
}
