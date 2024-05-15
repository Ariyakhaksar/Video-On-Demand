import api from "@/configs/api";
import { getCookie } from "@/utils/cookie";

const getNewTokens = async () => {
   const refresh = getCookie("refresh");
   if (!refresh) return;
   try {
      const response = await api.post("accounts/token/refresh/", { refresh });
      return {response};
   } catch (error) {
      return { error };
   }
};

export { getNewTokens };
