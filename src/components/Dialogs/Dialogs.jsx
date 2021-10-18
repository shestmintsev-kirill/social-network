import DialogItem from "./DialogItem/DialogsItem";
import s from "./Dialogs.module.css"
import Message from "./Message/Message";

const Dialogs = (props) => {

  let dialogsElements = props.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>)

  let messagesElements = props.messages.map(item => <Message message={item.message} key={item.id}/>)

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
    </div>
  );
}

export default Dialogs