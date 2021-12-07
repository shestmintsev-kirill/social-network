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

  async follow(id) {
    const res = await instance.post(`follow/${id}`, null);
    return res.data;
  },

  async unFollow(id) {
    const res = await instance.delete(`follow/${id}`);
    return res.data;
  }
}

export const profileAPI = {
  async getUserProfile(id) {
    const res = await instance.get(`profile/${id}`);
    return res.data;
  },

  async getUserStatus(id) {
    const res = await instance.get(`profile/status/${id}`);
    return res.data;
  },

  async updateStatus(status) {
    try {
      const res = await instance.put(`profile/status/`, { status: status });
      return res.data;
    } catch (error) {
      console.log(error)
    }

  },

  async savePhoto(file) {
    const formData = new FormData();
    formData.append('image', file)
    const res = await instance.put(`profile/photo`, formData);
    return res.data;
  },

  async updateProfile(profile) {
    const res = await instance.put(`profile`, { ...profile });
    return res.data;
  },
}

export const authAPI = {
  async me() {
    const res = await instance.get(`auth/me`);
    return res.data;
  },

  async login(loginData) {
    const res = await instance.post('/auth/login', { ...loginData });
    return res.data;
  },

  async logout() {
    const res = await instance.delete('/auth/login');
    return res.data;
  },

  async getCaptcha() {
    return await instance.delete('/security/get-captcha-url');
  }
}



