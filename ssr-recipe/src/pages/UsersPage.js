// import UsersContainer from '../components/UsersContainer';
//
// const UsersPage = () => {
//   return <UsersContainer />;
// };
//
// export default UsersPage;

import UsersContainer from '../containers/UsersContainer';
import UserContainer from '../containers/UserContainer';
import {Route} from 'react-router-dom';

const UsersPage = () => {
  return (
    <>
      <UsersContainer />
      <Route path="/users/:id" render={({match}) => <UserContainer id={match.params.id} />} />
    </>
  );
};

export default UsersPage;
