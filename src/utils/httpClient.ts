import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://178.128.203.91/api/v1",
  headers: {
    "client-token": "8b1da40e-cb59-456e-846f-4ff9b3517b3b"
  }
});
