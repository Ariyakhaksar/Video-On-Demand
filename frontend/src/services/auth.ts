import api from "@/configs/api";
import { SigninType } from "@/types/User";
import { getCookie } from "@/utils/cookie";
import { p2e } from "@/utils/replaceNumber";
import axios from "axios";

const LoginUserApi = async (values: SigninType) => {
   const data: SigninType = {
      phone: p2e(values.phone).toString(),
      password: p2e(values.password).toString(),
   };
   try {
      const res = await api.post("accounts/login/", {
         phone: data.phone,
         password: data.password,
      });
      return { res };
   } catch (error) {
      return { error };
   }
};

const RegisterUserSendOTP = async (values: { phone: string }) => {
   const phone = p2e(values.phone).toString();
   try {
      const response = await axios.post(
         "http://127.0.0.1:8000/accounts/authentication/",
         { phone }
      );
      return { response: response };
   } catch (error: any) {
      return { error };
   }
};

const RegisterUserCheckOTP = async (otp: number | string) => {
   const cookies = getCookie("sessionid");
   console.log(cookies)
   try {
      const code = p2e(otp);
      const response = await axios.post(
         "http://127.0.0.1:8000/accounts/veryfy/otp/",
         { code },
         {
            // withCredentials: true,
            headers: {
               Cookie: `csrftoken= "HxehdO6Dgwht9111vNApPwl50z7v7bRW"; sessionid=${cookies}; `,
               Cache: "no-cache",
               Accept: "application/json",
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Headers": "*",
               "Access-Control-Allow-Credentials": "true",
            },
         }
      );
      return { response: response };
   } catch (error: any) {
      return { error };
   }
};

export { LoginUserApi, RegisterUserSendOTP, RegisterUserCheckOTP };
