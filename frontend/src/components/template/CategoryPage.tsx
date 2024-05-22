"use client";
import React from "react";
import TitleLabelPages from "../modules/dashboard/TitleLabelPages";
import CategoryTable from "../modules/dashboard/CategoryTable";
import ExCategories from "@/constant/ExCategories";
import { LoadingCButton2 } from "../elements/LoginButton";
import { RiAddFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/admin/categories";

type Props = {};

const CategoryPage = (props: Props) => {
   const { data, isLoading } = useQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
   });
   console.log({ data, isLoading });
   return (
      <section className="flex flex-col gap-3">
         <TitleLabelPages title="دسته بندی ها" />
         <div className="w-full flex flex-col-reverse lg:flex-row gap-5 justify-between items-center rounded-lg px-5 py-3">
            <div className="flex flex-col lg:flex-row gap-2 lg:item-center w-full lg:w-auto">
               <label
                  htmlFor="search-category"
                  className="text-base text-orange-500 dark:text-orange-300"
               >
                  جست و جو :
               </label>
               <input
                  type="text"
                  className="py-1 bg-zinc-200 w-full lg:w-[250px] dark:bg-zinc-800 outline-none px-3 rounded-md"
               />
            </div>
            <div className="flex gap-2 items-center">
               <LoadingCButton2 className="flex gap-3 items-center">
                  ایجاد دسته جدید{" "}
                  <span className="text-2xl">
                     <RiAddFill />
                  </span>
               </LoadingCButton2>
            </div>
         </div>
         <div>
            {isLoading ? (
               <>در حال دریافت اطلاعات !</>
            ) : data?.data ? (
               <>
                  <CategoryTable categories={data.data} />
               </>
            ) : (
               <></>
            )}
         </div>
      </section>
   );
};

export default CategoryPage;
