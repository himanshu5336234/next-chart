import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "@/assets/Theme";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { wrapper } from "@/services/redux/store/configureStore";

// Create an Emotion cache for MUI
const clientSideEmotionCache = createCache({ key: "css" });

function App(props: AppProps) {
  const { Component, pageProps } = props;
  const { store } = wrapper.useWrappedStore(pageProps);
  const router = useRouter();

  const { theme } = router.query;
  const themeMode = theme === "dark" ? darkTheme : lightTheme;

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Provider store={store}>
        <ThemeProvider theme={themeMode}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(App);
