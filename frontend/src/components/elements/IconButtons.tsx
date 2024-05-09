"use client";
import { IconButton, IconButtonProps, Tooltip, styled } from "@mui/material";
import React from "react";

type Props = {
   icon: JSX.Element;
   tooltip_text: string;
};

export const IconButtonStyle = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    color: "#fff",
    padding: "0.7rem",
    backgroundColor: "#242429",
    borderRadius : "13px" ,
    transition : "all ease-in 0.3s",
    "&:hover": {
      backgroundColor: "#242429",
       opacity: "0.50",
    },
 }));


const IconButtons = ({ icon, tooltip_text }: Props) => {
   return (
      <Tooltip title={tooltip_text}>
         <IconButtonStyle>{icon}</IconButtonStyle>
      </Tooltip>
   );
};

export default IconButtons;
