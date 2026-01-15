import axiosClient from "../http/axiosClient";

export default class UserRepositoryImpl {

    async login(account, password) {
        const response = await axiosClient.post("/users/login", { account, password });
        console.log("Login response:", response);
        console.log("Response data:", response.data); 
        return response.data;
    }

    async register(account, password) {
        const response = await axiosClient.post("/users/register", { account, password });
        return response.data;
    }

    async getAllUsers() {
        const response = await axiosClient.get("/users/all");
        return response.data;
    }

    async changePassword(oldPassword, newPassword) {
        const response = await axiosClient.post("/users/change-password", { oldPassword, newPassword });
        return response.data;
    }

        async getTotalUsers() {
        const response = await axiosClient.get("/users/count");
        return response.data; 
    }

}
