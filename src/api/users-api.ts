import { GetItemsType, instance, ResponseType } from "./api";

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 10) {
    const res = await instance.get<GetItemsType>(`users`, {
      params: {
        count: pageSize,
        page: currentPage
      }
    }
    );
    return res.data;
  },

  async follow(id:number) {
    const res = await instance.post<ResponseType>(`follow/${id}`, null);
    return res.data;
  },

  async unFollow(id:number) {
    const res = await instance.delete<ResponseType>(`follow/${id}`);
    return res.data;
  }
}