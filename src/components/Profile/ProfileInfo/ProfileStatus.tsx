import React, { useEffect, useState } from "react";
// import s from './ProfileInfo.module.css';

type PropsType = {
  status: string,
  isOwner: boolean
  updateStatus: (status:string) => void
}
const ProfileStatus:React.FC<PropsType>= (props) => {

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    if (!props.isOwner) {
      return
    }
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }

  const onStatusChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value)
  }

  return (
    <div>
      {editMode
        ? <div>
          Статус: <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus type="text" value={status} />
        </div>
        : <div>
          <span onDoubleClick={activateEditMode}><strong>Статус:</strong> {props.status || 'Нет статуса'}</span>
        </div>
      }
    </div >
  );
}

export default ProfileStatus;