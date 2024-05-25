"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CustomButton from "../elements/LoginButton";
import { useRouter } from "next/navigation";
import AlertAuth from "../elements/AlertAuth";
import PSRegister from "../elements/PSRegister";
import StepOneR from "../modules/RegisterSteps/StepOneR";
import StepTwoR from "../modules/RegisterSteps/StepTwoR";
import InOut from "@/animations/InOut";
import { Toaster } from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

type Props = {};

const SignupPage = (props: Props) => {
   const { data, isLoading: authLoading } = useAuth();
   const router = useRouter();
   useEffect(() => {
      if (data && !authLoading) {
         return router.push("/dashboard", { scroll: false });
      }
   });
   const [registerStepsNum, setRegisterStepsNum] = useState(1);
   const [result, setResult] = useState<{
      text: string;
      status: null | string;
   }>({
      text: "",
      status: null,
   });
   return (
      <section className="w-full relative min-h-[80vh] z-[0] bg-[url('/images/three-colors-red01.jpg')] sm:bg-[url('/images/three-colors-red.jpg')] bg-cover bg-center">
         <Toaster position="top-right" />
         <span className="w-full h-full absolute top-0 bg-zinc-950 opacity-80 z-[-1]"></span>
         <div className="text-zinc-100 mx-auto flex flex-col items-center h-full w-full ">
            <div className=" mt-5 sm:mt-10 text-3xl font-bold">LOGO</div>
            <div className="sm:bg-zinc-900 rounded-md  mt-5 sm:mt-10 p-5 px-5 lg:px-10 w-full sm:w-[500px]">
               <div
                  className=" text-xl font-bold text-center w-full border-b pt-2 pb-8
             border-zinc-700"
               >
                  <h1>ثبت نام در مووی فور یو</h1>
                  <PSRegister registerStepsNum={registerStepsNum} />
               </div>
               <div>
                  <AlertAuth result={result} />

                  {registerStepsNum === 1 && (
                     <InOut>
                        <StepOneR
                           setRegisterStepsNum={setRegisterStepsNum}
                           setResult={setResult}
                        />
                     </InOut>
                  )}
                  {registerStepsNum === 2 && (
                     <InOut>
                        <StepTwoR />
                     </InOut>
                  )}

                  <div className="mt-5 py-3 text-zinc-600 text-sm">
                     <p className="flex gap-2 items-center select-none pointer-events-none">
                        آیا قبلا ثبت نام کرده بودید؟
                        <Link
                           href={"/auth/signin"}
                           className="transition-all ease-in text-indigo-500 
                                        pointer-events-auto
                                      hover:text-indigo-400"
                        >
                           ورود به پنل کاربری
                        </Link>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default SignupPage;
