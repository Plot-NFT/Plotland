import * as React from "react";
import Head from "next/head";
import axios from "axios";
import { ethers } from "ethers";

import { useUser } from "context/userContext";
import { mintNFT } from "utils/interact.js";
import Plot from "contracts/Plot.json";

import { FaUserSecret } from "react-icons/fa";
import Header from "components/Header/Header";
import Alert from "components/Alert/Alert";
import Footer from "components/Footer/Footer";
import MetamaskButton from "components/MetamaskButton/MetamaskButton";
import Container from "components/Container/Container";
import Loading from "components/Loading/Loading";
import CoordinateUnit from "components/CoordinateUnit/CoordinateUnit";
import MintButton from "components/MintButton/MintButton";
import Form from "react-bootstrap/Form";
import Carousel from "react-bootstrap/Carousel";

const Profile = () => {
  const [chainId, setChainId] = React.useState(null);
  const [walletError, setWalletError] = React.useState(false);
  const [quadrant, setQuadrant] = React.useState("1");
  const [mint, setMint] = React.useState({
    status: "idle",
    error: "",
    message: "",
    data: null,
  });
  const [collection, setCollection] = React.useState({
    status: "idle",
    error: "",
    message: "",
    data: [],
    sorted: [],
  });
  const [user, dispatch] = useUser();

  const detectProvider = () => {
    if (!window.ethereum) {
      return undefined;
    } else {
      return window.ethereum;
    }
  };

  const getTokenIdsByOwner = async (wallet) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT,
        Plot.abi,
        provider
      );

      const tokenIds = await contract.getLandsByOwner(wallet);

      return tokenIds;
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      const ethereum = detectProvider();

      if (ethereum) {
        if (user.status === "idle") {
          ethereum.on("accountsChanged", async (accounts) => {
            dispatch({ type: "loading" });

            if (accounts.length) {
              dispatch({
                type: "success",
                payload: {
                  wallet: accounts[0],
                },
              });
            } else {
              dispatch({
                type: "logout",
              });
            }
          });
        }

        const updateUserState = async () => {
          if (ethereum.selectedAddress && user.status === "idle") {
            dispatch({
              type: "success",
              payload: {
                wallet: ethereum.selectedAddress,
              },
            });
          } else if (user.status === "idle") {
            dispatch({
              type: "ready",
            });
          }
        };

        updateUserState();
      } else {
        setTimeout(() => {
          setWalletError(true);
          dispatch({
            type: "ready",
          });
        }, 2000);
      }
    }, 400);

    async function checkUserCollection(wallet, update = false) {
      if (!update) setCollection({ ...collection, status: "loading" });

      const tokenIdsInHex = await getTokenIdsByOwner(wallet);

      const tokenIds = tokenIdsInHex.map((bigNum) => Number(bigNum));

      console.log(tokenIds, "token ids");

      if (tokenIds.length) {
        try {
          const { data } = await axios.get(
            `/api/nft?tokenIds=${JSON.stringify(tokenIds)}`
          );

          console.log(data, "fetch response NFT");

          let sorted = [];

          data.data.forEach((item, index) => {
            const count = Math.ceil((index + 1) / 3) - 1;

            if (sorted[count]) {
              sorted[count].push(item);
            } else {
              sorted[count] = [item];
            }
          });

          setCollection({
            ...collection,
            data: data.data,
            status: "success",
            message: data.message,
            sorted,
          });
        } catch (error) {
          const err =
            error.response && error.response.data.error
              ? error.response.data.error
              : error.message;

          setCollection({
            ...collection,
            status: "failed",
            error: err,
          });
        }
      } else {
        setCollection({
          ...collection,
          status: "success",
          message: "User does not have any Plot NFT",
        });
      }
    }

    if (user.wallet && collection.status === "idle") {
      checkUserCollection(user.wallet);

      setInterval(() => checkUserCollection(user.wallet, true), 20 * 1000);
    }

    if (mint.status === "success" || mint.status === "failed") {
      setTimeout(() => {
        setMint({ status: "idle", error: "", message: "", data: null });
        setQuadrant("1");
      }, 7000);
    }
  }, [collection, dispatch, mint, user]);

  return (
    <>
      <Head>
        <title>Plotland</title>
        <meta name="description" content="Plotland" />
      </Head>

      <Header />

      <Container>
        {user.status === "loading" || user.status === "idle" ? (
          <Loading />
        ) : (
          <>
            {walletError ? (
              <Alert>
                Please install metamask to use Web3 Service,{" "}
                <a href="https://metamask.io/">https://metamask.io/</a>
              </Alert>
            ) : (
              <main className="d-flex flex-column align-items-center">
                <FaUserSecret size="3rem" />
                <MetamaskButton chainState={[chainId, setChainId]} />

                {user.wallet && (
                  <>
                    <div className="mt-3">
                      <Form.Group>
                        <Form.Label>Quadrant</Form.Label>

                        <Form.Select
                          value={quadrant}
                          className="bg-transparent border-black"
                          onChange={(e) => setQuadrant(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2" className="text-muted" disabled>
                            2
                          </option>
                          <option value="3" className="text-muted" disabled>
                            3
                          </option>
                          <option value="4" className="text-muted" disabled>
                            4
                          </option>
                        </Form.Select>
                      </Form.Group>

                      <MintButton
                        className="mt-3"
                        onClick={async () =>
                          await mintNFT([mint, setMint], quadrant)
                        }
                        disabled={mint.status === "loading" || !quadrant}
                      >
                        {mint.status === "loading" ? "Minting..." : "Mint"}
                      </MintButton>
                    </div>

                    {mint.status === "success" && (
                      <Alert className="mt-3" variant="success">
                        {mint.message}
                      </Alert>
                    )}

                    {mint.status === "failed" && (
                      <Alert className="mt-3">{mint.error}</Alert>
                    )}

                    <h2 className="fw-bold mb-3 mt-5">
                      {collection.data.length > 0
                        ? `Collection (${collection.data.length})`
                        : "Collection"}
                    </h2>

                    {collection.data.length > 0 && (
                      <>
                        <Carousel
                          className="d-none d-md-block"
                          fade={true}
                          slide={false}
                        >
                          {collection.sorted.map((metadatas, idx) => (
                            <Carousel.Item
                              key={idx}
                              className="d-flex flex-wrap justify-content-center"
                            >
                              {metadatas.map((metadata) => (
                                <CoordinateUnit
                                  key={metadata.tokenId}
                                  metadata={metadata}
                                />
                              ))}
                            </Carousel.Item>
                          ))}
                        </Carousel>

                        <Carousel
                          className="d-block d-md-none"
                          fade={true}
                          slide={false}
                        >
                          {collection.data.map((metadata) => (
                            <Carousel.Item
                              key={metadata.tokenId}
                              className="d-flex flex-wrap justify-content-center"
                            >
                              <CoordinateUnit metadata={metadata} />
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      </>
                    )}

                    {collection.data.length === 0 &&
                      collection.status === "success" && (
                        <div>You do not have any NFT</div>
                      )}

                    {collection.status === "loading" && <div>Loading...</div>}
                  </>
                )}
              </main>
            )}
          </>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default Profile;
