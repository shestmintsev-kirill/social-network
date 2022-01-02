import React, { ChangeEvent, useEffect, useState } from 'react';
import { ProfileType } from '../../../types/types';
import Preloader from '../../common/Preloader/Preloader';
import ProfileDescriptionForm from './ProfileDescriptionForm';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

type ProfileInfoPropsType = {
    profile: ProfileType;
    status: string;
    isOwner: boolean;
    authorizedUserId: number;
    errors: Array<string>;
    updateStatus: (status: string) => void;
    savePhoto: (file: File) => void;
    updateProfile: (payload: ProfileType) => void;
};

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
    profile,
    status,
    updateStatus,
    isOwner,
    savePhoto,
    updateProfile,
    authorizedUserId,
    errors,
}) => {
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (errors.length) {
            setEditMode(true);
        }
    }, [errors, authorizedUserId]);

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    };

    if (!profile) {
        return <Preloader />;
    }

    return (
        <div>
            <div className={s.avatar}>
                <img
                    src={
                        profile?.photos?.large ||
                        'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'
                    }
                    alt="avatar"
                />
                {isOwner && editMode && (
                    <input type={'file'} accept=".png, .jpg, .jpeg" onChange={onMainPhotoSelected} />
                )}
            </div>
            {!editMode ? (
                <ProfileDescription profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)} />
            ) : (
                <ProfileDescriptionForm
                    errors={errors}
                    authorizedUserId={authorizedUserId}
                    updateProfile={updateProfile}
                    profile={profile}
                    closeEditMode={() => setEditMode(false)}
                />
            )}
            <ProfileStatus status={status} updateStatus={updateStatus} isOwner={isOwner} />
        </div>
    );
};

type ProfileDescriptionPropsType = {
    profile: ProfileType;
    isOwner: boolean;
    goToEditMode: () => void;
};

const ProfileDescription: React.FC<ProfileDescriptionPropsType> = ({ profile, isOwner, goToEditMode }) => {
    const profileContacts = Object.entries(profile?.contacts).map((contact: Array<string>, index: number) => {
        return contact[1] ? (
            <li key={index}>
                <strong>{contact[0]}: </strong>
                {contact[1]}
            </li>
        ) : (
            false
        );
    });

    return (
        <form>
            {isOwner && <button onClick={goToEditMode}>Edit profile</button>}
            <p>
                <strong>Имя:</strong> {profile?.fullName}
            </p>
            {profile?.aboutMe && (
                <p>
                    <strong>Обо мне: </strong>
                    {profile?.aboutMe}
                </p>
            )}
            {profile?.lookingForAJob && (
                <p>
                    <strong>В поиске работы: </strong>
                    {profile?.lookingForAJobDescription}
                </p>
            )}
            {<ul>{profileContacts}</ul>}
        </form>
    );
};

export default ProfileInfo;
