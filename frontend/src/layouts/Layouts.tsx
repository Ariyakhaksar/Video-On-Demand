"use client";
import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/user";
import { CircularProgress } from "@mui/material";
import LoadingPage from "@/components/modules/LoadingPage";

type Props = {
   children: React.ReactNode;
};

const Layouts = ({ children }: Props) => {
   const { data, isLoading, status, error } = useQuery({
      queryKey: ["profile"],
      queryFn: () => getProfile(),
   });

   return (
      <>
         <section className="relative w-full text-zinc-100">
            <Header userInfo={{ data, isLoading, status, error }} />
         </section>
         <main className="relative">
            {isLoading && <LoadingPage />}
            {children}
         </main>
         <Footer />
      </>
   );
};

export default Layouts;
