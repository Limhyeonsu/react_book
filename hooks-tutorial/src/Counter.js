import {useReducer} from 'react';

function reducer(state, action) {
  //action 타입에 따라 다른 작업 수행
  switch (action.type) {
    case 'INCREMENT':
      return {value: state.value + 1};
    case 'DECREMENT':
      return {value: state.value - 1};
    default:
      return state;
  }
}

const Counter = () => {
  //useReducer의 첫번째 파라미터=리듀서 함수, 두번째 파라미터=리듀서의 기본값
  //state는 현재 가리키고 있는 상태, dispatch는 액션을 발생시키는 함수
  const [state, dispatch] = useReducer(reducer, {value: 0});

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b> 입니다.
      </p>
      <button onClick={() => dispatch({type: 'INCREMENT'})}> +1 </button>
      <button onClick={() => dispatch({type: 'DECREMENT'})}> -1 </button>
    </div>
  );
};
export default Counter;
