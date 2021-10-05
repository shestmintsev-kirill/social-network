import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css"

const Dialogs = () => {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        <div className={s.dialog + " " + s.active}>
          <NavLink to="/dialogs/1">Kirill</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialogs/2">Anton</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialogs/3">Andrew</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialogs/4">Kirill</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialogs/5">Nikita</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialogs/6">Kirill</NavLink>
        </div>
      </div>
      <div className={s.messages}>
        <div className={s.message}>Hi</div>
        <div className={s.message}>lorem lorem</div>
        <div className={s.message}>lorem lorem lorem </div>
      </div>
    </div>
  );
}

export default Dialogs