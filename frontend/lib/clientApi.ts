import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const clientApi = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ REQUEST INTERCEPTOR
clientApi.interceptors.request.use(
  (config:any) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error:any) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR
clientApi.interceptors.response.use(
  (response:any) => response,
  (error:any) => {
    if (typeof window !== "undefined") {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default clientApi;
