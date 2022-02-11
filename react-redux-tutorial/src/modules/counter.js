//1. 액션 타입 정의 : 액션 타입은 대문자로 정의, 문자열 내용은 '모듈이름/액션이름' 형태로 작성
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//2. 액션 생성 함수 : 앞 부분에 export 키워드가 들어감
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

//3. 초기 상태 및 리듀서 함수 만들기
const initialState = {
  number: 0,
};

function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
}
export default counter;
