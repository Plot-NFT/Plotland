import * as React from "react";
import Head from "next/head";

import Alert from "components/Alert/Alert";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Container from "components/Container/Container";
import RoadMap from "components/Roadmap/Roadmap";
import SubmitProject from "components/SubmitProject/SubmitProject";

const Roadmap = () => {
  const [submit, setSubmit] = React.useState({
    status: "idle",
    message: "",
    error: "",
  });

  React.useEffect(() => {
    if (submit.status === "success" || submit.status === "failed") {
      setTimeout(() => {
        setSubmit({ ...submit, status: "idle", message: "" });
      }, 2000);
    }
  }, [submit, submit.status]);

  return (
    <>
      <Head>
        <title>Plotland</title>
        <meta name="description" content="Plotland" />
      </Head>

      <Header />

      <Container>
        <RoadMap.Main>
          <RoadMap.Content className="pe-0 pe-md-5">
            <h3>Initiation of the Project</h3>
            <p>
              The Plotland Team comes together and develops the first draft of
              the concept plan and white paper.
            </p>
            <RoadMap.Date position="right">03.09.2021</RoadMap.Date>
          </RoadMap.Content>

          <RoadMap.Divider />

          <RoadMap.Placeholder />
        </RoadMap.Main>

        <RoadMap.Main>
          <RoadMap.Placeholder />

          <RoadMap.Divider />

          <RoadMap.Content className="ps-0 ps-md-5">
            <h3>The Whitepaper is released</h3>
            <p>
              The final version of the whitepaper is released for public
              outreach.
            </p>

            <RoadMap.Date position="left">16.09.2021</RoadMap.Date>
          </RoadMap.Content>
        </RoadMap.Main>

        <RoadMap.Main>
          <RoadMap.Content className="pe-0 pe-md-5">
            <h3>Start of Development</h3>
            <p>The Development of the base smart contract starts.</p>

            <RoadMap.Date position="right">05.10.2021</RoadMap.Date>
          </RoadMap.Content>

          <RoadMap.Divider />

          <RoadMap.Placeholder />
        </RoadMap.Main>

        <RoadMap.Main>
          <RoadMap.Placeholder />

          <RoadMap.Divider />

          <RoadMap.Content className="ps-0 ps-md-5">
            <h3>Brand Identity</h3>
            <p>
              The brand identity of Plot is finalised and integrated into the
              development.
            </p>

            <RoadMap.Date position="left">09.11.2021</RoadMap.Date>
          </RoadMap.Content>
        </RoadMap.Main>

        <RoadMap.Main>
          <RoadMap.Content className="pe-0 pe-md-5">
            <h3>Pre-Release Website</h3>
            <p>
              The Pre-Release Website is Deployed under the domain plotland.one.
            </p>

            <RoadMap.Date position="right">13.12.2021</RoadMap.Date>
          </RoadMap.Content>

          <RoadMap.Divider />

          <RoadMap.Placeholder />
        </RoadMap.Main>

        <RoadMap.Main>
          <RoadMap.Placeholder />

          <RoadMap.Divider />

          <RoadMap.Content className="ps-0 ps-md-5">
            <h3>Smart Contract finished</h3>
            <p>
              After extensive testing on the test chain, the smart contract is
              finalized and ready for deployment.
            </p>

            <RoadMap.Date position="left">25.01.2021</RoadMap.Date>
          </RoadMap.Content>
        </RoadMap.Main>

        <RoadMap.Main>
          <RoadMap.Content className="pe-0 pe-md-5">
            <h3>Completed Post-Release Platform</h3>
            <p>
              The development of the post release platform is complete and ready
              for deployment.
            </p>

            <RoadMap.Date position="right">13.02.2022</RoadMap.Date>
          </RoadMap.Content>

          <RoadMap.Divider />

          <RoadMap.Placeholder />
        </RoadMap.Main>

        <RoadMap.Main>
          <RoadMap.Placeholder />

          <RoadMap.Divider />

          <RoadMap.Content className="ps-0 ps-md-5">
            <h3>Release Day</h3>
            <p>
              Today the smart contract gets deployed on the polygon chain and
              NFT’s of the first quadrant are available for minting. The new
              Platform is deployed on the domain Plotland.one.
            </p>

            <RoadMap.Date position="left">01.03.2022</RoadMap.Date>
          </RoadMap.Content>
        </RoadMap.Main>

        <RoadMap.Main>
          <RoadMap.Content className="pe-0 pe-md-5">
            <h3>Update for Platform</h3>
            <p>
              An updated version of the Platform with new features is deployed.
            </p>

            <RoadMap.Date position="right">01.04.2021</RoadMap.Date>
          </RoadMap.Content>

          <RoadMap.Divider />

          <RoadMap.Placeholder />
        </RoadMap.Main>

        <RoadMap.Main>
          <RoadMap.Placeholder />

          <RoadMap.Divider />

          <RoadMap.Content className="ps-0 ps-md-5">
            <h3>Second Quadrant Release Day</h3>
            <p>
              The NFT’s of the second quadrant are available for minting
              starting today.
            </p>

            <RoadMap.Date position="left">01.06.2021</RoadMap.Date>
          </RoadMap.Content>
        </RoadMap.Main>

        <RoadMap.Main arrow>
          <RoadMap.Content></RoadMap.Content>
          <RoadMap.Divider type="arrow" />
          <RoadMap.Placeholder />
        </RoadMap.Main>

        <div className="d-flex justify-content-center">
          <SubmitProject state={[submit, setSubmit]} />
        </div>

        {submit.status === "success" && (
          <Alert className="mt-3" variant="success">
            {submit.message}
          </Alert>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default Roadmap;
