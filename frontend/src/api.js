import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-production-8c34.up.railway.app/api",
});

// automatically attach token
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default api;