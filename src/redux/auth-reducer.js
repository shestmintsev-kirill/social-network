import { authAPI } from "../api/api";

const SET_USER_DATA = 'network/auth/SET_USER_DATA';
const SET_ERROR = 'network/auth/SET_ERROR';
const SET_CAPTCHA = 'network/auth/SET_CAPTCHA'
const SET_LOGOUT_USER_DATA = 'network/auth/SET_LOGOUT_USER_DATA'


const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    errorMessage: null,
    captcha: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_LOGOUT_USER_DATA:
            return {
                ...initialState
            }
        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.error
            }
        case SET_CAPTCHA:
            return {
                ...state,
                captcha: action.captcha
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })
export const setLogoutUserData = () => ({ type: SET_LOGOUT_USER_DATA })
export const setError = (error) => ({ type: SET_ERROR, error })
export const setCaptcha = (captcha) => ({ type: SET_CAPTCHA, captcha })

export const getAuthUserData = () => async (dispatch) => {
    const data = await authAPI.me()
    if (data.resultCode === 0) {
        const { id, login, email } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (loginData) => async (dispatch) => {
    const data = await authAPI.login(loginData);
    if (data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        dispatch(setError(data.messages.length ? data.messages[0] : 'Some error'));

        !data.fieldsErrors.length && dispatch(setCaptcha(null))
        if (data.resultCode === 10 && data.fieldsErrors.length) {
            dispatch(getCaptcha());
        }
    }
}

export const getCaptcha = () => async (dispatch) => {
    const res = await authAPI.getCaptcha()
    dispatch(setCaptcha(res.data.url))
}

export const logout = () => async (dispatch) => {
    const data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setLogoutUserData());
    }
}

export default authReducer;
