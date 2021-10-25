import DialogItem from "./DialogItem/DialogsItem";
import s from "./Dialogs.module.css"
import Message from "./Message/Message";

const Dialogs = (props) => {

  let dialogsElements = props.state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>)

  let messagesElements = props.state.messages.map(item => <Message message={item.message} key={item.id}/>)

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
    </div>
  );
}

export default Dialogs