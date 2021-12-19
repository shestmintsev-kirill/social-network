import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getStatus, updateStatus, savePhoto, updateProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

type MapStatePropsType = {
  profile: ProfileType,
  status: string,
  authorizedUserId: number,
  isAuth: boolean,
  errors: Array<string>
}

type MapDispatchPropsType = {
  getUserProfile: (id:number) => void
  getStatus: (id:number) => void
  updateStatus: (status:string) => void
  savePhoto: (file:any) => void
  updateProfile: (payload: ProfileType) => void
}

type OwnPropsType = {
  match: any,
  history: any
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

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
    console.log(this.props);
    this.refreshProfile();
  }

  componentDidUpdate(oldProps:any) {
    if (this.props.match.params.userId !== oldProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        updateProfile={this.props.updateProfile}
        authorizedUserId={this.props.authorizedUserId}
        errors={this.props.errors}
      />
    )
  }
}

let mapStateToProps = (state:AppStateType) => {
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