/* eslint-disable react/prop-types */
import * as React from "react";
import BsButton from "react-bootstrap/Button";

import styles from "./Button.module.scss";

const Button = ({ className = "", type = "button", children, ...props }) => {
  return (
    <BsButton
      className={`${styles.button} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </BsButton>
  );
};

export default Button;
