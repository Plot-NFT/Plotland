import * as React from "react";
import Head from "next/head";
import axios from "axios";
import { useUser } from "context/userContext";

import Header from "components/Header/Header";
import Alert from "components/Alert/Alert";
import Footer from "components/Footer/Footer";
import MetamaskButton from "components/MetamaskButton/MetamaskButton";
import Form from "components/Form/Form";
import Container from "components/Container/Container";

const Index = () => {
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Header />

      <Container>
        {user.status === "loading" || user.status === "idle" ? (
          <div className="loading">
            <img src="/assets/Plot_Logo_Black.svg" alt="plot logo" />
            <h4>Loading...</h4>
          </div>
        ) : (
          <>
            {walletError ? (
              <Alert>
                Please install metamask to use Web3 Service,{" "}
                <a href="https://metamask.io/">https://metamask.io/</a>
              </Alert>
            ) : (
              <>
                <MetamaskButton chainState={[chainId, setChainId]} />

                {user.wallet && <Form />}
              </>
            )}
          </>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default Index;
