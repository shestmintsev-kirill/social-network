import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { useFormik } from 'formik';
import { Textarea } from '../common/FormsControls/FormsControls';
import { DialogType, InitialDialogsStateType, MessageType } from '../../redux/dialogs-reducer';

type DialogsPropsType = {
    dialogsPage: InitialDialogsStateType;
    sendMessage: (message: string) => void;
};

const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const state = props.dialogsPage;

    const dialogsElements = state.dialogs.map((d: DialogType) => <DialogItem name={d.name} id={d.id} key={d.id} />);
    const messagesElements = state.messages.map((m: MessageType, i: number) => <Message message={m.message} key={i} />);

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
            message: '',
        },
        onSubmit: (values: MessageValuesType, { resetForm }) => {
            props.addNewMessage(values);
            resetForm();
        },
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
                <button disabled={!formik.dirty} type={'submit'}>
                    Send
                </button>
            </div>
        </form>
    );
};

export default Dialogs;
