import Pagination from '../common/Paginate/Pagination';
import User from './User';

const Users = (props) => {

  return (
    <div>
      {props.users.map(user =>
        <User
          user={user}
          followingInProgress={props.followingInProgress}
          unFollow={props.unFollow}
          follow={props.follow}
          key={user.id}
        />
      )}
      <Pagination
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
      />
    </div>
  )
}

export default Users