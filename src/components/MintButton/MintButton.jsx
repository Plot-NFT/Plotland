/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "react-bootstrap/Button";

import styles from "./MintButton.module.scss";

const MintButton = ({ className = "" }) => {
  return (
    <Button className={`${styles.button} ${className}`} type="submit">
      Mint
    </Button>
  );
};

export default MintButton;
