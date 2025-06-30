import axios from 'axios';

const api = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://crateeve-backend-1.onrender.com/api"
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
