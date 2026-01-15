import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token || localStorage.getItem("token"); 

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
