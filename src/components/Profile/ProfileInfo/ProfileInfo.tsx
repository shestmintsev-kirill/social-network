import React, { useEffect, useState } from 'react';
import userPhoto from '../../../assets/images/avatar.png';
import { ProfileType } from '../../../types/types';
import ProfileDescriptionForm from './ProfileDescriptionForm';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AppStateType } from '../../../redux/redux-store';
import { actions, getStatus, getUserProfile, updateStatus } from '../../../redux/profile-reducer';
import { Card, Button, Upload, Divider, Image, message, Skeleton, Descriptions } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { apiKey } from '../../../api/api';
import ProfileStatus from './ProfileStatus';

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
    }, [errors]);

    const onMainPhotoSelected = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.response?.data?.photos) {
            dispatch(actions.savePhotoSuccess(info.file.response?.data?.photos));
            message.success('New photo is uploaded');
        }
    };

    if (!profile) {
        return <Skeleton active />;
    }

    return (
        <Card
            style={{ maxWidth: '100%' }}
            cover={
                <div>
                    <Image style={{ maxWidth: '300px' }} src={profile?.photos?.large || userPhoto} />
                </div>
            }
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
                <>
                    <ProfileDescription profile={profile} isOwner={!params?.userId} />
                </>
            ) : (
                <ProfileDescriptionForm
                    errors={errors}
                    authorizedUserId={authorizedUserId}
                    profile={profile}
                    closeEditMode={() => {
                        setEditMode(false);
                    }}
                />
            )}
        </Card>
    );
};

type ProfileDescriptionPropsType = {
    profile: ProfileType;
    isOwner: boolean;
};

const ProfileDescription: React.FC<ProfileDescriptionPropsType> = ({ profile, isOwner }) => {
    const status = useSelector((state: AppStateType) => state.profilePage.status);

    const profileContacts = Object.entries(profile?.contacts).map(
        (contact: Array<string | null>, index: number) => {
            const [name, value] = contact;
            return (
                value && (
                    <div key={index}>
                        <a href={value} target="_blank" style={{ whiteSpace: 'nowrap' }} rel="noreferrer">
                            {name}
                        </a>
                    </div>
                )
            );
        }
    );

    return (
        <>
            <ProfileStatus isOwner={isOwner} status={status} updateStatus={updateStatus} />
            <Descriptions bordered>
                <Descriptions.Item style={{ whiteSpace: 'nowrap' }} label="Name">
                    {profile?.fullName}
                </Descriptions.Item>
                {profile?.aboutMe && (
                    <Descriptions.Item label="About me">{profile?.aboutMe}</Descriptions.Item>
                )}
                {profile?.lookingForAJob && (
                    <Descriptions.Item label="Looking for a job description">
                        {profile?.lookingForAJobDescription}
                    </Descriptions.Item>
                )}
                {profileContacts.some((p) => !!p) && (
                    <Descriptions.Item label="Contacts">{profileContacts}</Descriptions.Item>
                )}
            </Descriptions>
        </>
    );
};

export default ProfileInfo;
