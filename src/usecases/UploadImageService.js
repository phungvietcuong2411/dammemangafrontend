import UploadImageRepositoryImpl from "../infrastructure/repositories/UploadImageRepository";

export default class UploadImageService {

  constructor() {
    this.uploadRepository = new UploadImageRepositoryImpl();
  }

  /**
   * Upload 1 file ảnh lên backend -> backend upload ImgBB -> trả về link trực tiếp
   * @param {File} file - file ảnh người dùng chọn
   * @returns {Promise<string>} URL ảnh trực tiếp
   */
  async uploadImage(file) {
    return await this.uploadRepository.uploadImage(file);
  }

  /**
   * Upload nhiều ảnh cùng lúc
   * @param {File[]} files - mảng file ảnh
   * @returns {Promise<string[]>} mảng URL ảnh trực tiếp
   */
  async uploadMultipleImages(files) {
    const urls = [];
    for (const file of files) {
      const url = await this.uploadRepository.uploadImage(file);
      urls.push(url);
    }
    return urls;
  }
}
