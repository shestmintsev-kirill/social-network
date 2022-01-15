import React, { useState } from 'react';
import { Input, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import { useInput } from '../../../Hooks/useInput';

type PropsType = {
    isOwner?: boolean;
    status: string;
    updateStatus?: (status: string) => void;
};
const ProfileStatus: React.FC<PropsType> = ({ isOwner = false, status, updateStatus = (x) => x }) => {
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();

    const inputStatus = useInput(status);

    const activateEditMode = () => {
        if (!isOwner) {
            return;
        }
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        dispatch(updateStatus(inputStatus.value));
    };

    return (
        <div>
            {editMode ? (
                <div>
                    <strong>Status:</strong>{' '}
                    <Input
                        {...inputStatus}
                        onBlur={deactivateEditMode}
                        style={{ maxWidth: 400 }}
                        autoFocus
                        type="text"
                    />
                </div>
            ) : (
                <div>
                    <span>
                        <strong>Status:</strong> {status || 'Нет статуса'}
                    </span>
                    {isOwner && (
                        <Tooltip placement="right" title={'Edit status'}>
                            <EditOutlined style={{ marginLeft: 10 }} onClick={activateEditMode} />
                        </Tooltip>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileStatus;
