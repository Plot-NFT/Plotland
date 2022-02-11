import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import Plot from "contracts/Plot.json";

const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_KEY);

const checkTransferEvent = async () => {
  try {
    const contract = await new web3.eth.Contract(
      Plot.abi,
      process.env.NEXT_PUBLIC_CONTRACT
    );

    contract.once("Transfer", (error, result) => {
      if (error) {
        console.error(error);
      }

      if (result) {
        console.log("Transfer event found!");
        console.log(result);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const mintNFT = async (mintState, quadrant) => {
  const [mint, setMint] = mintState;

  setMint({
    ...mint,
    status: "loading",
  });

  if (!quadrant) {
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
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      setMint({
        ...mint,
        status: "success",
        message:
          "Transaction has been put into pending queue, please check your metamask to see transaction status",
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

export { mintNFT };
