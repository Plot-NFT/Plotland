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
          <h1 className="fw-bold">Plot</h1>
          <p>A coordinated worldview</p>
        </div>

        <HeroBanner />

        <h2 className="fw-bold">About Plotland</h2>

        <p>
          Plot is the new coordinate-based NFT platform for developers and users
          alike. Land is limited and so is Plot. Based on our worlds
          coordinates, Plot is the foundation for a blockchain-based future of
          sustainable, collaborate growth.
        </p>

        <p>
          We believe in transparency, thats why everything is open source and
          about as simple and clear as it gets. Our goal is to deliver a great
          foundation to build on and make it accessible to everybody who wants
          to collaborate.
        </p>

        <p>
          Plot is based on Polygon and ERC-721 Standard. The purist approach and
          comunity focus of the Plot team enables other teams and developers to
          easily contribute to this new metaverse.
        </p>

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

        <h2 className="mt-3 fw-bold">Quadrant Visualization</h2>

        <Image
          width={2777}
          height={1074}
          src="/assets/visualization.png"
          alt="quadrant visualization"
        />
      </Container>

      <Footer />
    </>
  );
};

export default Home;
