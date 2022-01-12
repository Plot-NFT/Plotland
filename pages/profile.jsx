import * as React from "react";
import Head from "next/head";
import axios from "axios";
import { useUser } from "context/userContext";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaUserSecret } from "react-icons/fa";

import Header from "components/Header/Header";
import Alert from "components/Alert/Alert";
import Footer from "components/Footer/Footer";
import MetamaskButton from "components/MetamaskButton/MetamaskButton";
import Container from "components/Container/Container";
import Loading from "components/Loading/Loading";
import CoordinateUnit from "components/CoordinateUnit/CoordinateUnit";
import MintButton from "components/MintButton/MintButton";

const Profile = () => {
  const [chainId, setChainId] = React.useState(null);
  const [walletError, setWalletError] = React.useState(false);
  const [user, dispatch] = useUser();

  const detectProvider = () => {
    if (!window.ethereum) {
      return undefined;
    } else {
      return window.ethereum;
    }
  };

  const getChainName = async (chainId) => {
    try {
      const { data } = await axios.get(
        "https://chainid.network/chains_mini.json"
      );

      const network = data.find((val) => val.chainId === chainId);

      return network.name;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const registerWallet = React.useCallback(
    async (wallet) => {
      try {
        const chainId = Number(ethereum.networkVersion);
        const chainName = await getChainName(chainId);

        const whitelistPayload = {
          wallet,
          network: {
            chainId,
            chainName: chainName || "",
          },
        };

        const { data } = await axios.post("/api/whitelist", whitelistPayload);

        console.log("success adding wallet address to whitelist");

        dispatch({
          type: "success",
          payload: {
            wallet: data.data.wallet,
            mailingStatus: data.data.mailingStatus,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  const checkUser = async (account) => {
    try {
      const { data } = await axios.get(`/api/whitelist?wallet=${account}`);

      return data.data[0];
    } catch (error) {
      console.error(error);
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
                const isRegistered = await checkUser(accounts[0]);

                if (!isRegistered) {
                  await registerWallet(accounts[0]);
                } else {
                  dispatch({
                    type: "success",
                    payload: {
                      wallet: isRegistered.wallet,
                      mailingStatus: isRegistered.mailingStatus,
                    },
                  });
                }
              } else {
                dispatch({
                  type: "logout",
                });
              }
            });
          }

          const updateUserState = async () => {
            if (ethereum.selectedAddress && user.status === "idle") {
              dispatch({ type: "loading" });

              const isRegistered = await checkUser(ethereum.selectedAddress);

              if (isRegistered) {
                dispatch({
                  type: "success",
                  payload: {
                    wallet: isRegistered.wallet,
                    mailingStatus: isRegistered.mailingStatus,
                  },
                });
              } else {
                await registerWallet(ethereum.selectedAddress);
              }
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
              const isRegistered = await checkUser(accounts[0]);

              if (!isRegistered) {
                await registerWallet(accounts[0]);
              } else {
                dispatch({
                  type: "success",
                  payload: {
                    wallet: isRegistered.wallet,
                    mailingStatus: isRegistered.mailingStatus,
                  },
                });
              }
            } else {
              dispatch({
                type: "logout",
              });
            }
          });
        }

        const updateUserState = async () => {
          if (ethereum.selectedAddress && user.status === "idle") {
            dispatch({ type: "loading" });

            const isRegistered = await checkUser(ethereum.selectedAddress);

            if (isRegistered) {
              dispatch({
                type: "success",
                payload: {
                  wallet: isRegistered.wallet,
                  mailingStatus: isRegistered.mailingStatus,
                },
              });
            } else {
              await registerWallet(ethereum.selectedAddress);
            }
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
  }, [chainId, dispatch, registerWallet, user]);

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
                    <MintButton className="mt-3" />

                    <h2 className="fw-bold my-3">Collection</h2>

                    <Row>
                      <Col>
                        <CoordinateUnit>24, 12</CoordinateUnit>
                      </Col>

                      <Col>
                        <CoordinateUnit>-100, -12</CoordinateUnit>
                      </Col>

                      <Col>
                        <CoordinateUnit>99, 0</CoordinateUnit>
                      </Col>

                      <Col>
                        <CoordinateUnit>180, 66</CoordinateUnit>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col>
                        <CoordinateUnit>24, 12</CoordinateUnit>
                      </Col>

                      <Col>
                        <CoordinateUnit>-100, -12</CoordinateUnit>
                      </Col>

                      <Col>
                        <CoordinateUnit>99, 0</CoordinateUnit>
                      </Col>

                      <Col>
                        <CoordinateUnit>180, 66</CoordinateUnit>
                      </Col>
                    </Row>
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
