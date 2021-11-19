import axios from "axios";


const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '8c4c198e-8707-4939-9726-3f8457232010'
  }
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
  },

  getFollow(id) {
    return instance.post(`follow/${id}`, null).then(res => res.data)
  },

  getUnFollow(id) {
    return instance.delete(`follow/${id}`, null).then(res => res.data)
  }
}

export const authAPI = {
  getAuthData() {
    return instance.get(`auth/me`).then(res => res.data)
  },

  getUserProfile(id) {
    return instance.get(`profile/${id}`).then(res => res.data)
  }
}



