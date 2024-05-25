"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, A11y } from "swiper/modules";

type Props = {};

const SliderHomePage = (props: Props) => {
   return (
      <section dir="ltr" className="container mx-auto ">
         <Swiper
            slidesPerView={1}
            spaceBetween={15}
            pagination={{
               clickable: true,
            }}
            breakpoints={{
               480: { slidesPerView: 1 },
               740: { slidesPerView: 4 },
               1275: { slidesPerView: 7 },
            }}
            modules={[Pagination, Navigation, A11y]}
            className="mySwiper"
            navigation={true}
         >
            <SwiperSlide>
               <div className="flex justify-center">
                  <div className="bg-blue-500 w-48 h-72 rounded-md"></div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="flex justify-center">
                  <div className="bg-blue-500 w-48 h-72 rounded-md"></div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="flex justify-center">
                  <div className="bg-blue-500 w-48 h-72 rounded-md"></div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="flex justify-center">
                  <div className="bg-blue-500 w-48 h-72 rounded-md"></div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="flex justify-center">
                  <div className="bg-blue-500 w-48 h-72 rounded-md"></div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="flex justify-center">
                  <div className="bg-blue-500 w-48 h-72 rounded-md"></div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="flex justify-center">
                  <div className="bg-blue-500 w-48 h-72 rounded-md"></div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="flex justify-center">
                  <div className="bg-blue-500 w-48 h-72 rounded-md"></div>
               </div>
            </SwiperSlide>
         </Swiper>
      </section>
   );
};

export default SliderHomePage;
