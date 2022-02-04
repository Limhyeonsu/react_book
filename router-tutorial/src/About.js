import qs from 'qs';
//import {useLocation, useParams} from 'react-router-dom';

const About = ({location}) => {
  //const location1 = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true //문자열 맨 앞의 ? 생략
  });
  //쿼리의 파싱 결과 값은 언제나 문자열임 숫자를 받아와야 하는 경우 parseInt()를 통하여 숫자로 변환해준다.
  const showDetail = query.detail === 'true';
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트 입니다.</p>
      {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
    </div>
  );
};

export default About;
