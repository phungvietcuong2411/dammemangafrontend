import axiosClient from "../http/axiosClient";

export default class FollowRepositoryImpl {

    async getFollowsByUser(userId) {
        const response = await axiosClient.get(`/follows/user/${userId}`);
        return response.data; 
    }

    async createFollow(userId, mangaId) {
        const response = await axiosClient.post(`/follows?userId=${userId}&mangaId=${mangaId}`);
        return response.data;
    }

    async deleteFollow(id) {
        const response = await axiosClient.delete(`/follows/${id}`);
        return response.data;
    }

    async getTopMangaFollowed() {
        const response = await axiosClient.get(`/follows/top-mangas`);
        return response.data;
    }
}
