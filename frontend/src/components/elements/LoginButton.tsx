"use client";
import { styled } from "@mui/material";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";

import React from "react";

const LoadingCButton = styled(LoadingButton)<LoadingButtonProps>(
   ({ theme }) => ({
      width: "100%",
      color: "#fff",
      padding: "0.7rem 1.25rem",
      backgroundColor: "#4f46e5",
      borderRadius: "13px",
      transition: "all 0.3s ease-in",
      "&:hover": {
         backgroundColor: "#4f46e5",
         opacity: "0.80",
      },
      "&:disabled": {
         backgroundColor: "#4e46e597",
         color : "#e4e4e7",
         opacity : "0.5"
      },
   })
);
type props = {
   children: React.ReactNode;
   loading?: boolean;
   type?: "button" | "submit" | "reset";
   onClick?: () => void;
   disabled?: boolean;
};

const CustomButton = ({
   children,
   loading = false,
   type = "button",
   onClick,
   disabled = false,
}: props) => {
   return (
      <LoadingCButton
         loading={loading}
         disabled={loading || disabled}
         type={type}
         onClick={onClick}
      >
         {children}
      </LoadingCButton>
   );
};

export default CustomButton;
