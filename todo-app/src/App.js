import { useReducer, useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
    const array = [];
    for(let i = 1; i <= 2500; i++) {
        array.push({
            id:i,
            text: `할 일 ${i}`,
            checked: false,
        });
    }
    return array;
}

function todoReducer(todos, action) {
    switch (action.type) {
        case 'INSERT' :
            return todos.concat(action.todo);
        case 'REMOVE' :
            return todos.filter(todo => todo.id !== action.id);
        case 'TOGGLE' :
            return todos.map(todo => todo.id === action.id ? {...todo, checked: !todo.checked} : todo,);
        default :
            return todos;
    }
}

const App = () => {
    const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  //고윳값으로 사용될 id, ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  //등록
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch({type: 'INSERT', todo});
      nextId.current += 1;
    },
    [],
  );

  //삭제
  const onRemove = useCallback(
    (id) => {
        dispatch({type:'REMOVE', id});
    },
    [],
  );

  //수정
  const onToggle = useCallback(
    (id) => {
        dispatch({type:'TOGGLE', id});
    },
    [],
  );
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
