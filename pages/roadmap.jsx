import * as React from "react";
import Head from "next/head";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Container from "components/Container/Container";

const Roadmap = () => {
  return (
    <>
      <Head>
        <title>Plotland</title>
        <meta name="description" content="Plotland" />
      </Head>

      <Header />

      <Container>
        <h1>This is Roadmap Page</h1>
      </Container>

      <Footer />
    </>
  );
};

export default Roadmap;
