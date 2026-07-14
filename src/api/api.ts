import useAuthStore from "@/stores/authStore";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { API_PROVINCE } from "./middleware";
import moment from "moment";

export const decodeJwt = (token: string) => {
  if (!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(""),
  );

  return JSON.parse(jsonPayload);
};
// const API_URL = "https://nhahocduong.gpmn.net/";
const API_URL = import.meta.env.VITE_API_URL;

const getToken = async () => {
  const timeClear = 5; // as minutes
  const timeNow = moment();
  //get Token from user info
  const accessToken = localStorage.getItem("token");
  if (!accessToken) {
    // Logout() // function logout user
    return "";
  }
  //access token get from API login
  const expiredTokenAPI = decodeJwt(accessToken)?.exp;
  const isCountExpiredAPITime = moment
    .duration(moment.unix(expiredTokenAPI ?? 0).diff(timeNow))
    .asMinutes();
  if (isCountExpiredAPITime > timeClear) {
    return `${accessToken}`;
  } else {
    // Logout() // function logout user
    return "";
  }
};

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {},
  timeout: 15000,
});

// Add JWT token to headers
const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Add request interceptors
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const timeClear = 1; // as minutes
    const timeNow = moment();
    //get Token from user info
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // window.open("/login", "_self");
      return config;
    }
    //access token get from API login
    const expiredTokenAPI = decodeJwt(accessToken)?.exp;
    const isCountExpiredAPITime = moment
      .duration(moment.unix(expiredTokenAPI ?? 0).diff(timeNow))
      .asMinutes();

    if (isCountExpiredAPITime > timeClear) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      // config.headers["Authorization"] = `Bearer ${accessToken}`;
      window.open("/logout", "_self");
      // console.log("aa", isCountExpiredAPITime, timeClear);
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Nếu nhận 403 (tài khoản bị khóa / chưa duyệt) thì tự động logout
    if (error.response?.status === 403) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      window.open("/login", "_self");
    }
    return Promise.reject(error);
  },
);

export { api, setAuthToken };
