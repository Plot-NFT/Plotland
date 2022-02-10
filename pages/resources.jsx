import * as React from "react";
import Head from "next/head";
import Accordion from "react-bootstrap/Accordion";

import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Container from "components/Container/Container";

const Resources = () => {
  return (
    <>
      <Head>
        <title>Plotland</title>
        <meta name="description" content="Plotland" />
      </Head>

      <Header />

      <Container>
        <h2 className="mb-3 fw-bold">FAQ</h2>

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Is there any cost when minting the NFT?
            </Accordion.Header>
            <Accordion.Body>
              To mint your NFT, you will need to pay the gas fee, the NFT itself
              is free.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>How do I connect my Metamask?</Accordion.Header>
            <Accordion.Body>
              To connect your Metamask, simply click the {"'"}connect{"'"}{" "}
              button and allow plotland.one to access your Wallet.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>How can I contribute to this?</Accordion.Header>
            <Accordion.Body>
              Anybody can contribute to the project, as long as its open source.
              Check the dedicated Discord channels for development, resources
              and support. Through there, the code can be accessed in Github.
              You can also reach out to us through info@plotland.one any time.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              What makes this NFT different from others?
            </Accordion.Header>
            <Accordion.Body>
              Plot is designed to be an easy to use Platform for developers to
              built on and create decentralized services on a truely free,
              non-financialized space. The minimalist setup opens up unlimited
              possibilities while keeping the unit count limited through fisical
              limitaions (We can{"'"}t create any more coordinates than the
              planet has to offer...)
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <h2 className="my-3 fw-bold">Whitepaper</h2>

        <p>
          If you are interested to know more about Plotland, we recommend you to
          read our{" "}
          <a
            className="fw-bold"
            href="/documents/plotland-whitepaper.pdf"
            target="_blank"
          >
            Whitepaper
          </a>
        </p>

        <h2 className="my-3 fw-bold">Contract Address</h2>

        <p>
          Plotland contract address:{" "}
          <a
            href="https://mumbai.polygonscan.com/address/0x41c1a62497274B56e1D2925D4E7980e9a49A88C0"
            target="_blank"
            rel="noreferrer"
            className="fw-bold"
          >
            0x41c1a62497274B56e1D2925D4E7980e9a49A88C0
          </a>
        </p>

        <h2 className="my-3 fw-bold">Github Repository</h2>

        <p>
          We are an open-source project which mean, if you are interested, you
          can contribute to the project.
        </p>
        <p>
          Just check it out at{" "}
          <a
            href="https://github.com/Plot-NFT/Plotland"
            className="fw-bold"
            rel="noreferrer"
            target="_blank"
          >
            Github
          </a>
        </p>
      </Container>

      <Footer />
    </>
  );
};

export default Resources;
