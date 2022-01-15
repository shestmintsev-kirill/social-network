import React, { useState } from 'react';
import photoMock from '../../assets/images/avatar.png';
import s from './Dialogs.module.css';
import { useFormik } from 'formik';
import { Textarea } from '../common/FormsControls/FormsControls';
import { actions, DialogType, MessageType } from '../../redux/dialogs-reducer';
import { Button, Comment, Avatar, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { useIsAuth } from '../../Hooks/useIsAuth';

const Dialogs: React.FC = () => {
    useIsAuth();

    const [currentUser, setCurrentUser] = useState<number>(0);
    const dialogsPage = useSelector((state: AppStateType) => state.dialogsPage);

    const dialogsElements = dialogsPage.dialogs.map((d: DialogType) => (
        <div key={d.id} className={s.dialog}>
            <Button style={{ width: 80 }} onClick={() => setCurrentUser(d.id - 1)}>
                {d.name}
            </Button>
        </div>
    ));

    const messagesElements = dialogsPage.messages.map((m: MessageType, index: number) => (
        <div key={index}>
            <Comment
                author={dialogsPage.dialogs[currentUser].name}
                avatar={<Avatar src={photoMock} alt="photo" />}
                content={<p>{m.message}</p>}
            />
            <Divider />
        </div>
    ));

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <MessageForm />
                </div>
            </div>
        </div>
    );
};

type MessageValuesType = {
    message: string;
};

const MessageForm: React.FC = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: (values: MessageValuesType, { resetForm }) => {
            dispatch(actions.sendMessage(values.message));
            resetForm();
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Textarea
                name={'message'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.message}
                placeholder={'Enter your message'}
            />
            <div>
                <Button disabled={!formik.dirty} htmlType="submit">
                    Send
                </Button>
            </div>
        </form>
    );
};

export default Dialogs;
