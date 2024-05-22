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

axios.defaults.withCredentials = true;

const RegisterUserSendOTP = async (values: { phone: string }) => {
   const phone = values.phone.toString(); // Assuming p2e is a function to convert Persian to English digits
   try {
      const response = await axios.post(
         "http://127.0.0.1:8000/accounts/authentication/",
         { phone }
      );
      return { response: response };
   } catch (error) {
      if (axios.isAxiosError(error)) {
         return { error: error.response ? error.response.data : error.message };
      } else {
         return { error: "Unexpected error occurred" };
      }
   }
};

const RegisterUserCheckOTP = async (otp: number) => {
   console.log(getCookie("sessionid"));
   try {
      const res = await axios.post(
         "http://127.0.0.1:8000/accounts/veryfy/otp/",
         { code: otp }
      );
      console.log(res.data);
   } catch (error) {
      if (axios.isAxiosError(error)) {
         console.error(
            "Error verifying OTP:",
            error.response ? error.response.data : error.message
         );
      } else {
         console.error("Unexpected error:", error);
      }
   }
};
export { LoginUserApi, RegisterUserSendOTP, RegisterUserCheckOTP };
