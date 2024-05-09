import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

type Props = {
   children: React.ReactNode;
};

const Layouts = ({ children }: Props) => {
   return (
      <>
         <section className="relative w-full text-zinc-100">
            <Header />
         </section>
         <main>{children}</main>
         <Footer />
      </>
   );
};

export default Layouts;
