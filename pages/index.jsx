import * as React from "react";
import Head from "next/head";
import Image from "next/image";

import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Container from "components/Container/Container";
import HeroBanner from "components/HeroBanner/HeroBanner";
import StatusBox from "components/StatusBox/StatusBox";

const Home = () => {
  React.useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>Plotland</title>
        <meta name="description" content="Plotland" />
      </Head>

      <Header />

      <Container>
        <div className="d-flex flex-column align-items-center">
          <h1 className="fw-bold main-title">Plot</h1>
          <p>A coordinated worldview</p>
        </div>

        <HeroBanner />

        <div className="py-3 vh-100 d-flex flex-column justify-content-center">
          <h2 className="fw-bold text-center mb-3">About Plotland</h2>

          <p className="text-justify text-width mx-auto">
            Plot is the new coordinate-based NFT platform for developers and
            users alike. Land is limited and so is Plot. Based on our worlds
            coordinates, Plot is the foundation for a blockchain-based future of
            sustainable, collaborative growth.
          </p>

          <p className="text-justify text-width mx-auto">
            We believe in transparency, thats why everything is open source and
            about as simple and clear as it gets. Our goal is to deliver a great
            foundation to build on and make it accessible to everybody who wants
            to collaborate.
          </p>

          <p className="text-justify text-width mx-auto">
            Plot is based on Polygon and ERC-721 Standards. The purist approach
            and community focus of the Plot team enables other teams and
            developers to easily contribute to this new metaverse.
          </p>
        </div>

        {/* <h2 className="mt-3 fw-bold">Plotland NFT Stats</h2>

        <StatusBox.Main>
          <StatusBox.Item>
            <StatusBox.Header>Total Supply</StatusBox.Header>
            <StatusBox.Text>10000000</StatusBox.Text>
          </StatusBox.Item>

          <StatusBox.Item>
            <StatusBox.Header>Total Supply</StatusBox.Header>
            <StatusBox.Text>10000000</StatusBox.Text>
          </StatusBox.Item>

          <StatusBox.Item>
            <StatusBox.Header>Total Supply</StatusBox.Header>
            <StatusBox.Text>10000000</StatusBox.Text>
          </StatusBox.Item>

          <StatusBox.Item>
            <StatusBox.Header>Total Supply</StatusBox.Header>
            <StatusBox.Text>10000000</StatusBox.Text>
          </StatusBox.Item>
        </StatusBox.Main> */}

        <div className="py-3 vh-100 d-flex flex-column justify-content-center">
          <h2 className="fw-bold text-center mb-3">Quadrant Visualization</h2>

          <Image
            width={2777}
            height={1074}
            src="/assets/visualization.png"
            alt="quadrant visualization"
          />

          <p className="mt-4 text-justify text-width mx-auto">
            Plot is released in four stages over four quadrants, with each
            having its own release date. Originating at the zero coordinate in
            the guinea gulf, the first quadrant includes major landmass in
            central and east Europe, Asia and north-west Africa. The second
            quadrant includes landmass in western Europe, North America and
            northern parts of South America. The third quadrant includes
            landmass in south-east Asia, Australia and Southern Africa. The
            fourth quadrant includes landmass in South America.
          </p>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Home;
