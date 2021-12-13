import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZE = 'network/app/SET_INITIALIZE';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
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

export const setInitializedSuccess = () => ({ type: SET_INITIALIZE })

export const initializeApp = () => async (dispatch) => {
    await dispatch(getAuthUserData());
    dispatch(setInitializedSuccess());

}

export default appReducer;