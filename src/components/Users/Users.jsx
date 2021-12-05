import Pagination from '../common/Paginate/Pagination';
import Preloader from '../common/Preloader/Preloader';
import User from './User';

const Users = (props) => {

  return (
    <div>
      <Pagination
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
      />

      {props.isFetching && <Preloader />}

      {!props.isFetching && props.users.map(user =>
        <User
          user={user}
          followingInProgress={props.followingInProgress}
          unFollow={props.unFollow}
          follow={props.follow}
          key={user.id}
        />
      )}
    </div>
  )
}

export default Users