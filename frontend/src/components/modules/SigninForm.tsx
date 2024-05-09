import { FormikFormSignInTpye } from "@/types/User";
import React from "react";

type Props = { isLoading?: boolean };

const SigninForm = ({
   values,
   touched,
   errors,
   handleChange,
   isLoading = false,
}: FormikFormSignInTpye & Props) => {
   return (
      <div className="flex flex-col gap-8 mt-10">
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
               className={`w-full px-3 py-3 bg-transparent border-2  placeholder:text-zinc-700
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
         <div className="relative flex flex-col gap-2 group">
            <label
               htmlFor="password"
               className={`sm:absolute transition-all ease-in -top-3 font-bold right-5 px-1 
                               sm:bg-zinc-900
                              ${
                                 touched.password && errors.password
                                    ? "text-red-300 group-hover:text-red-400 group-focus:text-red-400"
                                    : "text-zinc-600 group-hover:text-zinc-400 group-focus:text-zinc-400"
                              }
                        `}
            >
               رمز عبور
            </label>
            <input
               type="password"
               name="password"
               id="password"
               onChange={handleChange}
               value={values.password}
               autoFocus
               className={`w-full px-3 py-3 bg-transparent border-2  placeholder:text-zinc-700
                           outline-none rounded-xl transition-all ease-in
                         ${
                            touched.password && errors.password
                               ? "border-red-300 focus:border-red-400 group-hover:border-red-400"
                               : "border-zinc-700 focus:border-zinc-600 group-hover:border-zinc-600"
                         }
                         `}
            />
            <div
               className={`transition-all ease-in h-0 ${
                  touched.password && errors.password ? "h-3" : " "
               }`}
            >
               {touched.password && errors.password ? (
                  <p className="text-red-300 text-sm pr-5">{errors.password}</p>
               ) : null}
            </div>
         </div>
      </div>
   );
};

export default SigninForm;
