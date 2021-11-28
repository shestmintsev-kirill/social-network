import React from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus.jsx'

const ProfileInfo = (props) => {
  return (
    <div>
      {/* <div>
        <img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350" alt="prev" />
      </div> */}
      <div className={s.descriptionBlock}>
        <img src={props.profile?.photos?.large
          ? props.profile?.photos?.large
          : 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'}
          alt="avatar" />
      </div>
      <p>Имя: {props.profile?.fullName}</p>
      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
      {props.profile?.aboutMe && <p>Обо мне: {props.profile?.aboutMe}</p>}
      {props.profile?.lookingForAJob && <p>В поиске работы: {props.profile?.lookingForAJobDescription}</p>}
    </div>
  );
}

export default ProfileInfo;