import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getAuthUserData, getStatus, updateStatus } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 20864
    }
    this.props.getAuthUserData(userId);
    this.props.getStatus(userId);
  }

  render() {
    return (
      <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status
  }
}


export default compose(
  connect(mapStateToProps, { getAuthUserData, getStatus, updateStatus }),
  withRouter,
  // withAuthRedirect
)(ProfileContainer);