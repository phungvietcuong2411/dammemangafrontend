import axiosClient from "../http/axiosClient";

export default class AuthorRepositoryImpl {

    async getAllAuthors() {
        const response = await axiosClient.get("/authors");
        return response.data;
    }

    async getAuthorById(id) {
        const response = await axiosClient.get(`/authors/${id}`);
        return response.data;
    }

    async createAuthor(nameAuthor) {
        const body = { nameAuthor };
        const response = await axiosClient.post("/authors", body);
        return response.data;
    }

    async updateAuthor(id, nameAuthor) {
        const body = { nameAuthor };
        const response = await axiosClient.put(`/authors/${id}`, body);
        return response.data;
    }

    async deleteAuthor(id) {
        const response = await axiosClient.delete(`/authors/${id}`);
        return response.data;
    }

    async getTotalAuthors() {
        const response = await axiosClient.get("/authors/count");
        return response.data; 
    }
}
