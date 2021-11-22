import s from './Users.module.css';
import userPhoto from '../../assets/images/avatar.png';
import { NavLink } from 'react-router-dom';
import { usersAPI } from '../../api/api';

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        {pages.map(page => <span onClick={() => { props.onPageChanged(page) }} key={page} className={`${s.page} ${props.currentPage === page && s.activePage}`}>{page}</span>)}
      </div>
      {props.users.map(user => <div key={user.id}>
        <div>
          <div className={s.avatarWrapper}>
            <NavLink to={'/profile/' + user.id}>
              <img src={user.photos.small ? user.photos.small : userPhoto} alt="user" />
            </NavLink>
          </div>
          <div>
            {user.followed
              ? <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {

                props.toggleFollowingProgress(true, user.id);

                usersAPI.getUnFollow(user.id).then((data) => {
                  if (data.resultCode === 0) {
                    props.unFollow(user.id)
                  }
                  props.toggleFollowingProgress(false, user.id);
                })

              }}>Unfollow</button>
              : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {

                props.toggleFollowingProgress(true, user.id);

                usersAPI.getFollow(user.id).then((data) => {
                  if (data.resultCode === 0) {
                    props.follow(user.id)
                  }
                  props.toggleFollowingProgress(false, user.id);
                })

              }}>Follow</button>}
          </div>
        </div>
        <div>
          <div>
            <div>{user.name}</div>
            <div>{user.status}</div>
          </div>
          <div>
            <div>{'user.location.city'}</div>
            <div>{'user.location.country'}</div>
          </div>
        </div>
      </div>)}
    </div>)
}

export default Users