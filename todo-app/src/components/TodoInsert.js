import { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  //useCallback: 한 번 함수를 만들고 재사용할 수 있도록 사용
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue('');

      e.preventDefault(); //submit 이벤트는 브라우저에서 새로고침을 발생시키므로 이를 방지하기 위해 사용
    },
    [onInsert, value],
  );
  return (
    //onSubmit으로 하면 인풋에서 엔터를 눌러도 이벤트 발생, onClick은 인풋에서 onKeyPress 추가 필요
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
