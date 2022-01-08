import { ProfileType } from './../types/types';
import { ResultCodeEnum, ResultCodeForCaptcha } from '../api/api';
import { authAPI } from '../api/auth-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { message } from 'antd';
import { profileAPI } from '../api/profile-api';

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    errorMessage: null as string | null,
    captcha: null as string | null,
    meProfile: null as ProfileType | null
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            };
        case 'SN/AUTH/SET_LOGOUT_USER_DATA':
            return {
                ...initialState
            };
        case 'SN/AUTH/SET_ERROR':
            return {
                ...state,
                errorMessage: action.error
            };
        case 'SN/AUTH/SET_CAPTCHA':
            return {
                ...state,
                captcha: action.captcha
            };
        case 'SN/AUTH/SET_ME_PROFILE':
            return {
                ...state,
                meProfile: action.profile
            };
        default:
            return state;
    }
};

const actions = {
    setAuthUserData: (userId: number, email: string, login: string, isAuth: boolean) =>
        ({ type: 'SN/AUTH/SET_USER_DATA', payload: { userId, email, login, isAuth } } as const),
    setCaptcha: (captcha: string | null) => ({ type: 'SN/AUTH/SET_CAPTCHA', captcha } as const),
    setLogoutUserData: () => ({ type: 'SN/AUTH/SET_LOGOUT_USER_DATA' } as const),
    setError: (error: string) => ({ type: 'SN/AUTH/SET_ERROR', error } as const),
    setMeProfile: (profile: ProfileType) => ({ type: 'SN/AUTH/SET_ME_PROFILE', profile } as const)
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const data = await authAPI.me();
    if (data.resultCode === 0) {
        const { id, login, email } = data.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
        dispatch(getMeProfile(id));
    }
};

export const getMeProfile =
    (userId: number): ThunkType =>
    async (dispatch) => {
        const data = await profileAPI.getUserProfile(userId);
        dispatch(actions.setMeProfile(data));
    };

export const login =
    (loginData: loginData): ThunkType =>
    async (dispatch, getState) => {
        const data = await authAPI.login(loginData);
        if (data.resultCode === ResultCodeEnum.Success) {
            await dispatch(getAuthUserData());
            message.info(`Hello ${getState().auth.login}!`);
        } else {
            dispatch(actions.setError(data.messages.length ? data.messages[0] : 'Some error'));
            !data?.fieldsErrors?.length && dispatch(actions.setCaptcha(null));
            if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired && data?.fieldsErrors?.length) {
                dispatch(getCaptcha());
            }
        }
    };

export const getCaptcha = (): ThunkType => async (dispatch) => {
    const res = await authAPI.getCaptcha();
    dispatch(actions.setCaptcha(res.data.url));
};

export const logout = (): ThunkType => async (dispatch, getState) => {
    message.info(`Bye ${getState().auth.login}!`);
    const data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(actions.setLogoutUserData());
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
export type InitialStateType = typeof initialState;
export type loginData = {
    email: string | null;
    password: string | null;
    rememberMe: boolean | null;
    captcha: string | null;
};

export default authReducer;
