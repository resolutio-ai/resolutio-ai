import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import { ResolutioContextProvider } from "../context/ResolutioContext";
import "../styles/globals.css";
import resolutioTheme from "../styles/theme/resolutioTheme";
import createEmotionCache from "../utility/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <ResolutioContextProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={resolutioTheme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </ResolutioContextProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
