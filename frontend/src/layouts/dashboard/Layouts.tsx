"use client";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type Props = {
   children: React.ReactNode;
};

const Layouts = ({ children }: Props) => {
   const { data, isLoading } = useAuth();
   const router = useRouter();
   useEffect(() => {
      if (!data && !isLoading) {
         return router.push("/auth/signin", { scroll: false });
      }
   });

   return (
      <div className="container mx-auto flex gap-5 flex-col-reverse lg:flex-row">
         <section className="bg-zinc-100 dark:bg-zinc-800 w-full lg:w-1/4 rounded-lg p-5 mt-5">
            <Sidebar UserData={data?.data} />
         </section>
         <section className="bg-zinc-100 dark:bg-zinc-900 w-full lg:w-3/4 rounded-lg p-5 mt-5">
            {children}
         </section>
      </div>
   );
};

export default Layouts;
