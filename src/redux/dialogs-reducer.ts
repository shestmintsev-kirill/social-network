import { InferActionsTypes } from './redux-store';

const initialState = {
    dialogs: [
        { id: 1, name: 'Kirill' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' }
    ] as DialogType[],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Hello' },
        { id: 3, message: 'Bye' },
        { id: 4, message: 'Find phone' },
        { id: 5, message: 'Hello' }
    ] as MessageType[]
};

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialDialogsStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: action.message }]
            };
        default:
            return state;
    }
};

export const actions = {
    sendMessage: (message: string) => ({ type: 'SN/DIALOGS/SEND_MESSAGE', message } as const)
};

type ActionsTypes = InferActionsTypes<typeof actions>;
export type InitialDialogsStateType = typeof initialState;
export type DialogType = {
    id: number;
    name: string;
};
export type MessageType = {
    id: number;
    message: string;
};

export default dialogsReducer;
