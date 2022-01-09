import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';

type PropsType = {
    isOwner?: boolean;
    status: string;
    updateStatus?: (status: string) => void;
};
const ProfileStatus: React.FC<PropsType> = ({ isOwner = false, status, updateStatus = (x) => x }) => {
    const [editMode, setEditMode] = useState(false);
    const [profileStatus, setStatus] = useState<string>(status);
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
                    <strong>Status:</strong>{' '}
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
                        <strong>Status:</strong> {status || 'Нет статуса'}
                    </span>
                    {isOwner && <EditOutlined style={{ marginLeft: 10 }} onClick={activateEditMode} />}
                </div>
            )}
        </div>
    );
};

export default ProfileStatus;
