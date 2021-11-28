import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Redirect } from 'react-router';
import { Formik } from 'formik';

const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id} />);
  let messagesElements = state.messages.map((m, i) => <Message message={m.message} key={i} />);

  let addNewMessage = (values) => {
    props.sendMessage(values.message);
  }

  if (!props.isAuth) return <Redirect to={'./login'} />

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <div>
          <MessageForm addNewMessage={addNewMessage} />
        </div>
      </div>
    </div>
  )
}

const MessageForm = (props) => {

  return (
    <div>
      <Formik
        initialValues={{
          message: '',
        }}
        onSubmit={(values, { resetForm }) => {
          props.addNewMessage(values);
          resetForm();
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, dirty }) => (
          <div>
            <div>
              <textarea
                name={'message'}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.message}
                placeholder={'Enter your message'}
              />
            </div>
            <div>
              <button
                disabled={!dirty}
                onClick={handleSubmit}
                type={'submit'}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default Dialogs;