import React, { ChangeEvent, useEffect, useState } from 'react';
import { ProfileType } from '../../../types/types';
import Preloader from '../../common/Preloader/Preloader';
import ProfileDescriptionForm from './ProfileDescriptionForm';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AppStateType } from '../../../redux/redux-store';
import { getStatus, getUserProfile, savePhoto } from '../../../redux/profile-reducer';

const ProfileInfo: React.FC = () => {
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ userId?: string }>();
    const profile = useSelector((state: AppStateType) => state.profilePage.profile);
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId);
    const errors = useSelector((state: AppStateType) => state.profilePage.errors);

    useEffect(() => {
        const userId = params?.userId ?? authorizedUserId;
        if (!userId) {
            history.push('/login');
        } else {
            dispatch(getUserProfile(userId as number));
            dispatch(getStatus(userId as number));
        }
    }, [authorizedUserId, dispatch, history, params.userId]);

    useEffect(() => {
        if (errors.length) {
            setEditMode(true);
        }
    }, [errors, authorizedUserId, errors.length]);

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(savePhoto(e.target.files[0]));
        }
    };

    if (!profile) {
        return <Preloader />;
    }

    return (
        <div>
            <div className={s.avatar}>
                <img
                    style={{ width: '300px' }}
                    src={
                        profile?.photos?.large ||
                        'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'
                    }
                    alt="avatar"
                />
                {!params?.userId && editMode && (
                    <input type={'file'} accept=".png, .jpg, .jpeg" onChange={onMainPhotoSelected} />
                )}
            </div>
            {!editMode ? (
                <ProfileDescription
                    profile={profile}
                    isOwner={!params?.userId}
                    goToEditMode={() => setEditMode(true)}
                />
            ) : (
                <ProfileDescriptionForm
                    errors={errors}
                    authorizedUserId={authorizedUserId}
                    profile={profile}
                    closeEditMode={() => setEditMode(false)}
                />
            )}
            <ProfileStatus isOwner={!params?.userId} />
        </div>
    );
};

type ProfileDescriptionPropsType = {
    profile: ProfileType;
    isOwner: boolean;
    goToEditMode: () => void;
};

const ProfileDescription: React.FC<ProfileDescriptionPropsType> = ({ profile, isOwner, goToEditMode }) => {
    const profileContacts = Object.entries(profile?.contacts).map((contact: string[], index: number) => {
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
            {isOwner && <Button onClick={goToEditMode}>Edit profile</Button>}
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
