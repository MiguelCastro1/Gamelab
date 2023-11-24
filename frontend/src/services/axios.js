import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:3333/"
  //baseURL: "https://afternoon-tundra-10183.herokuapp.com",
  //withCredentials: true,
  //credentials: "include",
});

api.interceptors.request.use(async (config) => {
  let token = JSON.parse(getToken()) ? JSON.parse(getToken()).token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
