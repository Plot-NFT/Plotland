import * as React from "react";
import Head from "next/head";

import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Container from "components/Container/Container";
import RoadMap from "components/Roadmap/Roadmap";
import Button from "components/Button/Button";

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

        <RoadMap.Main>
          <RoadMap.Content>
            <h3>Membeli Bakso</h3>
            <p>Memebeli bakso setiap hari hore!</p>
          </RoadMap.Content>

          <RoadMap.Divider />

          <RoadMap.Date>
            <p>Date here: 12-12-1092</p>
          </RoadMap.Date>
        </RoadMap.Main>

        <RoadMap.Main>
          <RoadMap.Date>
            <p>Date here: 12-12-1092</p>
          </RoadMap.Date>

          <RoadMap.Divider />

          <RoadMap.Content>
            <h3>Membeli Bakso</h3>
            <p>Memebeli bakso setiap hari hore!</p>
          </RoadMap.Content>
        </RoadMap.Main>

        <RoadMap.Main>
          <RoadMap.Content>
            <h3>Membeli Bakso</h3>
            <p>Memebeli bakso setiap hari hore!</p>
          </RoadMap.Content>

          <RoadMap.Divider />

          <RoadMap.Date>
            <p>Date here: 12-12-1092</p>
          </RoadMap.Date>
        </RoadMap.Main>

        <div className="d-flex justify-content-center">
          <Button>Submit Project</Button>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Roadmap;
