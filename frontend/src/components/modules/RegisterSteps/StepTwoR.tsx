import Opacity from "@/animations/Opacity";
import CustomButton from "@/components/elements/LoginButton";
import { OTP } from "@/components/elements/OtpInput";
import { RegisterUserCheckOTP } from "@/services/auth";
import { p2e } from "@/utils/replaceNumber";
import { Box } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

type Props = {};

const StepTwoR = (props: Props) => {
   const [otp, setOtp] = useState("");
   const [otpSubmitDisabled, setOtpSubmitDisabled] = useState(true);
   const [error, setError] = useState("");
   useEffect(() => {
      if (otp.length === 4) {
         setOtpSubmitDisabled(false);
      } else {
         setOtpSubmitDisabled(true);
      }
   }, [otp]);
   const [minutes, setMinutes] = useState(1);
   const [seconds, setSeconds] = useState(30);
   const [endTimer, setEndTimer] = useState(false);
   useEffect(() => {
      if (seconds !== 0 || minutes !== 0) {
         setEndTimer(false);
         const intervalId = setInterval(() => {
            if (seconds === 0) {
               setSeconds(59);
               setMinutes(minutes - 1);
            } else {
               setSeconds(seconds - 1);
            }
         }, 1000);

         return () => clearInterval(intervalId);
      } else {
         setEndTimer(true);
      }
   }, [seconds, minutes]);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!otp) return;
      const otpArray = otp.split("");
      for (let i = 0; i < otpArray.length; i++) {
         if (!/[0-9]/.test(otpArray[i])) {
            return setError("کد وارد شده معتبر نیست !");
         }
      }
      const res = await RegisterUserCheckOTP(otp);
      console.log(res)
      // if (res.error) {
      //    if (res.error.response.status === 500) {
      //       return setError("مشکلی در سمت سرور به وجود آمده است !");
      //    }
      // }
   };

   return (
      <form onSubmit={handleSubmit}>
         <p className="text-green-200 px-4">
            کد به شماره موبایل شما پیامک شد !
         </p>

         <div className={`my-5 ${error ? "otpInputBoxError" : " "}`} dir="ltr">
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 2,
                  alignItems: "center",
               }}
            >
               <OTP
                  separator={<span>-</span>}
                  value={otp}
                  onChange={setOtp}
                  length={4}
               />
               <div className="w-full h-4 text-center">
                  {error && (
                     <Opacity>
                        <p className="text-red-300 text-sm px-4" dir="rtl">
                           {error}
                        </p>
                     </Opacity>
                  )}
               </div>
               <div
                  className="mt-2 flex flex-row-reverse justify-between w-full px-5 items-center"
                  dir="ltr"
               >
                  <div className="select-none text-zinc-400 text-sm">
                     <span
                        className={`font-bold ${
                           !endTimer ? "text-blue-300" : "text-zinc-600"
                        }`}
                     >
                        {minutes} : {seconds < 10 && 0}
                        {seconds}
                     </span>
                     &nbsp; : ارسال مجدد کد
                  </div>
                  <div>
                     <button
                        disabled={!endTimer}
                        type="button"
                        className="text-[12px] transition-all ease-in bg-zinc-900 px-3 py-2 rounded-md
                        hover:bg-zinc-800 text-indigo-500 disabled:bg-zinc-800 disabled:opacity-30"
                     >
                        ارسال مجدد کد
                     </button>
                  </div>
               </div>
            </Box>
            <div className="w-full flex-col mt-8">
               <CustomButton
                  loading={false}
                  disabled={otpSubmitDisabled}
                  type="submit"
                  onClick={() => {}}
               >
                  تایید شماره موبایل
               </CustomButton>
            </div>
         </div>
      </form>
   );
};

export default StepTwoR;
