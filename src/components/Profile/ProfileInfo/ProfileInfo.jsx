import React, { useEffect, useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import ProfileDescriptionForm from './ProfileDescriptionForm';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, updateProfile, authorizedUserId, errors }) => {

  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (errors.length) {
      setEditMode(true);
    }
  }, [errors, authorizedUserId])

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  if (!profile) {
    return <Preloader />
  }

  return (
    <div>
      <div className={s.avatar}>
        <img src={profile?.photos?.large || 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'}
          alt="avatar"
        />
        {isOwner && editMode && <input type={'file'} accept=".png, .jpg, .jpeg" onChange={onMainPhotoSelected} />}
      </div>
      {
        !editMode
          ? <ProfileDescription
            profile={profile}
            isOwner={isOwner}
            goToEditMode={() => setEditMode(true)}
          />
          : <ProfileDescriptionForm
            errors={errors}
            authorizedUserId={authorizedUserId}
            updateProfile={updateProfile}
            profile={profile}
            closeEditMode={() => setEditMode(false)}
          />
      }
      <ProfileStatus
        status={status}
        updateStatus={updateStatus}
        isOwner={isOwner}
      />
    </div >
  );
}

const ProfileDescription = ({ profile, isOwner, goToEditMode }) => {

  let profileContacts = Object.entries(profile?.contacts).map((contact, index) => {
    return contact[1]
      ? <li key={index}><strong>{contact[0]}: </strong>{contact[1]}</li>
      : false
  })

  return (
    <form>
      {isOwner && <button onClick={goToEditMode}>Edit profile</button>}
      <p><strong>Имя:</strong> {profile?.fullName}</p>
      {profile?.aboutMe && <p><strong>Обо мне: </strong>{profile?.aboutMe}</p>}
      {profile?.lookingForAJob && <p><strong>В поиске работы: </strong>{profile?.lookingForAJobDescription}</p>}
      {<ul>{profileContacts}</ul>}
    </form>
  )
}

export default ProfileInfo;