// Axios instance + interceptor that attaches JWT token automatically.
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "https://crm-mern-yseb.onrender.com/api",
  timeout: 10000
});

// Attach token from localStorage to outgoing requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
