/* eslint-disable react/prop-types */
import * as React from "react";

import styles from "./StatusBox.module.scss";

const Main = ({ children }) => {
  return <div className={styles.main}>{children}</div>;
};

const Item = ({ children, className = "" }) => {
  return <div className={`${styles.item} ${className}`}>{children}</div>;
};

const Header = ({ children, className = "" }) => {
  return <h4 className={`${styles.header} ${className}`}>{children}</h4>;
};

const Text = ({ children, className = "" }) => {
  return <p className={`${styles.text} ${className}`}>{children}</p>;
};

const StatusBox = { Main, Item, Header, Text };

export default StatusBox;
