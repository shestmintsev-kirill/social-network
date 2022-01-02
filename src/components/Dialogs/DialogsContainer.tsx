import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { InitialDialogsStateType, actions } from '../../redux/dialogs-reducer';
import { AppStateType } from '../../redux/redux-store';
import Dialogs from './Dialogs';

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    };
};

export type MapStatePropsType = {
    dialogsPage: InitialDialogsStateType;
};

export type MapDispatchPropsType = {
    sendMessage: (message: string) => void;
};

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, {
        sendMessage: actions.sendMessage,
    }),
    withAuthRedirect,
)(Dialogs);
