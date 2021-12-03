import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatus';

const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={profile?.photos?.large
          ? profile?.photos?.large
          : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'}
          alt="avatar" />
      </div>
      <p>Имя: {profile?.fullName}</p>
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      {profile?.aboutMe && <p>Обо мне: {profile?.aboutMe}</p>}
      {profile?.lookingForAJob && <p>В поиске работы: {profile?.lookingForAJobDescription}</p>}
    </div>
  );
}

export default ProfileInfo;