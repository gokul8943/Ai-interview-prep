/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/constants/BaseUrl";
import axios from "axios";


const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});




export default instance