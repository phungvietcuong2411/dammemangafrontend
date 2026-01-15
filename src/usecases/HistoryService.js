import HistoryRepository from "../infrastructure/repositories/HistoryRepository";

export default class HistoryService {
  constructor() {
    this.historyRepository = new HistoryRepository();
  }

  async recordHistory(userId, mangaId) {
    return await this.historyRepository.recordHistory(userId, mangaId);
  }

  async getAllHistories() {
    return await this.historyRepository.getAllHistories();
  }

  async getHistoryById(id) {
    return await this.historyRepository.getHistoryById(id);
  }

  async getHistoriesByUserId(idUser) {
    return await this.historyRepository.getHistoriesByUserId(idUser);
  }

  async deleteHistory(id) {
    return await this.historyRepository.deleteHistory(id);
  }
}
