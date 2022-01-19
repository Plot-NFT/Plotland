/* eslint-disable react/prop-types */
import * as React from "react";
import styles from "./Alert.module.scss";

const Alert = ({ children, variant = "", className = "" }) => {
  return (
    <div
      className={`${className} ${styles.alert} ${
        variant === "success" ? styles.success : ""
      }`}
    >
      <div className={styles.header}>{children}</div>
    </div>
  );
};

export default Alert;
