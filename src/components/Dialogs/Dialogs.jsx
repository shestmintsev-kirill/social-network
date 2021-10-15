import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css"

const DialogItem = (props) => {
  return (
    <div className={`${s.dialog } ${s.active}`}>
      <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
    </div>
  );
}

const Message = (props) => {
  return <div className={s.message}>{props.message}</div>;
}

const Dialogs = () => {

  let dialogs = [
    { id: 1, name: "Kirill" },
    { id: 2, name: "Anton" },
    { id: 3, name: "Andrew" },
    { id: 4, name: "Kirill" },
    { id: 5, name: "Nikita" },
    { id: 6, name: "Kirill" },
  ];

  let messages = [
    { id: 1, message: "Hi" },
    { id: 2, message: "lorem lorem" },
    { id: 3, message: "lorem lorem lorem" },
    { id: 4, message: "lorem lorem lorem lorem" },
    { id: 5, message: "lorem lorem lorem lorem lorem" },
    { id: 6, message: "lorem lorem hi" },
  ];

  let dialogsElements = dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>)

  let messagesElements = messages.map(item => <Message message={item.message}/>)

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
    </div>
  );
}

export default Dialogs