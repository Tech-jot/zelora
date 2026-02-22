import axios from "axios";
import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const serverApi = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

serverApi.interceptors.request.use(async (config:any) => {
  const cookieStore = await cookies(); // await required in Next.js 15
  const token = cookieStore.get("token")?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});