import axios from "axios";

const appApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials:true,
});

//Todo: conf interceptors

appApi.interceptors.request.use((config) => {
  config.headers["authorization"] = sessionStorage.getItem("token");
  return config;
});

export default appApi;