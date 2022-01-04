import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

// import s from './ProfileInfo.module.css';

type PropsType = {
    status: string;
    isOwner?: boolean;
    updateStatus?: (status: string) => void;
};
const ProfileStatus: React.FC<PropsType> = ({ status, isOwner = false, updateStatus = (x) => x }) => {
    const [editMode, setEditMode] = useState(false);
    const [profileStatus, setStatus] = useState(status);

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
        updateStatus(profileStatus);
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
                        autoFocus
                        type="text"
                        value={profileStatus}
                    />
                </div>
            ) : (
                <div>
                    <span onDoubleClick={activateEditMode}>
                        <strong>Статус:</strong> {status || 'Нет статуса'}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProfileStatus;
