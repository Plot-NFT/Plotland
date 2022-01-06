/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import "normalize.css";
import "scss/style.scss";

import Head from "next/head";
import { UserProvider } from "context/userContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="grid-wrapper">
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;
