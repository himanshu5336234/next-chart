import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme,lightTheme } from "@/assets/Theme/index";
import { useRouter } from "next/router";
import { Paper } from "@mui/material";
export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  const { theme } = router.query;
  const themeMode = theme === 'dark'? darkTheme : lightTheme;
  return (
    <>
      <AppCacheProvider {...props}>
        <ThemeProvider theme={themeMode}>

          <Component {...pageProps} />
   
        </ThemeProvider>
      </AppCacheProvider>
    </>
  );
}
