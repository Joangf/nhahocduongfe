import axios from "axios";

export const API_PROVINCE = axios.create({
  baseURL: "https://provinces.open-api.vn/api",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => {
    return true;
  },
});
