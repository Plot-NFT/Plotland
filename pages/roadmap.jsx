import * as React from "react";
import Head from "next/head";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Container from "components/Container/Container";

const roadmap = () => {
  return (
    <>
      <Head>
        <title>Plotland</title>
        <meta name="description" content="Plotland" />
      </Head>

      <Header />

      <Container>
        <h1>This is roadmap Page</h1>
      </Container>

      <Footer />
    </>
  );
};

export default roadmap;
