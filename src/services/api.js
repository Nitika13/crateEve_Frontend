// import axios from 'axios';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });



// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

// import axios from 'axios';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_URL,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Automatically add token before each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

