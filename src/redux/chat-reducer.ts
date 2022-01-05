import { Dispatch } from 'redux';
import { chatAPI, ChatMessageAPIType, StatusType } from '../api/chat-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { v1 } from 'uuid';

const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECEVIED':
            return {
                ...state,
                messages: [...state.messages, ...action.messages.map((m) => ({ ...m, id: v1() }))].filter(
                    (m, index, arr) => index >= arr.length - 100
                )
            };
        case 'SN/CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.status
            };
        default:
            return state;
    }
};

const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) =>
        ({ type: 'SN/CHAT/MESSAGES_RECEVIED', messages } as const),
    statusChanged: (status: StatusType) => ({ type: 'SN/CHAT/STATUS_CHANGED', status } as const)
};

let _newMessagesHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        };
    }

    return _newMessagesHandler;
};

let _newStatusHandler: ((status: StatusType) => void) | null = null;

const newStatusHandlerCreator = (dispatch: Dispatch) => {
    if (_newStatusHandler === null) {
        _newStatusHandler = (status) => {
            dispatch(actions.statusChanged(status));
        };
    }

    return _newStatusHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', newStatusHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', newStatusHandlerCreator(dispatch));
    chatAPI.stop();
};

export const sendMessage =
    (message: string): ThunkType =>
    async () => {
        chatAPI.sendMessage(message);
    };

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
export type ChatMessageType = ChatMessageAPIType & { id: string };
export type InitialStateType = typeof initialState;

export default chatReducer;
