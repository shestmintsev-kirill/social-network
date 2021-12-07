import React from 'react';
// import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        updateProfile={props.updateProfile}
        authorizedUserId={props.authorizedUserId}
        errors={props.errors}
      />
      <MyPostsContainer />
    </div>
  );
}

export default Profile;