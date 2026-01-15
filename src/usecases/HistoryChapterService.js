import HistoryChapterRepository from "../infrastructure/repositories/HistoryChapterRepository";

export default class HistoryChapterService {
  constructor() {
    this.historyChapterRepository = new HistoryChapterRepository();
  }

  async recordHistoryChapter(historyId, chapterId) {
    return await this.historyChapterRepository.recordHistoryChapter(historyId, chapterId);
  }

  async getAllHistoryChapters() {
    return await this.historyChapterRepository.getAllHistoryChapters();
  }

  async getHistoryChapterById(id) {
    return await this.historyChapterRepository.getHistoryChapterById(id);
  }

  async getHistoryChaptersByHistory(idHistory) {
    return await this.historyChapterRepository.getHistoryChaptersByHistory(idHistory);
  }

  async deleteHistoryChapter(id) {
    return await this.historyChapterRepository.deleteHistoryChapter(id);
  }
}
