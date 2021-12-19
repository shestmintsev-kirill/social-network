import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { InitialDialogsStateType, sendMessage } from "../../redux/dialogs-reducer";
import { AppStateType } from '../../redux/redux-store';
import Dialogs from './Dialogs';

export type MapStatePropsType = {
    dialogsPage:InitialDialogsStateType
}

export type MapDispatchPropsType = {
    sendMessage: (message:string) => void
}

const mapStateToProps = (state:AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, { sendMessage }),
    withAuthRedirect
)(Dialogs);