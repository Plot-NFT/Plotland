import * as React from "react";
import Head from "next/head";
import axios from "axios";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import { useUser } from "context/userContext";

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

const Profile = () => {
  const [chainId, setChainId] = React.useState(null);
  const [walletError, setWalletError] = React.useState(false);
  const [quadrant, setQuadrant] = React.useState(null);
  const [mint, setMint] = React.useState({
    status: "idle",
    error: "",
    message: "",
    data: null,
  });
  const [user, dispatch] = useUser();

  const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_KEY);

  const detectProvider = () => {
    if (!window.ethereum) {
      return undefined;
    } else {
      return window.ethereum;
    }
  };

  const getTokenIdsByOwner = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        plotContractAddress,
        Plot.abi,
        provider
      );
      const tokenIds = await contract.getLandsByOwner();

      return { contract, tokenIds };
    } catch (error) {
      console.log(error);
    }
  };

  const getTokenURIs = async () => {
    try {
      let tokenURIs = [];
      const { contract, tokenIds } = await getTokenIdsByOwner();

      for (let i = 0; i < tokenIds.length; i++) {
        const tokenId = Number(tokenArray[i]) + 1;
        const tokenURI = await contract.tokenURI(tokenId);

        tokenURIs.push(tokenURI);
      }

      return tokenURIs;
    } catch (error) {
      console.log(error);
    }
  };

  const displayUserNFTs = async () => {
    try {
      let nftMetadata = [];
      const tokenURIs = await getTokenURIs();

      for (let i = 0; i < tokenURIs.length; i++) {
        const resp = await fetch(tokenURIs[i]);
        const metadata = await resp.json();

        nftMetadata.push(metadata);
      }
    } catch (error) {
      console.log(error);
      setNftStatus("failed");
    }
  };

  const mintNFT = async (quadrant) => {
    setMint({
      ...mint,
      status: "loading",
    });

    if (quadrant) {
      setMint({
        ...mint,
        status: "failed",
        error: "Please select a quadrant before minting!",
      });
    } else {
      const contract = await new web3.eth.Contract(
        Plot.abi,
        process.env.NEXT_PUBLIC_CONTRACT
      );

      //set up your Ethereum transaction
      const transactionParameters = {
        to: process.env.NEXT_PUBLIC_CONTRACT, // Required except during contract publications.
        value: "0",
        from: window.ethereum.selectedAddress, // must match user's active address.
        data: contract.methods.buyLand(quadrant).encodeABI(), //make call to NFT smart contract
      };

      //sign the transaction via Metamask
      try {
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });

        console.log(txHash);

        setMint({
          ...mint,
          status: "success",
          message: "Success minting NFT!",
        });
      } catch (error) {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        console.error(error);

        setMint({
          ...mint,
          status: "failed",
          error: err,
        });
      }
    }
  };

  React.useEffect(() => {
    if (user.status === "idle") {
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
      }, 200);
    } else {
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
    }

    if (mint.status === "success" || mint.status === "failed") {
      setTimeout(() => {
        setMint({
          status: "idle",
          error: "",
          message: "",
          data: null,
        });
      }, 2500);
    }
  }, [dispatch, mint.status, user.status]);

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
                        onClick={() => mintNFT(quadrant)}
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

                    <h2 className="fw-bold my-3">Collection</h2>

                    <div className="d-flex gap-2 flex-wrap justify-content-around">
                      <CoordinateUnit>25, -5</CoordinateUnit>
                      <CoordinateUnit>25, -5</CoordinateUnit>
                      <CoordinateUnit>25, -5</CoordinateUnit>
                      <CoordinateUnit>25, -5</CoordinateUnit>
                      <CoordinateUnit>25, -5</CoordinateUnit>
                      <CoordinateUnit>25, -5</CoordinateUnit>
                      <CoordinateUnit>25, -5</CoordinateUnit>
                      <CoordinateUnit>25, -5</CoordinateUnit>
                    </div>
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
