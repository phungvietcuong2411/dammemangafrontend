import ImgChapterRepository from "../infrastructure/repositories/ImgChapterRepository";

export default class ImgChapterService {
  constructor() {
    this.imgChapterRepository = new ImgChapterRepository();
  }

  async createImgChapters(requests) {
    return await this.imgChapterRepository.createImgChapters(requests);
  }

  async getImgChapterById(id) {
    return await this.imgChapterRepository.getImgChapterById(id);
  }

  async getImgsByChapterId(chapterId) {
    return await this.imgChapterRepository.getImgsByChapterId(chapterId);
  }

  async getAllImgChapters() {
    return await this.imgChapterRepository.getAllImgChapters();
  }

  async updateImgChapter(id, request) {
    return await this.imgChapterRepository.updateImgChapter(id, request);
  }

  async deleteImgChapter(id) {
    return await this.imgChapterRepository.deleteImgChapter(id);
  }
}
