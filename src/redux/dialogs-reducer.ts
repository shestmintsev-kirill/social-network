const SEND_MESSAGE = 'network/dialogs/SEND_MESSAGE';

export type DialogType = {
    id: number,
    name: string
}
export type MessageType = {
    id: number,
    message: string
}

let initialState = {
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
export type InitialDialogsStateType = typeof initialState

const dialogsReducer = (state = initialState, action:any):InitialDialogsStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: action.message }]
            };
        default:
            return state;
    }
}

type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    message: string
}
export const sendMessage = (message:string):SendMessageActionType => ({ type: SEND_MESSAGE, message })

export default dialogsReducer;