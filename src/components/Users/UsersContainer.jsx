import { connect } from 'react-redux'
import { follow, setCurrentPage, unFollow, toggleFollowingProgress, getUsers } from '../../redux/users-reducer'
import React from 'react';
import Users from './Users'
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersState } from '../../redux/users-selectors';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (page) => {
    this.props.getUsers(page, this.props.pageSize);
    this.props.setCurrentPage(page);
  }

  render() {
    return (
      <div>
        {this.props.isFetching && <Preloader />}
        < Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          follow={this.props.follow}
          unFollow={this.props.unFollow}
          onPageChanged={this.onPageChanged}
          followingInProgress={this.props.followingInProgress}
          toggleFollowingProgress={this.props.toggleFollowingProgress}
        />
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsersState(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
}

export default compose(
  connect(mapStateToProps, {
    follow, unFollow, setCurrentPage, toggleFollowingProgress, getUsers
  }),
)(UsersContainer)