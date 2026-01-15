import axiosClient from "../http/axiosClient";
import { ImgChapter } from "../../domain/models/ImgChapter";

export default class ImgChapterRepository {
  _toImgChapter(raw) {
    if (!raw) return null;
    return new ImgChapter(
      raw.idImgChapter,
      raw.chapterId,
      raw.stt,
      raw.imgLink
    );
  }

  async createImgChapters(requests) {
    const response = await axiosClient.post("/chapters/images", requests);
    return {
      message: response.data.message,
      data: response.data.data.map((item) => this._toImgChapter(item)),
    };
  }

  async getImgChapterById(id) {
    const response = await axiosClient.get(`/chapters/images/${id}`);
    return this._toImgChapter(response.data);
  }

  async getImgsByChapterId(chapterId) {
    const response = await axiosClient.get(`/chapters/${chapterId}/images`);
    return response.data.map((item) => this._toImgChapter(item));
  }

  async getAllImgChapters() {
    const response = await axiosClient.get("/chapters/images");
    return response.data.map((item) => this._toImgChapter(item));
  }

  async updateImgChapter(id, request) {
    const response = await axiosClient.put(`/chapters/images/${id}`, request);

    const responseData = response.data.data || response.data;
    const responseMessage = response.data.message || "Cập nhật thành công";

    return {
      message: responseMessage,
      data: this._toImgChapter(responseData),
    };
  }

  async deleteImgChapter(id) {
    const response = await axiosClient.delete(`/chapters/images/${id}`);
    return {
      message: response.data.message || "Xóa thành công",
    };
  }
}
