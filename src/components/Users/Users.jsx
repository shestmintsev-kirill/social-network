import s from './Users.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/avatar.png';
import React from 'react';

class Users extends React.Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(res => {
        this.props.setUsers(res.data.items);
        this.props.setTotalUsersCount(res.data.totalCount);
      }).catch(err => { console.warn(err); });
    }
  }

  onPageChanged = (page) => {
    this.props.setCurrentPage(page);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`).then(res => {
      this.props.setUsers(res.data.items);
    }).catch(err => { console.warn(err); });
  }

  render() {

    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return (
      <div>
        <div>
          {pages.map(page => <span onClick={() => { this.onPageChanged(page) }} key={page} className={`${s.page} ${this.props.currentPage === page && s.activePage}`}>{page}</span>)}
        </div>
        {this.props.users.map(user => <div key={user.id}>
          <div>
            <div className={s.avatarWrapper}>
              <img src={user.photos.small ? user.photos.small : userPhoto} alt="user" />
            </div>
            <div>
              {user.followed
                ? <button onClick={() => { this.props.unfollow(user.id) }}>Unfollow</button>
                : <button onClick={() => { this.props.follow(user.id) }}>Follow</button>}
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
      </div>
    )
  }
}

export default Users