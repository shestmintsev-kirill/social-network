import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZE = 'network/app/SET_INITIALIZE';

export type InitialStateType = {
    initialized: boolean
}

let initialState:InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZE:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

type SetInitializedSuccsessActionType = {
    type: typeof SET_INITIALIZE
}

export const setInitializedSuccess = ():SetInitializedSuccsessActionType => ({ type: SET_INITIALIZE })

export const initializeApp = () => async (dispatch: any) => {
    await dispatch(getAuthUserData());
    dispatch(setInitializedSuccess());

}

export default appReducer;