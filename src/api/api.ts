import axios from 'axios';
import { UserType } from '../types/types';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '8c4c198e-8707-4939-9726-3f8457232010'
    }
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: UserType[];
    totalCount: number;
    error: string | null;
};

export type APIResponseType<D = {}, RC = ResultCodeEnum | ResultCodeForCaptcha> = {
    data: D;
    messages: string[];
    resultCode: RC;
    fieldsErrors?: string[];
};
