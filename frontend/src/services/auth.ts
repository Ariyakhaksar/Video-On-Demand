import api from "@/configs/api";
import { SigninType } from "@/types/User";
import { p2e } from "@/utils/replaceNumber";

const LoginUserApi = async (values: SigninType) => {
   try {
      const data: SigninType = {
         phone: p2e(values.phone).toString(),
         password: p2e(values.password).toString(),
      };
      const res = await api.post("/accounts/login/", {
         phone: data.phone,
         password: data.password,
      });
      return { res };
   } catch (error) {
      return { error };
   }
};

export { LoginUserApi };
