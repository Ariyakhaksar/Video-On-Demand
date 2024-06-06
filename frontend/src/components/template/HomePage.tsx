"use client";
import React from "react";
import SliderHomePage from "../modules/SliderHomePage";

type Props = {};

const HomePage = (props: Props) => {
   return (
      <section>
         <div className="relative h-[100vh] lg:h-[80vh] lg:overflow-hidden text-zinc-50">
            <div className="w-full bg-white mx-auto" style={{ zIndex: "1" }}>
               
               <SliderHomePage />
            </div>
         </div>
         سلام دنیا
         <div className=""></div>
      </section>
   );
};

export default HomePage;
