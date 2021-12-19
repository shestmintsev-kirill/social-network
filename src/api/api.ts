import { loginData } from './../redux/auth-reducer';
import { ProfileType } from './../types/types';
import axios from "axios";


const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '8c4c198e-8707-4939-9726-3f8457232010'
  }
});

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 10) {
    const res = await instance.get(`users`, {
      params: {
        count: pageSize,
        page: currentPage
      }
    }
    );
    return res.data;
  },

  async follow(id:number) {
    const res = await instance.post(`follow/${id}`, null);
    return res.data;
  },

  async unFollow(id:number) {
    const res = await instance.delete(`follow/${id}`);
    return res.data;
  }
}

export const profileAPI = {
  async getUserProfile(id:number) {
    const res = await instance.get(`profile/${id}`);
    return res.data;
  },

  async getUserStatus(id:number) {
    const res = await instance.get(`profile/status/${id}`);
    return res.data;
  },

  async updateStatus(status:string) {
    try {
      const res = await instance.put(`profile/status/`, { status: status });
      return res.data;
    } catch (error) {
      console.log(error)
    }

  },

  async savePhoto(file:any) {
    const formData = new FormData();
    formData.append('image', file)
    const res = await instance.put(`profile/photo`, formData);
    return res.data;
  },

  async updateProfile(profile:ProfileType) {
    const res = await instance.put(`profile`, { ...profile });
    return res.data;
  },
}

export enum ResultCodeEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}

type MeResponseType = {
  data: { id:number, email:string, login:string },
  resultCode: ResultCodeEnum,
  messages: Array<string>
}

type GetCaptchaType = {
  url:string
}

type LoginResponseType = {
  data: { userId:number },
  resultCode: ResultCodeEnum | ResultCodeForCaptcha,
  fieldsErrors: Array<string>
  messages: Array<string>
}
export const authAPI = {
  async me() {
    const res = await instance.get<MeResponseType>(`auth/me`);
    return res.data;
  },

  async login(loginData:loginData) {
    const res = await instance.post<LoginResponseType>('/auth/login', { ...loginData });
    return res.data;
  },

  async logout() {
    const res = await instance.delete<MeResponseType>('/auth/login');
    return res.data;
  },

  async getCaptcha() {
    return await instance.delete<GetCaptchaType>('/security/get-captcha-url');
  }
}
