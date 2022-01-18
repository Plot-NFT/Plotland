/* eslint-disable react/prop-types */
import * as React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaArrowDown } from "react-icons/fa";

import styles from "./Roadmap.module.scss";

const Main = ({ children }) => {
  return <Row className="text-center">{children}</Row>;
};

const Divider = () => {
  return (
    <Col className={styles.blackLine} md={2} lg={2}>
      <div>
        <FaArrowDown />
      </div>
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

const Date = ({ children }) => {
  return (
    <Col className={styles.date} md={5} lg={5}>
      {children}
    </Col>
  );
};

const Roadmap = { Main, Divider, Content, Date };

export default Roadmap;
