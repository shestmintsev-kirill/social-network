import React, { useEffect, useState } from "react";
// import s from './ProfileInfo.module.css';

const ProfileStatus = (props) => {

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }

  const onStatusChange = (e) => {
    setStatus(e.target.value)
  }

  return (
    <div>
      {editMode
        ? <div>
          Статус: <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus type="text" value={status} />
        </div>
        : <div>
          <span onDoubleClick={activateEditMode} >Статус: {props.status || 'Нет статуса'}</span>
        </div>
      }
    </div >
  );
}

export default ProfileStatus;