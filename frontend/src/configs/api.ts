import { getNewTokens } from "@/services/token";
import { getCookie, setCookie } from "@/utils/cookie";
import axios from "axios";

const api = axios.create({
   baseURL: "http://127.0.0.1:8000/",
   headers: {
      "Content-Type": "application/json",
   },
});

api.interceptors.request.use(
   (request) => {
      const accessToken = getCookie("access");
      if (accessToken) {
         request.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return request;
   },
   (error) => {
      return Promise.reject(error);
   }
);

api.interceptors.response.use(
   (response) => {
      return response;
   },
   async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
         const res = await getNewTokens();
         if (!res?.response) return;
         setCookie(res.response.data);
         return api(originalRequest);
      }
   }
);

export default api;
