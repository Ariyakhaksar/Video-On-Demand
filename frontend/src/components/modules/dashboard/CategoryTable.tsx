"use client";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { CategoryType } from "@/types/Category";
import { Pagination, TableCell, Tooltip } from "@mui/material";
import { IconButtonStyle } from "@/components/elements/IconButtons";
import { BsTrashFill } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { PiTrashDuotone } from "react-icons/pi";

type props = {
   categories: Array<CategoryType>;
};

export default function CategoryTable({ categories }: props) {
   const [currentPage, setCurrentPage] = useState(1);
   const handlePageChange = (
      event: React.ChangeEvent<unknown>,
      value: number
   ) => {
      setCurrentPage(value);
   };
   const itemsPerPage = 5;
   // تابع برای تقسیم لیست به زیرلیست‌های کوچکتر
   const chunkArray = <T,>(array: T[], size: number): T[][] => {
      const result: T[][] = [];
      for (let i = 0; i < array.length; i += size) {
         result.push(array.slice(i, i + size));
      }
      return result;
   };
   const chunkCategories = chunkArray(categories, itemsPerPage);

   return (
      <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
         <Table sx={{ minWidth: 650 }} aria-label="category table">
            <TableHead>
               <TableRow className="bg-zinc-800">
                  <TableCell align="right">شماره</TableCell>
                  <TableCell align="right">پوستر</TableCell>
                  <TableCell align="right">نام دسته</TableCell>
                  <TableCell align="right">اسلاگ</TableCell>
                  <TableCell align="right">تنظیمات</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {chunkCategories[currentPage - 1].map((row: CategoryType) => (
                  <TableRow
                     key={row.id}
                     sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                     }}
                  >
                     <TableCell
                        align="right"
                        component="th"
                        scope="row"
                        className="text-zinc-950 dark:text-zinc-50"
                     >
                        <span className="px-4 py-2 rounded-md bg-indigo-200 dark:bg-indigo-800">
                           {row.id}
                        </span>
                     </TableCell>
                     <TableCell
                        align="right"
                        className="text-zinc-950 dark:text-zinc-50"
                     >
                        <Image
                           src={row.baner}
                           width={1080}
                           height={1920}
                           alt={row.title}
                           className="w-[50px]"
                        />
                     </TableCell>
                     <TableCell
                        align="right"
                        dir="ltr"
                        className="text-zinc-950 dark:text-zinc-50"
                     >
                        {row.title}
                     </TableCell>
                     <TableCell
                        align="right"
                        dir="ltr"
                        className="text-zinc-950 dark:text-zinc-50"
                     >
                        {row.slug}
                     </TableCell>
                     <TableCell
                        align="right"
                        dir="ltr"
                        className="text-zinc-950 dark:text-zinc-50"
                     >
                        <div className="flex gap-3 items-center justify-end">
                           <Tooltip title={"حدف دسته"} placement="left-start">
                              <IconButtonStyle
                                 className="hover:bg-red-400 flex items-center justify-center hover:opacity-100"
                                 onClick={() => {}}
                              >
                                 <span className="text-base flex items-center justify-center">
                                    <PiTrashDuotone />
                                 </span>
                              </IconButtonStyle>
                           </Tooltip>
                           <Tooltip
                              title={"ویرایش دسته"}
                              placement="right-start"
                           >
                              <IconButtonStyle
                                 className="hover:bg-orange-300 flex hover:text-orange-900 items-center justify-center hover:opacity-100"
                                 onClick={() => {}}
                              >
                                 <span className="text-lg text-center">
                                    <RiEdit2Fill />
                                 </span>
                              </IconButtonStyle>
                           </Tooltip>
                        </div>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         <div
            dir="ltr"
            className="w-full  flex justify-center my-5 py-3 mb-0 bg-zinc-800"
         >
            <Pagination
               count={
                  categories ? Math.ceil(categories.length / itemsPerPage) : 0
               }
               page={currentPage}
               onChange={handlePageChange}
               shape="rounded"
            />
         </div>
      </TableContainer>
   );
}
