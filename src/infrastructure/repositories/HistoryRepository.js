import axiosClient from "../http/axiosClient";

export default class HistoryRepository {

    async recordHistory(userId, mangaId) {
        const response = await axiosClient.post(`/history/read`, null, {
            params: { userId, mangaId }
        });
        return response.data;
    }

    async getAllHistories() {
        const response = await axiosClient.get(`/history`);
        return response.data;
    }

    async getHistoryById(id) {
        const response = await axiosClient.get(`/history/${id}`);
        return response.data;
    }

    async getHistoriesByUserId(idUser) {
        const response = await axiosClient.get(`/history/user/${idUser}`);
        return response.data;
    }

    async deleteHistory(id) {
        const response = await axiosClient.delete(`/history/${id}`);
        return response.data;
    }
}
