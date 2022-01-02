import { loginData } from './../redux/auth-reducer';
import { instance, APIResponseType } from './api';

export type MeResponseDataType = {
    id: number;
    email: string;
    login: string;
};

export type GetCaptchaResponseType = {
    url: string;
};

export type LoginResponseType = {
    data: { userId: number };
};

export const authAPI = {
    async me() {
        const res = await instance.get<APIResponseType<MeResponseDataType>>(`auth/me`);
        return res.data;
    },

    async login(loginData: loginData) {
        const res = await instance.post<APIResponseType<LoginResponseType>>('/auth/login', { ...loginData });
        return res.data;
    },

    async logout() {
        const res = await instance.delete('/auth/login');
        return res.data;
    },

    async getCaptcha() {
        return await instance.delete<GetCaptchaResponseType>('/security/get-captcha-url');
    },
};
