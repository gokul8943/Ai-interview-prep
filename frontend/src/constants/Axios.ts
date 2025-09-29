/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/constants/BaseUrl";
import axios from "axios";


const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
})




export default instance