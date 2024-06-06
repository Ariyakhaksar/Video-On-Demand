"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import SwiperCore from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import Link from "next/link";
import MovieSlider from "@/constant/MovieSlider";
import CustomButton from "../elements/LoginButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {};

const SliderHomePage = (props: Props) => {
   const mainSwiperRef = useRef<SwiperCore | null>(null);
   const thumbnailSwiperRef = useRef<SwiperCore | null>(null);
   const isSyncingRef = useRef(false);
   const [sliderCount, setSliderCount] = useState(1);
   const [isBeginning, setIsBeginning] = useState(true);
   const [isEnd, setIsEnd] = useState(false);
   const onMainSlideChange = (swiper: SwiperCore) => {
      if (!isSyncingRef.current) {
         setIsBeginning(swiper.isBeginning);
         setIsEnd(swiper.isEnd);
         isSyncingRef.current = true;
         if (thumbnailSwiperRef.current) {
            thumbnailSwiperRef.current.slideTo(swiper.activeIndex);
         }
         setTimeout(() => {
            isSyncingRef.current = false;
         }, 300); // Adjusted timeout to ensure proper synchronization
      }
   };

   const onThumbnailSlideChange = (swiper: SwiperCore) => {
      // console.log(swiper.);
      // console.log(sliderCount)
      if (!isSyncingRef.current) {
         isSyncingRef.current = true;
         if (mainSwiperRef.current) {
            // console.log(mainSwiperRef.current)
            setSliderCount((prev) => prev + 1);
            mainSwiperRef.current.slideTo(swiper.activeIndex);
         }
         setTimeout(() => {
            isSyncingRef.current = false;
         }, 300); // Adjusted timeout to ensure proper synchronization
      }
   };

   const slideNext = () => {
      if (mainSwiperRef.current) {
         if (isEnd) {
            mainSwiperRef.current.slideTo(0); // بازگشت به اولین اسلاید
         } else {
            mainSwiperRef.current.slideNext();
         }
      }
   };

   const slidePrev = () => {
      if (mainSwiperRef.current) {
         if (isBeginning) {
            mainSwiperRef.current.slideTo(
               mainSwiperRef.current.slides.length - 1
            ); // رفتن به آخرین اسلاید
         } else {
            mainSwiperRef.current.slidePrev();
         }
      }
   };

   return (
      <>
         <Swiper
            // dir="rtl"
            effect="fade"
            fadeEffect={{ crossFade: true }}
            spaceBetween={0}
            slidesPerView={1}
            // loop={true}
            onSlideChange={onMainSlideChange}
            onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
            // pagination={{ clickable: true }}
            allowTouchMove={false} // Disable swipe
            style={{ height: "100vh", overflow: "hidden", zIndex: "0" }}
            modules={[EffectFade]}
         >
            {MovieSlider.map((item, index) => (
               <SwiperSlide key={index}>
                  <div className="relative h-full w-full">
                     <span
                        className="absolute top-0 w-full h-full bg-zinc-950 opacity-80"
                        style={{ zIndex: "-1" }}
                     ></span>
                     <span
                        className="h-screen lg:h-[80vh] bg-white bg-center w-full overflow-hidden absolute top-0 pointer-events-none bg-cover"
                        style={{
                           zIndex: "-2",
                           backgroundImage: `url(${item.bacImg})`,
                        }}
                     ></span>
                     <div className="container mx-auto absolute top-32 flex flex-col gap-4 w-full right-1/2 translate-x-1/2">
                        <h1 className="hidden lg:block text-2xl lg:text-4xl font-bold">
                           بروز ترین فیلم و سریال های اخیر
                        </h1>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
         <section className="w-full overflow-hidden absolute top-40 lg:top-64">
            <div className="container mx-auto">
               <Swiper
                  slidesPerView={1}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  spaceBetween={0}
                  onSlideChange={onThumbnailSlideChange}
                  onSwiper={(swiper) => (thumbnailSwiperRef.current = swiper)}
                  pagination={{
                     clickable: true,
                     el: ".custom-pagination",
                     bulletClass: "swiper-pagination-bullet",
                     bulletActiveClass: "swiper-pagination-bullet-active",
                     renderBullet: (index, className) => {
                        return (
                           '<span class="' +
                           className +
                           ' custom-bullet"></span>'
                        );
                     },
                  }}
                  autoplay={{
                     delay: 6000, // 3000 میلی‌ثانیه = 3 ثانیه
                     disableOnInteraction: false,
                  }}
                  // centeredSlides={true}
                  // loop={true}
                  breakpoints={{
                     480: { slidesPerView: 1 },
                     740: { slidesPerView: 1 },
                     1275: { slidesPerView: 1 },
                  }}
                  modules={[Autoplay, Pagination, EffectFade]}
               >
                  {MovieSlider.map((item, index) => (
                     <SwiperSlide key={index}>
                        <div className="flex justify-center lg:justify-start">
                           <div className="overflow-hidden">
                              <Link
                                 href={"/"}
                                 className="flex flex-col lg:flex-row gap-5 items-center lg:items-start"
                              >
                                 <Image
                                    src={item.image}
                                    alt=""
                                    width={1080}
                                    height={1920}
                                    className="rounded-md w-48"
                                 />
                                 <div className="py-3 flex flex-col items-center lg:items-start gap-3">
                                    <div className="flex gap-4 lg:gap-10 items-center">
                                       <span className="bg-zinc-600 bg-opacity-65 py-1 px-3 rounded-md">
                                          {item.Ages}
                                       </span>
                                       <div className="rounded-md flex items-center justify-center">
                                          <span
                                             className="text-orange-500 text-xl py-1 px-3 font-bold
                                          "
                                          >
                                             {" "}
                                             {item.imdb}
                                          </span>
                                          <span className="bg-orange-500 rounded-l-md py-1 px-3">
                                             IMDb
                                          </span>
                                       </div>
                                       <div className="rounded-md flex items-center justify-center">
                                          <span
                                             className="text-indigo-500 text-xl py-1 px-3 font-bold
                                          "
                                          >
                                             {" "}
                                             {item.like}
                                          </span>
                                          <span className="bg-indigo-500 rounded-l-md py-1 px-3">
                                             امتیاز منتقدین
                                          </span>
                                       </div>
                                    </div>
                                    <h2 className=" text-2xl lg:text-4xl font-bold my-2">
                                       {" "}
                                       <span className="text-orange-500">
                                          تماشای آنلاین
                                       </span>{" "}
                                       {item.title}
                                    </h2>
                                    <p className="w-full px-5 lg:w-1/2">
                                       {item.des}
                                    </p>
                                    <div className="mt-3">
                                       <CustomButton>
                                          ادامه / دانلود / تماشای آنلاین
                                       </CustomButton>
                                    </div>
                                 </div>
                              </Link>
                           </div>
                        </div>
                     </SwiperSlide>
                  ))}
                  <div className=" hidden lg:flex flex-col gap-8 justify-center lg:items-start items-center">
                     <div className="custom-pagination"></div>

                     <div className="flex flex-row items-center lg:justify-start gap-3">
                        <button
                           className={`transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg`}
                           onClick={slideNext}
                        >
                           <FaChevronRight className="text-xl text-zinc-800" />
                        </button>
                        <button
                           className={`transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg `}
                           onClick={slidePrev}
                        >
                           <FaChevronLeft className="text-xl text-zinc-800" />
                        </button>
                     </div>
                  </div>
                  <div className="lg:hidden ">
                     {/* دکمه‌های سفارشی */}
                     <button
                        className={`absolute z-[1000000] top-[20%] left-4 transform -translate-y-1/2 p-2 bg-white text-zinc-800 rounded-full shadow-lg`}
                        onClick={slidePrev}
                     >
                        <FaChevronLeft className="text-xl" />
                     </button>
                     <button
                        className={`absolute top-[20%] z-[1000000] right-4 transform -translate-y-1/2 p-2 bg-white  text-zinc-800 rounded-full shadow-lg`}
                        onClick={slideNext}
                     >
                        <FaChevronRight className="text-xl" />
                     </button>
                  </div>
               </Swiper>
            </div>
         </section>
      </>
   );
};

export default SliderHomePage;
