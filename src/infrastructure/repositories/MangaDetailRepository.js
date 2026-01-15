import axios from "../http/axiosClient";
import { MangaDetail } from "../../domain/models/MangaDetail";

export default class MangaDetailRepository {
  async getMangaWithChapters(id) {
    try {
      const res = await axios.get(`/user/mangas/${id}`);
      return new MangaDetail(
        res.data.idManga,
        res.data.nameManga,
        res.data.author,
        res.data.description,
        res.data.bannerUrl,
        res.data.posterUrl,
        res.data.status,
        res.data.countView,
        res.data.createdAt,
        res.data.updatedAt,
        res.data.chapters || []
      );
    } catch (err) {
      console.error("Lỗi khi lấy Manga va Chapter:", err);
      return [];
    }
  }

  async getAllMangaWithChapters() {
    try {
      const res = await axios.get(`/user/mangas`);
      return res.data.map(
        (manga) =>
          new MangaDetail(
            manga.idManga,
            manga.nameManga,
            manga.author,
            manga.description,
            manga.bannerUrl,
            manga.posterUrl,
            manga.status,
            manga.countView,
            manga.createdAt,
            manga.updatedAt,
            manga.chapters || []
          )
      );
    } catch (err) {
      console.error("Lỗi khi lấy Manga va Chapter:", err);
      return [];
    }
  }
}
