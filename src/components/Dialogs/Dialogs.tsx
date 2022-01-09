import React, { useState } from 'react';
import photoMock from '../../assets/images/avatar.png';
import s from './Dialogs.module.css';
import { useFormik } from 'formik';
import { Textarea } from '../common/FormsControls/FormsControls';
import { DialogType, InitialDialogsStateType, MessageType } from '../../redux/dialogs-reducer';
import { Button, Comment, Avatar, Divider } from 'antd';

type DialogsPropsType = {
    dialogsPage: InitialDialogsStateType;
    sendMessage: (message: string) => void;
};

const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const [currentUser, setCurrentUser] = useState<number>(0);

    const dialogsElements = props.dialogsPage.dialogs.map((d: DialogType) => (
        <div key={d.id} className={s.dialog}>
            <Button style={{ width: 80 }} onClick={() => setCurrentUser(d.id - 1)}>
                {d.name}
            </Button>
        </div>
    ));

    const messagesElements = props.dialogsPage.messages.map((m: MessageType, index: number) => (
        <div key={index}>
            <Comment
                author={props.dialogsPage.dialogs[currentUser].name}
                avatar={<Avatar src={photoMock} alt="photo" />}
                content={<p>{m.message}</p>}
            />
            <Divider />
        </div>
    ));

    const addNewMessage = (values: MessageValuesType) => {
        props.sendMessage(values.message);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <MessageForm addNewMessage={addNewMessage} />
                </div>
            </div>
        </div>
    );
};

type MessageValuesType = {
    message: string;
};

type MessageFormPropsType = {
    addNewMessage: (values: MessageValuesType) => void;
};

const MessageForm: React.FC<MessageFormPropsType> = (props) => {
    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: (values: MessageValuesType, { resetForm }) => {
            props.addNewMessage(values);
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
