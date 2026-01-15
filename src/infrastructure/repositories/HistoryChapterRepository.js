import axiosClient from "../http/axiosClient";

export default class HistoryChapterRepository {

    async recordHistoryChapter(historyId, chapterId) {
        const response = await axiosClient.post(`/history-chapter/read`, null, {
            params: {
                historyId,
                chapterId: Number(chapterId)
            }
        });
        return response.data;
    }


    async getAllHistoryChapters() {
        const response = await axiosClient.get(`/history-chapter`);
        return response.data;
    }

    async getHistoryChapterById(id) {
        const response = await axiosClient.get(`/history-chapter/${id}`);
        return response.data;
    }

    async getHistoryChaptersByHistory(historyId) {
        const response = await axiosClient.get(`/history-chapter/history/${historyId}`);
        return response.data;
    }

    async deleteHistoryChapter(id) {
        const response = await axiosClient.delete(`/history-chapter/${id}`);
        return response.data;
    }
}
