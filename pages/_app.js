import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Router from "next/router";
import NextNProgress from "nextjs-progressbar";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Layout from "../components/Layout";
import LoadingBackdrop from "../components/loaders/LoadingBackdrop";
import NotistackWrapper from "../components/NotistackWrapper";
import { ResolutioBackdropContextProvider } from "../context/ResolutioBackdropContext";
import { ResolutioContextProvider } from "../context/ResolutioContext";
import { primaryMain } from "../styles/colors";
import "../styles/globals.css";
import resolutioTheme from "../styles/theme/resolutioTheme";
import createEmotionCache from "../utility/createEmotionCache";

// Huddle
import { HuddleClientProvider, getHuddleClient } from '@huddle01/huddle01-client';
import { HUDDLE_KEY } from "../config";

const clientSideEmotionCache = createEmotionCache();
NProgress.configure({ showSpinner: false });

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const huddleClient = getHuddleClient(HUDDLE_KEY)
  
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
    return () => {
      Router.events.off("routeChangeStart");
      Router.events.off("routeChangeComplete");
      Router.events.off("routeChangeError");
    };
  }, []);

  return (
    <HuddleClientProvider client={huddleClient} >
      <NotistackWrapper>
        <ResolutioContextProvider>
          <ResolutioBackdropContextProvider>
            <CacheProvider value={emotionCache}>
              <ThemeProvider theme={resolutioTheme}>
                <CssBaseline />
                <LoadingBackdrop />
                <Layout>
                  <NextNProgress color={primaryMain} />
                  <Component {...pageProps} />
                </Layout>
              </ThemeProvider>
            </CacheProvider>
          </ResolutioBackdropContextProvider>
        </ResolutioContextProvider>
      </NotistackWrapper>
    </HuddleClientProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
