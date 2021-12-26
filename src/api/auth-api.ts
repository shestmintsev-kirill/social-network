import { loginData } from './../redux/auth-reducer';
import { instance, ResponseType } from "./api";

export type MeResponseDataType = {
  id: number,
  email: string,
  login: string
}

export type GetCaptchaType = {
  url: string
}

export type LoginResponseType = {
  data: { userId: number }
}

export const authAPI = {
  async me() {
    const res = await instance.get<ResponseType<MeResponseDataType>>(`auth/me`);
    return res.data;
  },

  async login(loginData:loginData) {
    const res = await instance.post<ResponseType<LoginResponseType>>('/auth/login', { ...loginData });
    return res.data;
  },

  async logout() {
    const res = await instance.delete('/auth/login');
    return res.data;
  },

  async getCaptcha() {
    return await instance.delete<GetCaptchaType>('/security/get-captcha-url');
  }
}