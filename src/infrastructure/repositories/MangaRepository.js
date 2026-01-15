import axiosClient from "../http/axiosClient";

export default class MangaRepositoryImpl {
  async getAllMangas() {
    const response = await axiosClient.get("/mangas");
    return response.data;
  }

  async getMangaById(id) {
    const response = await axiosClient.get(`/mangas/${id}`);
    return response.data;
  }

  async createManga(manga) {
    const response = await axiosClient.post("/mangas", manga);
    return response.data;
  }

  async updateManga(id, manga) {
    console.log("Sending PUT body:", manga);
    const response = await axiosClient.put(`/mangas/${id}`, manga);
    return response.data;
  }

  async patchManga(id, updates) {
    const response = await axiosClient.patch(`/mangas/${id}`, updates);
    return response.data;
  }

  async deleteManga(id) {
    const response = await axiosClient.delete(`/mangas/${id}`);
    return response.data;
  }

  async getMangasByCategories(categories) {
    const response = await axiosClient.post(
      "/mangas/by-categories",
      categories
    );
    return response.data; 
  }

  async getTotalMangas() {
    const response = await axiosClient.get("/mangas/count");
    return response.data; 
  }

  async getTotalViews() {
    const response = await axiosClient.get("/mangas/totalviews");
    return response.data; 
  }
}
