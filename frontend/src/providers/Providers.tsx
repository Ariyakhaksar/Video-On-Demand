"use client";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import defaultOptions from "@/configs/reactQuery";

type Props = {
   children: React.ReactNode;
};
const queryClient = new QueryClient({ defaultOptions });

const Providers = ({ children }: Props) => {
   const theme = createTheme({
      typography: {
         fontFamily: "var(--font-yekan)",
      },
   });

   return (
         <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
         </QueryClientProvider>
   );
};

export default Providers;
