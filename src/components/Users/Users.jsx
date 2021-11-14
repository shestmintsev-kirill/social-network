import s from './Users.module.css';
import userPhoto from '../../assets/images/avatar.png';

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (<div>
    <div>
      {pages.map(page => <span onClick={() => { props.onPageChanged(page) }} key={page} className={`${s.page} ${props.currentPage === page && s.activePage}`}>{page}</span>)}
    </div>
    {props.users.map(user => <div key={user.id}>
      <div>
        <div className={s.avatarWrapper}>
          <img src={user.photos.small ? user.photos.small : userPhoto} alt="user" />
        </div>
        <div>
          {user.followed
            ? <button onClick={() => { props.unfollow(user.id) }}>Unfollow</button>
            : <button onClick={() => { props.follow(user.id) }}>Follow</button>}
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