import axios from "axios";

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// interceptor para token
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    
    if (config.url?.includes("/auth/register")) {
      return config;
    }


    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});