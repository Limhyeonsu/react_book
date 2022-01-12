import "./App.css";
import { Fragment } from "react";

function App() {
  const name = "리액트";
  return (
    <>
      {/* 주석 작성 */}
      <div
        className="react" //시작 태그 < 를 여러 줄로 작성하면 이 안에 주석 작성 가능
      >
        {name}
      </div>
      // 주석 아님1 /* 주석 아님2*/
      <input />
    </>
  );
}
export default App;
