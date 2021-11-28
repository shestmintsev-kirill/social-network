import React from "react";
// import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status
  }

  componentDidUpdate(oldProps, oldState) {
    if (oldProps.status !== this.props.status) {
      this.setState({ status: this.props.status })
    }
  }

  activateEditMode = () => {
    this.setState({ editMode: true });
  }

  deactivateEditMode = () => {
    this.setState({ editMode: false });
    this.props.updateStatus(this.state.status);
  }

  onStatusChange = (e) => {
    this.setState({ status: e.target.value });
  }

  render() {
    return (
      <div>
        {this.state.editMode
          ? <div>
            Статус: <input onChange={this.onStatusChange} autoFocus onBlur={this.deactivateEditMode} type="text" value={this.state.status} />
          </div>
          : <div>
            <span onDoubleClick={this.activateEditMode}>Статус: {this.props.status || 'Нет статуса'}</span>
          </div>
        }
      </div >
    );
  }
}

export default ProfileStatus;