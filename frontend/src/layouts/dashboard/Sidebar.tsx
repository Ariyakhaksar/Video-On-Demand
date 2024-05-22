"use client";
import {
   ButtonStyle2,
   ButtonStyleList,
} from "@/components/elements/IconButtons";
import UIListDashboard from "@/constant/UlListDashboard";
import Link from "next/link";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { usePathname } from "next/navigation";
import { IoExit } from "react-icons/io5";

type Props = {};

const Sidebar = (props: Props) => {
   const pathname = usePathname();
   return (
      <div>
         <div className="w-full justify-center">
            <div
               className="w-[90px] h-[90px] mx-auto rounded-full flex justify-center items-center bg-indigo-600
            shadow-[0_0px_10px_0px_#6366f1]"
            >
               <span className="text-4xl text-zinc-100">
                  <MdPerson />
               </span>
            </div>
            <div className="my-5 text-center flex flex-col gap-2">
               <span className="text-sm">
                  <span>کاربر</span> گرامی ، خوش آمدید
               </span>
               <p className="font-bold text-xl">آریا خاکسار</p>
               <ButtonStyle2
                  className="w-full rounded-lg text-sm mx-auto mt-2"
                  loading={false}
                  type="button"
               >
                  نمایش اطلاعات شما
               </ButtonStyle2>
            </div>

            <div>
               <ul className="flex flex-col gap-2">
                  {UIListDashboard.map((item) => (
                     <li key={item.id}>
                        <Link href={item.link}>
                           <ButtonStyleList
                              className={`w-full rounded-lg 
                                 ${
                                    pathname === item.link
                                       ? "bg-[#242429] text-orange-300 dark:text-orange-300"
                                       : "text-zinc-950 dark:text-zinc-100"
                                 }
                               hover:text-zinc-100 flex justify-between px-5 text-sm mx-auto mt-2`}
                              loading={false}
                              type="button"
                              endIcon={<FaChevronLeft />}
                           >
                              {item.title}
                           </ButtonStyleList>
                        </Link>
                     </li>
                  ))}
                  <li>
                     <ButtonStyleList
                        className={`w-full rounded-lg  text-red-400 dark:text-red-400
                                 hover:bg-red-900
                               hover:text-red-100 flex justify-between px-5 text-sm mx-auto mt-2`}
                        loading={false}
                        type="button"
                        endIcon={<IoExit />}
                     >
                        خروج از حساب کاربری
                     </ButtonStyleList>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
