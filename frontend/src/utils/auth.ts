import zxcvbn from "zxcvbn";

import { hash, compare } from "bcryptjs";
import { SigninType, TokenDetails } from "@/types/User";
import { jwtDecode } from "jwt-decode";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
// import { SignupType } from "@/types/user";
// import { SignInData, SignUpData } from "@/types/user";

async function hashPassword(password: string) {
   const hashedPassword = await hash(password, 12);
   return hashedPassword;
}

async function verifyPassword(password: string, hashedPassword: string) {
   const isValid = await compare(password, hashedPassword);
   return isValid;
}

type Color =
   | "inherit"
   | "success"
   | "primary"
   | "secondary"
   | "warning"
   | "error";

const passwordScore = (password: string) => {
   const passwordScoreM = zxcvbn(password).score;
   const passwordPercent = (passwordScoreM * 100) / 4;
   const functionProgressColor = (): { status: string; color: Color } => {
      switch (passwordScoreM) {
         case 0:
            return { status: "خیلی ضعیف", color: "inherit" };
         case 1:
            return { status: "ضعیف", color: "error" };
         case 2:
            return { status: "متوسط", color: "warning" };
         case 3:
            return { status: "قوی", color: "secondary" };
         case 4:
            return { status: "خیلی قوی", color: "success" };
         default:
            return { status: "خیلی ضعیف", color: "inherit" };
      }
   };
   return {
      passwordPercent,
      passwordScoreM,
      passwordColor: functionProgressColor().color,
      passwordStatus: functionProgressColor().status,
   };
};

// const validateRegister = (values) => {
//    const errors = { email: "", password: "", re_password: "" };

//    if (!values.email) {
//       errors.email = "لطفا فیلد ایمیل را وارد !";
//    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//       errors.email = "لطفا یک ایمیل معتبر وارد کنید";
//    }

//    if (!values.password) {
//       errors.password = "لطفا یک پسورد برای حساب خود وارد کنید !";
//    } else if (values.password.length <= 6) {
//       errors.password = "پسورد شما باید حداقل شامل 7 حرف باشد ";
//    } else if (passwordScore(values.password).passwordScoreM < 2) {
//       errors.password = "لطفا پسورد قوی تری وارد کنید - حداقل سطح متوسط";
//    }

//    if (!values.re_password) {
//       errors.re_password = "لطفا فیلد تکرار رمز عبور را پر کنید !";
//    } else if (values.password !== values.re_password) {
//       errors.re_password = "مقدار وارد شده با رمز عبور هم خوانی ندارد !";
//    }

//    if (
//       errors.email.length === 0 &&
//       errors.password.length === 0 &&
//       errors.re_password.length === 0
//    ) {
//       return {};
//    }
//    return errors;
// };

const validateLogin = (values: SigninType) => {
   const errors = { phone: "", password: "" };
   if (!values.phone) {
      errors.phone = "لطفا فیلد شماره موبایل را وارد کنید !";
   } else if (
      values.phone.charAt(0) !== "0" ||
      values.phone.charAt(1) !== "9"
   ) {
      errors.phone = "شماره موبایل باید با 09 آغاز شود !";
   } else if (values.phone.length !== 11) {
      errors.phone = "شماره موبایل باید 11 رقم باشد !";
   }
   if (!values.password) {
      errors.password = "لطفا فیلد پسورد را وارد !";
   }

   if (errors.phone.length === 0 && errors.password.length === 0) {
      return {};
   }
   return errors;
};
export {
   hashPassword,
   verifyPassword,
   //    validateRegister,
   passwordScore,
   validateLogin,
};

export const decodedAccessToken = (
   accessToken: string | undefined | RequestCookie
) => {
   let user: TokenDetails | undefined = undefined;
   if (!accessToken) return { user: undefined, status: 401 };
   const { user_id, phone, name, lastname, is_admin }: TokenDetails = jwtDecode(
      accessToken.toString()
   );
   if (!user_id) {
      return { user: undefined, status: 401 };
   }
   user = {
      user_id,
      phone,
      name,
      lastname,
      is_admin,
   };
   return { user, status: 200 };
};

export const validateRegisterStepOne = (values: { phone: string }) => {
   const errors = { phone: "" };
   if (!values.phone) {
      errors.phone = "لطفا فیلد شماره موبایل را وارد کنید !";
   } else if (
      values.phone.charAt(0) !== "0" ||
      values.phone.charAt(1) !== "9"
   ) {
      errors.phone = "شماره موبایل باید با 09 آغاز شود !";
   } else if (values.phone.length !== 11) {
      errors.phone = "شماره موبایل باید 11 رقم باشد !";
   }
   if (errors.phone.length === 0) {
      return {};
   }
   return errors;
};
