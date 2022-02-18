const Sample = ({loadingPost, loadingUsers, post, users}) => {
  return (
    <div>
      <section>
        <h1>포스트</h1>
        {loadingPost && '로딩 중...'} {/* 데이터 렌더링시 유효성 검사를 해주는 것이 중요하다. */}
        {!loadingPost && post && (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        )}
      </section>
      <hr />
      <section>
        <h1>사용자 목록</h1>
        {loadingUsers && '로딩 중...'}
        {!loadingUsers && users && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Sample;
