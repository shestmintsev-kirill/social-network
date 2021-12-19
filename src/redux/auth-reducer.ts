import { authAPI, ResultCodeEnum, ResultCodeForCaptcha } from "../api/api";

const SET_USER_DATA = 'network/auth/SET_USER_DATA';
const SET_ERROR = 'network/auth/SET_ERROR';
const SET_CAPTCHA = 'network/auth/SET_CAPTCHA'
const SET_LOGOUT_USER_DATA = 'network/auth/SET_LOGOUT_USER_DATA'

// export type InitialStateType = {
//     userId: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean,
//     errorMessage: string | null,
//     captcha: string | null
// }

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    errorMessage: null as string | null,
    captcha: null as string | null
};
export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action:any):InitialStateType => {
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

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean | null
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId:number, email:string, login:string, isAuth:boolean):SetAuthUserDataActionType => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

type SetCaptchaActionType = {
    type: typeof SET_CAPTCHA,
    captcha: string | null
}
export const setCaptcha = (captcha:string | null):SetCaptchaActionType => ({ type: SET_CAPTCHA, captcha })

type SetLogoutUserDataActionType = {
    type: typeof SET_LOGOUT_USER_DATA
}
export const setLogoutUserData = ():SetLogoutUserDataActionType => ({ type: SET_LOGOUT_USER_DATA })

type SetErrorActionType = {
    type: typeof SET_ERROR,
    error: string
}
export const setError = (error:string):SetErrorActionType => ({ type: SET_ERROR, error })

export const getAuthUserData = () => async (dispatch:any) => {
    const data = await authAPI.me()
    if (data.resultCode === 0) {
        const { id, login, email } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export type loginData = {
    email: string | null,
    password: string | null,
    rememberMe: boolean | null,
    captcha: string | null
}
export const login = (loginData:loginData) => async (dispatch:any) => {
    const data = await authAPI.login(loginData);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        dispatch(setError(data.messages.length ? data.messages[0] : 'Some error'));
        !data.fieldsErrors.length && dispatch(setCaptcha(null))
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired && data.fieldsErrors.length) {
            dispatch(getCaptcha());
        }
    }
}

export const getCaptcha = () => async (dispatch:any) => {
    const res = await authAPI.getCaptcha()
    dispatch(setCaptcha(res.data.url))
}

export const logout = () => async (dispatch:any) => {
    const data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setLogoutUserData());
    }
}

export default authReducer;
