import s from './Users.module.css';
import userPhoto from '../../assets/images/avatar.png';
import { NavLink } from 'react-router-dom';

const User = ({ user, followingInProgress, unFollow, follow }) => {

  return (
    <div>
      <div>
        <div className={s.avatarWrapper}>
          <NavLink to={'/profile/' + user.id}>
            <img src={user.photos.small ? user.photos.small : userPhoto} alt="user" />
          </NavLink>
        </div>
        <div>
          {user.followed
            ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
              unFollow(user.id)
            }}>Unfollow</button>
            : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
              follow(user.id)
            }}>Follow</button>}
        </div>
      </div>
      <div>
        <div>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </div>
      </div>
    </div>
  )
}


export default User