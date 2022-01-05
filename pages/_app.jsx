/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import "normalize.css";
import "scss/style.scss";

import { UserProvider } from "context/userContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className="grid-wrapper">
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;
