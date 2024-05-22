import api from "@/configs/api";
import { AuthResponse } from "@/types/User";
import { getCookie } from "@/utils/cookie";
import { AxiosResponse } from "axios";

const getNewTokens = async (): Promise<AxiosResponse<AuthResponse> | undefined> => {
   const refresh = getCookie("refresh");
   if (!refresh) return;
   try {
      const response = await api.post<AuthResponse>("accounts/token/refresh/", {
         refresh,
      });
      return response;
   } catch (error) {
      console.error("Failed to refresh tokens:", error);
      return;
   }
};

export { getNewTokens };
