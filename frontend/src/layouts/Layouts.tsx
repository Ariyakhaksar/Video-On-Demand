"use client";
import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

import LoadingPage from "@/components/modules/LoadingPage";
import useAuth from "@/hooks/useAuth";

type Props = {
   children: React.ReactNode;
};

const Layouts = ({ children }: Props) => {
   const { data, error, status, isLoading } = useAuth();

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
