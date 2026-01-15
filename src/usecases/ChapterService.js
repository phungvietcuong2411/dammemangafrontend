import ChapterRepository from "../infrastructure/repositories/ChapterRepository";

export default class ChapterService {
  constructor() {
    this.chapterRepository = new ChapterRepository();
  }

  async createChapter(chapter) {
    return await this.chapterRepository.createChapter(chapter);
  }

  async getAllChapters() {
    return await this.chapterRepository.getAllChapters();
  }

  async getChapterById(id) {
    return await this.chapterRepository.getChapterById(id);
  }

  async updateChapter(id, chapter) {
    return await this.chapterRepository.updateChapter(id, chapter);
  }

  async deleteChapter(id) {
    return await this.chapterRepository.deleteChapter(id);
  }

  async getChaptersByMangaId(idManga) {
    return await this.chapterRepository.getChaptersByMangaId(idManga);
  }
  
  async getFirstChapterByMangaId(idManga) {
    return await this.chapterRepository.getFirstChapterByMangaId(idManga);
  }

}