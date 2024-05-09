"use server";

import { LoginUserApi } from "@/services/auth";
import { SigninType } from "@/types/User";
import { p2e } from "@/utils/replaceNumber";

const LoginUser = async (values: SigninType) => {
   const data: SigninType = {
      phone: p2e(values.phone).toString(),
      password: p2e(values.password).toString(),
   };
   const { response, error } = await LoginUserApi(data);
   return {response, error}
};

export { LoginUser };
