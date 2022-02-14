//1. 액션 타입 정의 : 액션 타입은 대문자로 정의, 문자열 내용은 '모듈이름/액션이름' 형태로 작성
import { createAction, handleActions } from 'redux-actions';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//2. 액션 생성 함수 : 앞 부분에 export 키워드가 들어감
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//3. 초기 상태 및 리듀서 함수 만들기
const initialState = {
  number: 0,
};

//handleActions의 첫 번째 파라미터 : 각 액션에 대한 업데이트 함수, 두 번째 파라미터 : 초기 상태
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);
export default counter;
