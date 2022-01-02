import { getAuthUserData } from './auth-reducer';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/SET_INITIALIZE':
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

const actions = {
    setInitializedSuccess: () => ({ type: 'SN/APP/SET_INITIALIZE' } as const),
};

export const initializeApp = (): ThunkType => async (dispatch) => {
    await dispatch(getAuthUserData());
    dispatch(actions.setInitializedSuccess());
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

export default appReducer;
