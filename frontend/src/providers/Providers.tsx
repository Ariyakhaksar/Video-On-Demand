"use client";
import React, { useEffect, useMemo } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import defaultOptions from "@/configs/reactQuery";
import { PaletteMode } from "@mui/material";
type Props = {
   children: React.ReactNode;
};
const queryClient = new QueryClient({ defaultOptions });

const Providers = ({ children }: Props) => {
   const [mode, setMode] = React.useState<PaletteMode>('dark');

   const { theme: modeTheme } = useTheme();

   useEffect(() => {
      setMode(modeTheme === "light" ? "light" : "dark")
   } , [modeTheme])

   const theme = useMemo(
      () =>
         createTheme({
            typography: {
               fontFamily: "var(--font-yekan)",
            },
            palette: {
               mode: mode,
            },
         }),
      [mode]
   );

   return (
      <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={false} />
         <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
         >
            <ThemeProvider theme={theme} >{children}</ThemeProvider>
         </NextThemesProvider>
      </QueryClientProvider>
   );
};

export default Providers;
