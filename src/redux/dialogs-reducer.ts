import { InferActionsTypes } from './redux-store';

const initialState = {
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your it-kamasutra?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' }
    ] as Array<MessageType>
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
