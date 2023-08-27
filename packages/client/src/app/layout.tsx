"use client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./globals.css";
import { Inter } from "next/font/google";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

const DEVELOPMENT_ENV = process.env.ENVIRONMENT !== "production";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <html lang="en">
      <title>Jest-everywhere</title>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={1500}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <QueryClientProvider client={queryClient}>
              {children}
              {DEVELOPMENT_ENV && <ReactQueryDevtools initialIsOpen={false} />}
            </QueryClientProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
