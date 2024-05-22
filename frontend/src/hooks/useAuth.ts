"use client";
import { getProfile } from "@/services/user";
import { UserData } from "@/types/User";
import { getCookie, setCookie } from "@/utils/cookie";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";


const fetchUser = async (): Promise<UserData> => {
   const accessToken = getCookie("access");

   //    if (!accessToken) {
   //       throw new Error("No access token");
   //    }

   try {
      const response = await axios.get<UserData>(
         "http://localhost:8000/accounts/profile/user/",
         {
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
         }
      );

      return response.data;
   } catch (error) {
      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError;

         if (axiosError.response && axiosError.response.status === 401) {
            const refreshToken = getCookie("refresh");
            if (!refreshToken) {
               throw new Error("No refresh token");
            }

            // Refresh the access token
            const refreshResponse = await axios.post(
               "http://localhost:8000/accounts/token/refresh/",
               {
                  refresh: refreshToken,
               }
            );

            const newAccessToken = refreshResponse.data.access;
            Cookies.set("access", newAccessToken);
            setCookie({ access: newAccessToken, refresh: newAccessToken });

            // Retry the original request with the new access token
            const retryResponse = await axios.get<UserData>(
               "http://localhost:8000/accounts/profile/user/",
               {
                  headers: {
                     Authorization: `Bearer ${newAccessToken}`,
                  },
               }
            );

            return retryResponse.data;
         } else {
            throw error;
         }
      } else {
         throw error;
      }
   }
};

const useAuth = () => {
   return useQuery({ queryKey: ["profile"], queryFn: getProfile });
};

export default useAuth;
