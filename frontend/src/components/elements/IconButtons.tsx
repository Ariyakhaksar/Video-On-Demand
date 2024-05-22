"use client";
import LoadingButton from "@mui/lab/LoadingButton";
import {
   Button,
   IconButton,
   IconButtonProps,
   Tooltip,
   styled,
} from "@mui/material";
import React from "react";

type Props = {
   icon: JSX.Element;
   tooltip_text: string;
   onClick?: () => void;
};

export const IconButtonStyle = styled(IconButton)<IconButtonProps>(
   ({ theme }) => ({
      color: "#fff",
      padding: "0.7rem",
      backgroundColor: "#242429",
      borderRadius: "13px",
      transition: "all ease-in 0.3s",
      "&:hover": {
         backgroundColor: "#242429",
         opacity: "0.50",
      },
   })
);

export const ButtonStyle2 = styled(LoadingButton)<IconButtonProps>(
   ({ theme }) => ({
      color: "#fff",
      padding: "0.7rem",
      backgroundColor: "#242429",
      borderRadius: "13px",
      transition: "all ease-in 0.3s",
      "&:hover": {
         backgroundColor: "#242429",
         opacity: "0.50",
      },
   })
);
export const ButtonStyleList = styled(LoadingButton)<IconButtonProps>(
   ({ theme }) => ({
      color: "#fff",
      padding: "0.7rem",
      backgroundColor: "transparent",
      borderRadius: "0px",
      transition: "all ease-in 0.3s",
      "&:hover": {
         backgroundColor: "#242429",
         // opacity: "0.50",
         borderRadius: "8px",
      },
   })
);

const IconButtons = ({ icon, tooltip_text, onClick = () => {} }: Props) => {
   return (
      <Tooltip title={tooltip_text}>
         <IconButtonStyle onClick={onClick}>{icon}</IconButtonStyle>
      </Tooltip>
   );
};

export default IconButtons;
