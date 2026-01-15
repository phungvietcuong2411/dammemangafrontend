import axiosClient from "../http/axiosClient";
import { Chapter } from "../../domain/models/Chapter";

const BASE_URL = "/mangas";

export default class ChapterRepository {
  _toChapter(raw) {
    if (!raw) return null;
    return new Chapter(
      raw.idChapter,
      raw.chapterNumber,
      raw.title,
      raw.id_manga
    );
  }

  async createChapter(chapterData) {
    const response = await axiosClient.post(
      `${BASE_URL}/chapters`,
      chapterData
    );
    return {
      message: response.data.message,
      data: this._toChapter(response.data.data),
    };
  }

  async getAllChapters() {
    const response = await axiosClient.get(`${BASE_URL}/chapters`);
    return response.data.map((item) => this._toChapter(item));
  }

  async getChapterById(id) {
    const response = await axiosClient.get(`${BASE_URL}/chapters/${id}`);
    return this._toChapter(response.data);
  }

  async updateChapter(id, chapterData) {
    const response = await axiosClient.put(
      `${BASE_URL}/chapters/${id}`,
      chapterData
    );
    return {
      message: response.data.message,
      data: this._toChapter(response.data.data),
    };
  }

  async deleteChapter(id) {
    const response = await axiosClient.delete(`${BASE_URL}/chapters/${id}`);
    return {
      message: response.data.message || response.data,
    };
  }

  async getChaptersByMangaId(idManga) {
    const response = await axiosClient.get(`${BASE_URL}/${idManga}/chapters`);
    return response.data.map((item) => this._toChapter(item));
  }

  async getFirstChapterByMangaId(idManga) {
    const response = await axiosClient.get(
      `${BASE_URL}/first-chapter/${idManga}`
    );

    const first = response.data?.[0]; 

    return this._toChapter(first);
  }

}