import { RegisterSteps } from "@/constant/RegisterSteps";
import { Box, LinearProgress } from "@mui/material";
import React from "react";
import { GoDotFill } from "react-icons/go";

type Props = {
   registerStepsNum: number;
};

const PSRegister = ({ registerStepsNum }: Props) => {
   return (
      <div className="re text-zinc-100 w-full font-medium text-sm  mt-8 select-none">
         <div className="flex  justify-between">
            {RegisterSteps.map((item) => (
               <div key={item.id}>
                  <span className="text-zinc-100">{item.title}</span>
               </div>
            ))}
         </div>
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               marginTop: "15px",
               position: "relative",
            }}
         >
            <Box sx={{ width: "100%", direction: "rtl" }}>
               <LinearProgress
                  variant="determinate"
                  color="success"
                  className="rounded-md rotate-180"
                  value={
                     registerStepsNum < 4
                        ? registerStepsNum == 1
                           ? 13
                           : registerStepsNum == 2
                           ? 52
                           : 89
                        : 100
                  }
               />
            </Box>
            <span
               className={`absolute right-[10%] text-xl transition-all ease-in ${
                  registerStepsNum >= 1 ? "text-green-700" : "text-zinc-100"
               }`}
            >
               <GoDotFill />
            </span>
            <span
               className={`absolute right-[50%] text-xl transition-all ease-in ${
                  registerStepsNum >= 2 ? "text-green-700" : "text-zinc-100"
               }`}
            >
               <GoDotFill />
            </span>
            <span
               className={`absolute right-[87%] text-xl transition-all ease-in ${
                  registerStepsNum >= 3 ? "text-green-700" : "text-zinc-100"
               }`}
            >
               <GoDotFill />
            </span>
         </Box>
      </div>
   );
};

export default PSRegister;
