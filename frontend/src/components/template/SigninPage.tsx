"use client";
import React, { useState } from "react";
import CustomButton from "../elements/LoginButton";
import { useFormik } from "formik";
import Link from "next/link";
import SigninForm from "../modules/SigninForm";
import { validateLogin } from "@/utils/auth";
import { LoginUserApi } from "@/services/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { setCookieAuth } from "@/utils/cookie";

type Props = {};

const SigninPage = (props: Props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [result, setResult] = useState({
      text: "",
      status: 0,
   });
   const router = useRouter();
   const LoginFormik = useFormik({
      initialValues: {
         phone: "",
         password: "",
      },
      validate: validateLogin,
      onSubmit: async (values) => {
         setIsLoading(true);
         const { res } = await LoginUserApi(values);
         if (res && res?.status == 200) {
            setResult({
               text: "خوش آمدید !  در حال انتقال به پنل کاربری ....",
               status: 200,
            });
            setCookieAuth(res?.data);
            setTimeout(() => {
               router.push("/dashboard");
            }, 1000);
         } else {
            setIsLoading(false);
            setResult({
               text: "شماره موبایل یا پسورد شما اشتباه است لطفا مجددا امتحان کنید !",
               status: 401,
            });
         }
      },
   });

   const { handleSubmit, handleChange, values, errors, touched } = LoginFormik;

   return (
      <section className="w-full relative min-h-[80vh] z-[0] bg-[url('/images/three-colors-red01.jpg')] sm:bg-[url('/images/three-colors-red.jpg')] bg-cover bg-center">
         <span className="w-full h-full absolute top-0 bg-zinc-950 opacity-80 z-[-1]"></span>
         <div className="text-zinc-100 mx-auto flex flex-col items-center h-full w-full ">
            <div className=" mt-5 sm:mt-10 text-3xl font-bold">LOGO</div>
            <div className="sm:bg-zinc-900 rounded-md  mt-5 sm:mt-10 p-5 px-5 lg:px-10 w-full sm:w-[500px]">
               <div
                  className=" text-xl font-bold text-center w-full border-b pt-2 pb-8
                  border-zinc-700"
               >
                  <h1>ورود به حساب کاربری</h1>
               </div>
               <div>
                  <div
                     className={`w-full rounded-md text-sm overflow-hidden transition-all ease-in
                     ${
                        result.status !== 401 ? "bg-green-800" : "bg-red-500"
                     } mx-auto ${
                        result.status == 0
                           ? "h-0 px-0 py-0 mt-3"
                           : "px-5 py-4 mt-3"
                     }`}
                  >
                     <p>{result.text}</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                     <SigninForm
                        values={values}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        isLoading={isLoading}
                     />
                     <div className="w-full flex-col mt-10">
                        <CustomButton loading={isLoading} type="submit">
                           ورود به پنل کاربری
                        </CustomButton>
                     </div>
                     <div className="mt-5 py-3 text-zinc-600 text-sm">
                        <p className="flex gap-2 select-none pointer-events-none">
                           آیا قبلا ثبت نام نکرده بودید؟
                           <Link
                              href={"/auth/signup"}
                              className="transition-all ease-in text-indigo-500 
                                 pointer-events-auto
                               hover:text-indigo-400"
                           >
                              ثبت نام در مووی فور یو
                           </Link>
                        </p>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
};

export default SigninPage;
