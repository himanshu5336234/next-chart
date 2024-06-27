import "../styles/globals.css"
import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "@/assets/Theme/index";
export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <AppCacheProvider {...props}>
      <ThemeProvider theme={darkTheme}>
        <Component {...pageProps} />
        </ThemeProvider>
      </AppCacheProvider>
    </>
  );
}
