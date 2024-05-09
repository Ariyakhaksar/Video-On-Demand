"use client";
import { Button, ButtonProps, styled } from "@mui/material";
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
      },
   })
);
type props = {
   children: React.ReactNode;
   loading?: boolean;
   type?: "button" | "submit" | "reset";
};

const CustomButton = ({
   children,
   loading = false,
   type = "button",
}: props) => {
   return (
      <LoadingCButton loading={loading} disabled={loading} type={type}>
         {children}
      </LoadingCButton>
   );
};

export default CustomButton;
