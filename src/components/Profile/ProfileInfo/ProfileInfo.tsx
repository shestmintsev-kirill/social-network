import React, { useEffect, useState } from 'react';
import userPhoto from '../../../assets/images/avatar.png';
import { ProfileType } from '../../../types/types';
import Preloader from '../../common/Preloader/Preloader';
import ProfileDescriptionForm from './ProfileDescriptionForm';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AppStateType } from '../../../redux/redux-store';
import { actions, getStatus, getUserProfile } from '../../../redux/profile-reducer';
import { Card, Button, Upload, Divider, Image, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { apiKey } from '../../../api/api';

const { Meta } = Card;

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
        errors.forEach((err) => {
            message.error(err);
        });
    }, [errors, authorizedUserId]);

    const onMainPhotoSelected = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.response?.data?.photos) {
            dispatch(actions.savePhotoSuccess(info.file.response?.data?.photos));
            message.success('New photo is uploaded');
        }
    };

    if (!profile) {
        return <Preloader />;
    }

    return (
        <Card
            style={{ maxWidth: '100%' }}
            cover={<Image width={300} src={profile?.photos?.large || userPhoto} />}
            actions={[
                <div>
                    {!params?.userId && !editMode && (
                        <Button onClick={() => setEditMode(true)}>Edit profile</Button>
                    )}
                </div>
            ]}
        >
            {!params?.userId && editMode && (
                // <input type={'file'} accept=".png, .jpg, .jpeg" onChange={onMainPhotoSelected1} />
                <>
                    <ImgCrop rotate>
                        <Upload
                            withCredentials
                            action="https://social-network.samuraijs.com/api/1.0/profile/photo"
                            onChange={onMainPhotoSelected}
                            headers={{ 'API-KEY': apiKey }}
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>Upload new photo</Button>
                        </Upload>
                    </ImgCrop>
                    <Divider />
                </>
            )}
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
                    closeEditMode={() => {
                        setEditMode(false);
                        message.success('Profile is saved');
                    }}
                />
            )}
        </Card>
    );
};

type ProfileDescriptionPropsType = {
    profile: ProfileType;
    isOwner: boolean;
    goToEditMode: () => void;
};

const ProfileDescription: React.FC<ProfileDescriptionPropsType> = ({ profile, isOwner, goToEditMode }) => {
    const profileContacts = Object.entries(profile?.contacts).map((contact: string[], index: number) => {
        const [name, value] = contact;
        return value ? <Meta key={index} title={name} description={value} /> : false;
    });

    return (
        <div>
            <Meta title={`Имя: ${profile?.fullName}`} />
            {profile?.aboutMe && <Meta title={`Обо мне: ${profile?.aboutMe}`} />}
            {profile?.lookingForAJob && (
                <Meta title={`В поиске работы: ${profile?.lookingForAJobDescription}`} />
            )}
            {profileContacts}
        </div>
    );
};

export default ProfileInfo;
