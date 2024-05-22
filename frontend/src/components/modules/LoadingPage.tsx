import { CircularProgress } from "@mui/material";
import React from "react";

type Props = {};

const LoadingPage = (props: Props) => {
   return (
      <div className="absolute top-0 bg-zinc-900 transition-all ease-out flex justify-center items-center z-10 w-full h-[100vh]">
         <CircularProgress color="primary" />
      </div>
   );
};

export default LoadingPage;
