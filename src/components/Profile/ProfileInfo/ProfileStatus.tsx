import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { updateStatus } from '../../../redux/profile-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { EditOutlined } from '@ant-design/icons';

type PropsType = {
    isOwner?: boolean;
};
const ProfileStatus: React.FC<PropsType> = ({ isOwner = false }) => {
    const status = useSelector((state: AppStateType) => state.profilePage.status);
    const [editMode, setEditMode] = useState(false);
    const [profileStatus, setStatus] = useState(status);
    const dispatch = useDispatch();

    useEffect(() => {
        setStatus(status);
    }, [status]);

    const activateEditMode = () => {
        if (!isOwner) {
            return;
        }
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        dispatch(updateStatus(profileStatus));
    };

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value);
    };

    return (
        <div>
            {editMode ? (
                <div>
                    Статус:{' '}
                    <Input
                        onChange={onStatusChange}
                        onBlur={deactivateEditMode}
                        style={{ maxWidth: 400 }}
                        autoFocus
                        type="text"
                        value={profileStatus}
                    />
                </div>
            ) : (
                <div>
                    <span>
                        <strong>Статус:</strong> {status || 'Нет статуса'}
                    </span>
                    {isOwner && <EditOutlined style={{ marginLeft: 10 }} onClick={activateEditMode} />}
                </div>
            )}
        </div>
    );
};

export default ProfileStatus;
