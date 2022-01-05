/* eslint-disable react/prop-types */
import * as React from "react";
import styles from "./Alert.module.scss";

const Alert = ({ children }) => {
  return (
    <div className={styles.alert}>
      <div className={styles.header}>{children}</div>
    </div>
  );
};

export default Alert;
