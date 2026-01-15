import axiosClient from "../http/axiosClient";

export default class MangaCategoryRepositoryImpl {

    async getAllCategoryManga() {
        const response = await axiosClient.get("/manga-category");
        return response.data;
    }

    async getCategoryById(id) {
        const response = await axiosClient.get(`/manga-category/${id}`);
        return response.data;
    }

    async createCategory(idManga, idCategory) {
        const body = { idManga, idCategory };
        const response = await axiosClient.post("/manga-category", body);
        return response.data;
    }

    async updateCategory(id, idManga, idCategory) {
        const body = { idManga, idCategory };
        const response = await axiosClient.put(`/manga-category/${id}`, body);
        return response.data;
    }

    async deleteCategory(id) {
        const response = await axiosClient.delete(`/manga-category/${id}`);
        return response.data;
    }

    async updateCategoriesToManga(idManga, categoryIds) {
        const response = await axiosClient.post(
            `/manga-category/${idManga}/categories`,
            categoryIds 
        );
        return response.data;
    }

    async getCategoriesByManga(idManga) {
        const response = await axiosClient.get(`/manga-category/manga/${idManga}`);
        return response.data;
    }

}
