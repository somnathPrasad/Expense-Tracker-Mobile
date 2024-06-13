import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.105.68:3000",
});
