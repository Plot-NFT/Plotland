import * as React from "react";

import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src="/assets/Plot_Logo_Black.svg" alt="plot logo" />
      <h4>Loading...</h4>
    </div>
  );
};

export default Loading;
