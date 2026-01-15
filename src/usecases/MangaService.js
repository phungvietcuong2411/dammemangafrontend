import MangaRepositoryImpl from "../infrastructure/repositories/MangaRepository";

export default class MangaService {

  constructor() {
    this.mangaRepository = new MangaRepositoryImpl();
  }

  // Lấy danh sách tất cả manga
  async getAllMangas() {
    return await this.mangaRepository.getAllMangas(); // trả về list MangaDTO
  }

  // Lấy 1 manga theo id
  async getMangaById(id) {
    return await this.mangaRepository.getMangaById(id); // MangaDTO
  }

  // Tạo manga mới
  async createManga(manga) {
    return await this.mangaRepository.createManga(manga); // MangaDTO
  }

  // Cập nhật manga toàn bộ (PUT)
  async updateManga(id, manga) {
    return await this.mangaRepository.updateManga(id, manga); // MangaDTO
  }

  // Cập nhật một phần (PATCH)
  async patchManga(id, updates) {
    return await this.mangaRepository.patchManga(id, updates); // MangaDTO
  }

  // Xoá manga
  async deleteManga(id) {
    return await this.mangaRepository.deleteManga(id); // string "Deleted"
  }

  // Lấy danh sách manga theo danh sách thể loại
  async getMangasByCategories(categories) {
    return await this.mangaRepository.getMangasByCategories(categories); // list MangaDTO
  }

  async getTotalMangas() {
    return await this.mangaRepository.getTotalMangas();
  }

  async getTotalViews() {
    return await this.mangaRepository.getTotalViews();
  }
}
