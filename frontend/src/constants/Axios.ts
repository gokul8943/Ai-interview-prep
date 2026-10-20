import { BASE_URL } from "@/constants/BaseUrl";
import axios from "axios";
import useAuthStore from "@/store/AuthStrore";

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
});

const NO_REFRESH_PATHS = [
  '/auth/v1/sign-in',
  '/auth/v1/sign-up',
  '/auth/v1/refresh',
  '/auth/v1/generate-otp',
  '/auth/v1/verify-otp',
];

let refreshPromise: Promise<void> | null = null;

const refreshSession = async (): Promise<void> => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${BASE_URL}/auth/v1/refresh`, {}, { withCredentials: true })
      .then((res) => {
        const { accessToken, user } = res.data;
        if (accessToken) {
          useAuthStore.getState().updateAccessToken(accessToken);
        }
        if (user) {
          useAuthStore.getState().updateUser(user);
        }
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().authState.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as (typeof error.config & { _retry?: boolean }) | undefined;

    const status = error.response?.status;
    const url: string = original?.url || '';

    const isAuthPath = NO_REFRESH_PATHS.some((path) => url.includes(path));

    if (status === 401 && original && !original._retry && !isAuthPath) {
      original._retry = true;
      try {
        await refreshSession();
        const token = useAuthStore.getState().authState.accessToken;
        if (token) {
          original.headers.Authorization = `Bearer ${token}`;
        }
        return instance(original);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
