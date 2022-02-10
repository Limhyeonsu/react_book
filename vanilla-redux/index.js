import {createStore} from 'redux';

const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

/**
 * 1. 액션 타입과 액션 생성함수 정의
 *    상태에 변화를 일으키는 것 => '액션', 액션 이름은 문자열 형태 주로 대문자로 작성하고 이름은 고유해야한다.
 */
//액션 이름 정의
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

//액션 생성 함수 작성 : 액션 객체는 type 값을 반드시 갖고 있어야 한다.
const toggleSwitch = () => ({type: TOGGLE_SWITCH});
const increase = (difference) => ({type: INCREASE, difference});
const decrease = () => ({type: DECREASE});

/**
 * 2. 초기값 설정 : 초기값의 형태는 자유
 */
const initialState = {
  toggle: false,
  counter: 0
};

/**
 * 3. 리듀서 함수 정의 : 변화를 일으키는 함수
 *    리듀서에서는 상태의 불변성을 유지하면서 데이터에 변화를 일으켜 주어야 한다. 이때 ...spread 연산자를 사용하면 편하다.
 *    객체의 구조가 복잡하거나 배열도 함께 다루는 경우에는 immer 라이브러리를 사용하면 좋다.
 */
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      () => {
        console.log('ddd');
      };
      return {
        ...state,
        toggle: !state.toggle
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
}

/**
 * 4. 스토어 만들기 : 스토어를 만드는 경우 createStore 함수사용, 함수 파라미터에는 리듀서 함수를 넣어 준다.
 */
const store = createStore(reducer);

/**
 * 5. render 함수 만들기 : 상태가 업데이트될 때마다 호출된다.
 */
const render = () => {
  const state = store.getState(); //현재 상태를 가져온다.

  if (state.toggle) {
    divToggle.classList.add('active');
  } else {
    divToggle.classList.remove('active');
  }

  counter.innerText = state.counter;
};

render();

/**
 * 6. 구독(subscribe)하기 : 상태가 바뀔 때마다 render 함수가 호출되도록 한다. 파라미터로 함수 형태의 값 전달 => 액션이 발생하여 상태가 업데이트될 때마다 함수 호출됨
 */
store.subscribe(render);

/**
 * 7. 액션 발생시키키 (dispatch)
 */
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
