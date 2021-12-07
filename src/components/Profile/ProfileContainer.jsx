import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getStatus, updateStatus, savePhoto, updateProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId ?? this.props.authorizedUserId;
    if (!userId) {
      this.props.history.push('/login');
    } else {
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(oldProps) {
    if (this.props.match.params.userId !== oldProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        updateProfile={this.props.updateProfile}
      />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    errors: state.profilePage.errors
  }
}


export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, updateProfile }),
  withRouter,
)(ProfileContainer);