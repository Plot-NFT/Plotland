/* eslint-disable react/prop-types */
import * as React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaArrowDown } from "react-icons/fa";

import styles from "./Roadmap.module.scss";

const Main = ({ children }) => {
  return <Row className="text-center">{children}</Row>;
};

const Divider = ({ type = "line" }) => {
  return (
    <Col className={styles.blackLine} md={2} lg={2}>
      {type === "line" && (
        <>
          <div className={styles.vertical}></div>
          <div className={styles.horizontal}></div>
        </>
      )}

      {type === "arrow" && (
        <div className={styles.horizontal}>
          <FaArrowDown />
        </div>
      )}
    </Col>
  );
};

const Content = ({ children }) => {
  return (
    <Col className={styles.content} md={5} lg={5}>
      {children}
    </Col>
  );
};

const Date = ({ children, position = "right" }) => {
  return (
    <p
      className={`${styles.date} ${
        position === "right" ? styles.right : styles.left
      }`}
    >
      {children}
    </p>
  );
};

const Placeholder = () => {
  return <Col md={5} lg={5}></Col>;
};

const Roadmap = { Main, Divider, Content, Date, Placeholder };

export default Roadmap;
