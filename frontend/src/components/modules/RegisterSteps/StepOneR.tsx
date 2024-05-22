import CustomButton from "@/components/elements/LoginButton";
import { RegisterUserSendOTP } from "@/services/auth";
import { validateRegisterStepOne } from "@/utils/auth";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
   setResult: React.Dispatch<
      React.SetStateAction<{
         text: string;
         status: null | string;
      }>
   >;
   setRegisterStepsNum: React.Dispatch<React.SetStateAction<number>>;
};

const StepOneR = ({ setResult, setRegisterStepsNum }: Props) => {
   const [isLoading, setIsloading] = useState(false);
   const LoginFormik = useFormik({
      initialValues: {
         phone: "",
      },
      validate: validateRegisterStepOne,
      onSubmit: async (values: { phone: string }) => {
         setIsloading(true);
         const response = await RegisterUserSendOTP(values)
         // if (response.error) {
         //    console.log(response.error)
         //    if (response.error.response.status === 302) {
         //       setResult({ text: "کد با موفقیت ارسال شد", status: "success" });
         //       toast.success("کد با موفقیت ارسال شد");
         //       setResult({
         //          text: "",
         //          status: null,
         //       });
         //       setTimeout(() => {
         //          setRegisterStepsNum(2);
         //       }, 1000);
         //       setIsloading(false);
         //    } else if (response.error.response.status === 400) {
         //       setResult({
         //          text: "شماره موبایل قبلا ثبت شده است !",
         //          status: "error",
         //       });
         //       // toast.error("شماره موبایل قبلا ثبت شده است !");
         //       setIsloading(false);
         //    }
         // } else {
         //    setResult({
         //       text: "مشکلی از سمت سرور پیش آمده است بعدا امتحان کنید !",
         //       status: "error",
         //    });
         //    // toast.error("مشکلی از سمت سرور پیش آمده است بعدا امتحان کنید !");
         //    setIsloading(false);
         // }
         console.log(response);
         setRegisterStepsNum(2);
      },
   });
   const { handleSubmit, handleChange, values, errors, touched } = LoginFormik;

   return (
      <form className="mt-5" onSubmit={handleSubmit}>
         <div className="relative flex flex-col gap-2 group">
            <label
               htmlFor="phone"
               className={`sm:absolute transition-all ease-in -top-3 font-bold right-5 px-1 
                               sm:bg-zinc-900
                               
                              ${
                                 touched.phone && errors.phone
                                    ? "text-red-300 group-hover:text-red-400 group-focus:text-red-400"
                                    : "text-zinc-600 group-hover:text-zinc-400 group-focus:text-zinc-400"
                              }
                        `}
            >
               شماره موبایل
            </label>
            <input
               type="text"
               id="phone"
               name="phone"
               value={values.phone}
               autoFocus
               onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                     event.preventDefault();
                  }
               }}
               onChange={handleChange}
               maxLength={11}
               placeholder="برای مثال :09300000000"
               className={`w-full px-3 py-3 pt-4 bg-transparent border-2  placeholder:text-zinc-700
                           outline-none rounded-xl transition-all ease-in
                         ${
                            touched.phone && errors.phone
                               ? "border-red-300 focus:border-red-400 group-hover:border-red-400"
                               : "border-zinc-700 focus:border-zinc-600 group-hover:border-zinc-600"
                         }
                         `}
            />
            <div
               className={`transition-all ease-in h-0 ${
                  touched.phone && errors.phone ? "h-3" : " "
               }`}
            >
               {touched.phone && errors.phone ? (
                  <p className="text-red-300 text-sm pr-5">{errors.phone}</p>
               ) : null}
            </div>
         </div>
         <div className="w-full flex-col mt-8">
            <CustomButton loading={isLoading} type="submit" onClick={() => {}}>
               ارسال کد
            </CustomButton>
         </div>
      </form>
   );
};

export default StepOneR;
