import { ProfileType } from "../types/types";
import { instance } from "./api";

export const profileAPI = {
  async getUserProfile(id:number) {
    const res = await instance.get<ProfileType>(`profile/${id}`);
    return res.data;
  },

  async getUserStatus(id:number) {
    const res = await instance.get<string>(`profile/status/${id}`);
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