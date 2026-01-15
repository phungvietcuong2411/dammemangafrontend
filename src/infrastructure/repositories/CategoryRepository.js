import axiosClient from "../http/axiosClient";

export default class CategoryRepositoryImpl {

    async getAllCategories() {
        const response = await axiosClient.get("/category");
        return response.data;
    }

    async getCategoryById(id) {
        const response = await axiosClient.get(`/category/${id}`);
        return response.data;
    }

    async createCategory(nameCategory, description) {
        const body = { nameCategory, description };
        const response = await axiosClient.post("/category", body);
        return response.data;
    }

    async updateCategory(id, nameCategory, description) {
        const body = { nameCategory, description };
        const response = await axiosClient.put(`/category/${id}`, body);
        return response.data;
    }

    async deleteCategory(id) {
        const response = await axiosClient.delete(`/category/${id}`);
        return response.data;
    }

    async getTotalCategories() {
        const response = await axiosClient.get("/category/count");
        return response.data; 
    }
}
