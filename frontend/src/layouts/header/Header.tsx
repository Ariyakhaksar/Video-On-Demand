"use client";
import IconButtons from "@/components/elements/IconButtons";
import CustomButton from "@/components/elements/LoginButton";
import ModeSwitch from "@/components/elements/ModeSwitch";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";

type Props = {
   userInfo: {
      data: AxiosResponse<any, any> | undefined;
      isLoading: boolean;
      status: "error" | "success" | "pending";
      error: Error | null;
   };
};

const Header = ({}: Props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [color, setColor] = useState(false);
   const changeColor = () => {
      if (window.scrollY >= 100) setColor(true);
      else setColor(false);
   };

   useEffect(() => {
      window.addEventListener("scroll", changeColor);
   }, [color]);
   const pathname = usePathname();
   return (
      <header
         className={`w-full transition-all ease-in ${
            pathname == "/"
               ? color
                  ? "bg-zinc-900 fixed top-0"
                  : " fixed top-0 "
               : "bg-zinc-900"
         }`}
         style={{ zIndex: "1000" }}
      >
         <section className="container mx-auto py-3 flex flex-col sm:flex-row gap-y-5 justify-between items-center">
            <div className="flex gap-10 items-center">
               <div className="font-bold text-3xl">LOGO</div>
               <ul className="hidden lg:flex flex-row gap-6">
                  <li>
                     <Link
                        href={"/"}
                        className="transition-all ease-in hover:text-indigo-100 hover:drop-shadow-[0_2px_10px_#5648ec]"
                     >
                        صفحه اصلی
                     </Link>
                  </li>
                  <li>
                     <Link href={"/"}>فیلم</Link>
                  </li>
                  <li>
                     <Link href={"/"}>سریال</Link>
                  </li>
                  <li>
                     <Link href={"/"}>250 فیلم برتر imdb</Link>
                  </li>
                  <li>
                     <Link href={"/"}>250 سریال برتر imdb</Link>
                  </li>
               </ul>
            </div>
            <div className="flex gap-5 items-center">
               <div className="lg:hidden inline-block">
                  <IconButtons tooltip_text="" icon={<FaBars />} />
               </div>
               <ModeSwitch />
               <IconButtons tooltip_text="جست و جو" icon={<RiSearch2Line />} />
               <Link
                  href={"/auth/signin"}
                  className={`${isLoading && "pointer-events-none"}`}
               >
                  <CustomButton
                     loading={isLoading}
                     onClick={() => {
                        redirect("/auth/sigin");
                     }}
                  >
                     {"error" !== "error" ? (
                        <>
                           <span className="text-xl ml-2">
                              <MdPerson />
                           </span>
                           پنل کاربری
                        </>
                     ) : (
                        <>
                           <span className="text-xl ml-2">
                              <MdPerson />
                           </span>
                           ورود / عضویت
                        </>
                     )}
                  </CustomButton>
               </Link>
            </div>
         </section>
      </header>
   );
};

export default Header;
