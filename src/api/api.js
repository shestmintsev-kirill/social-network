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
    return instance.get(`users`, {
      params: {
        count: pageSize,
        page: currentPage
      }
    }
    ).then(res => res.data)
  },

  follow(id) {
    return instance.post(`follow/${id}`, null).then(res => res.data)
  },

  unFollow(id) {
    return instance.delete(`follow/${id}`).then(res => res.data)
  }
}

export const profileAPI = {
  getUserProfile(id) {
    return instance.get(`profile/${id}`).then(res => res.data)
  },

  getUserStatus(id) {
    return instance.get(`profile/status/${id}`).then(res => res.data)
  },

  updateStatus(status) {
    return instance.put(`profile/status/`, { status: status }).then(res => res.data)
  }
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`).then(res => res.data)
  },

  login(loginData) {
    return instance.post('/auth/login', { ...loginData }).then(res => res.data)
  },

  logout() {
    return instance.delete('/auth/login').then(res => res.data)
  }
}



