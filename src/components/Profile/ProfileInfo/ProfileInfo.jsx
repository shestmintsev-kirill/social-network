import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
  return (
    <div>
      <div>
        <img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350" alt="" />
      </div>
      <div className={s.descriptionBlock}>
        <img src={props.profile?.photos?.large} alt="avatar" />
      </div>
      <p>Имя: {props.profile?.fullName}</p>
      {props.profile?.aboutMe && <p>Обо мне: {props.profile?.aboutMe}</p>}
      {props.profile?.lookingForAJob && <p>В поиске работы: {props.profile?.lookingForAJobDescription}</p>}
    </div>
  );
}

export default ProfileInfo;