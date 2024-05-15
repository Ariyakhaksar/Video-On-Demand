import Opacity from "@/animations/Opacity";
import React from "react";

type Props = {
   result: {
      status: null | string;
      text: string;
   };
};

const AlertAuth = ({ result }: Props) => {
   return (
      <div
         className={`w-full text-sm overflow-hidden transition-all ease-in-out border-r-4 border-transparent
            ${
               result.status !== "error"
                  ? "border-green-800 text-green-800"
                  : "border-red-500 text-red-400"
            } mx-auto ${
            result.status == null
               ? "h-0 px-0 py-0 mt-3 opacity-0"
               : "px-5 py-2 my-6 mb-8 opacity-100"
         }`}
      >
         {result.text && (
            <Opacity>
               <p>{result.text}</p>
            </Opacity>
         )}
      </div>
   );
};

export default AlertAuth;
