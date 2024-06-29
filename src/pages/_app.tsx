import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "@/assets/Theme/index";

// Create a client-side cache
const clientSideEmotionCache = createCache({ key: "css" });

interface MyAppProps extends AppProps {
  emotionCache?: any;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={darkTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
