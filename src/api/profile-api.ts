import { PhotosType, ProfileType } from "../types/types";
import { instance, APIResponseType } from "./api";

type SavePhotoResponseType = {
  photos: PhotosType
}

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
    const res = await instance.put<APIResponseType>(`profile/status/`, { status: status });
    return res.data;
  },

  async savePhoto(file:File) {
    const formData = new FormData();
    formData.append('image', file)
    const res = await instance.put<APIResponseType<SavePhotoResponseType>>(`profile/photo`, formData);
    return res.data;
  },

  async updateProfile(profile:ProfileType) {
    const res = await instance.put<APIResponseType>(`profile`, { ...profile });
    return res.data;
  },
}