import Categories from '../components/Categories';
import NewsList from '../components/NewsList';

const NewsPage = ({ match }) => {
  //카테고리가 선택되지 않았으면 기본값 all 사용
  const categoty = match.params.category || 'all';

  return (
    <>
      <Categories />
      <NewsList category={categoty} />
    </>
  );
};

export default NewsPage;
