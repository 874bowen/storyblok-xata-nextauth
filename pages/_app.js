import '../styles/globals.css'
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "../components/Feature";
import Grid from "../components/Grid";
import Page from "../components/Page";
import Teaser from "../components/Teaser";
import { SessionProvider } from 'next-auth/react';

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
};

storyblokInit({
  accessToken: "6Tbjsm7a83xT3jAyzuoAwwtt",
  use: [apiPlugin],
  components
});

function MyApp({ Component, pageProps, session }) {
  return(
    <SessionProvider session={session}>
          <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp
