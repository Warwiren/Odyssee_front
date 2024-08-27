import axios from "axios";
//import { Cookies } from "react-cookie";

// const apiURL = import.meta.env.VITE_APP_API_DOMAIN;
const apiURL = "http://localhost:8000/api";

export const API = axios.create({
  baseURL: apiURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// API.interceptors.request.use(function (config: any) {
//   const cookies = new Cookies();
//   const connectCookie = cookies.get("auth_token");
//   const token = connectCookie;
//   config.headers = {
//     Authorization: `Bearer ${token}`,
//   };
//   return config;
// });
