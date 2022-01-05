import * as React from "react";
import { useUser } from "../../context/userContext";

import styles from "./MetamaskButton.module.scss";

// eslint-disable-next-line react/prop-types
const MetamaskButton = ({ chainState }) => {
  const [chainId, setChainId] = chainState;
  const [user, dispatch] = useUser();

  // const POLYGON_MUMBAI_PARAMS = {
  //   chainId: "0x13881",
  //   chainName: "Polygon Testnet Mumbai",
  //   nativeCurrency: {
  //     name: "Matic",
  //     symbol: "MATIC",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
  //   blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  // };

  const detectProvider = () => {
    if (!window.ethereum) {
      return undefined;
    } else {
      return window.ethereum;
    }
  };

  const connectWallet = async () => {
    const ethereum = detectProvider();

    if (ethereum) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        dispatch({
          type: "connect",
          payload: {
            wallet: accounts[0],
          },
        });
      } catch (error) {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      }
    }
  };

  // const addBlockchainNetwork = async () => {
  //   if (chainId !== "80001") {
  //     await window.ethereum.request({
  //       method: "wallet_addEthereumChain",
  //       params: [POLYGON_MUMBAI_PARAMS],
  //     });
  //   }
  // };

  React.useEffect(() => {
    const ethereum = detectProvider();

    if (ethereum) {
      if (!chainId) {
        window.ethereum.on("chainChanged", (networkId) => {
          setChainId(networkId);
        });
      }

      if (user.wallet && !chainId) {
        setChainId(window.ethereum.networkVersion);
      }
    }
  }, [chainId, setChainId, user]);

  return (
    <div className={`${styles.wrapper} ${!user.wallet ? styles.notLogin : ""}`}>
      {!user.wallet && (
        <button className={styles.button} onClick={() => connectWallet()}>
          Connect Metamask
        </button>
      )}

      {/* {user.wallet && (
        <button className={styles.button} onClick={addBlockchainNetwork}>
          Switch to Polygon Testnet Mumbai Network
        </button>
      )} */}

      {user.wallet && (
        <div>
          <div>
            <p>
              Hi <strong className={styles.wallet}>{user.wallet}!</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetamaskButton;
