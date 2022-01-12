import * as React from "react";
import Head from "next/head";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Container from "components/Container/Container";
import RoadmapItem from "components/Roadmap/Roadmap";

import styles from "scss/roadmap.module.scss";

const Roadmap = () => {
  return (
    <>
      <Head>
        <title>Plotland</title>
        <meta name="description" content="Plotland" />
      </Head>

      <Header />

      <Container>
        <h1 className="mb-4">Roadmap</h1>

        <Row className="text-center">
          <Col lg={5}>
            <RoadmapItem />
          </Col>
          <Col className={styles.blackLine} lg={2}>
            <div></div>
          </Col>
          <Col lg={5}>
            <p>Date here: 12-12-1092</p>
          </Col>
        </Row>

        <Row className="text-center">
          <Col className="pt-3" lg={5}>
            <p>Date here: 12-12-1092</p>
          </Col>
          <Col className={styles.blackLine} lg={2}>
            <div></div>
          </Col>
          <Col lg={5}>
            <RoadmapItem />
          </Col>
        </Row>

        <Row className="text-center">
          <Col lg={5}>
            <RoadmapItem />
          </Col>
          <Col className={styles.blackLine} lg={2}>
            <div></div>
          </Col>
          <Col className="pt-3" lg={5}>
            <p>Date here: 12-12-1092</p>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default Roadmap;
