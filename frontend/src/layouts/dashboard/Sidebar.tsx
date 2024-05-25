"use client";
import {
   ButtonStyle2,
   ButtonStyleList,
} from "@/components/elements/IconButtons";
import UIListDashboard from "@/constant/UlListDashboard";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { usePathname } from "next/navigation";
import { IoExit } from "react-icons/io5";
import Swal from "sweetalert2";
import { UserData } from "@/types/User";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { removeCookie } from "@/utils/cookie";

type Props = {
   UserData: UserData | undefined;
};

const Sidebar = ({ UserData }: Props) => {
   const pathname = usePathname();

   const [textSir, setTextSir] = useState("");
   const [name, SetName] = useState("");

   useEffect(() => {
      if (UserData?.name) {
         SetName(UserData.name + " " + UserData.lastname);
      }
      if (UserData?.is_admin) {
         setTextSir("ادمین");
      } else {
         setTextSir("کاربر");
      }
   }, [UserData]);
   const queryClient = useQueryClient();
   const logOutHandler = () => {
      Swal.fire({
         title: "<span className='font-bold'>با خروج از حساب موافقت میکنید ؟</span>",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#fb7185",
         cancelButtonColor: "#8b5cf6",
         cancelButtonText: "بمون",
         focusCancel: true,
         confirmButtonText: "بله , خارج شو !",
      }).then((result) => {
         if (result.isConfirmed) {
            removeCookie("access");
            removeCookie("refresh");
            queryClient.refetchQueries({ queryKey: ["profile"] });

            // ادامه دارد
         }
      });
   };

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
                  <span>{textSir}</span> گرامی ، خوش آمدید
               </span>
               <p className="font-bold text-xl">{name}</p>
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
                        onClick={logOutHandler}
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
