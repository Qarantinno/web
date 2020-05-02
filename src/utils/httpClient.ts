import axios from "axios";

export const httpClient = axios.create({
  baseURL: "/api/",
  timeout: 1000,
});
