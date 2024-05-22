import React, { useEffect, useState } from "react";
import IconButtons from "./IconButtons";
import { IoMoonSharp } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { CircularProgress } from "@mui/material";
type Props = {};

const ModeSwitch = (props: Props) => {
   const [mounted, setMounted] = useState(false);
   const { theme, setTheme } = useTheme();

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) {
      return (
         <span className="select-none pointer-events-none opacity-45 cursor-default">
            <IconButtons
               tooltip_text=""
               icon={<CircularProgress size={24} />}
            />
            
         </span>
      );
   }
   return (
      <>
         {theme === "light" ? (
            <IconButtons
               tooltip_text=""
               icon={
                  <span className="text-indigo-100">
                     <IoMoonSharp />
                  </span>
               }
               onClick={() => setTheme("dark")}
            />
         ) : (
            <IconButtons
               tooltip_text=""
               icon={
                  <span className="text-orange-500">
                     <MdOutlineLightMode />
                  </span>
               }
               onClick={() => setTheme("light")}
            />
         )}
      </>
   );
};

export default ModeSwitch;
