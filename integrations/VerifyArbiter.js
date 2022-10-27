import { ethers } from "ethers";
import arbiter from "../contracts/ArbiterNFT/ArbiterNFT.json";

const verifyArbiter = async (account_addr) => {
  const { ethereum } = window;

  //if none is found, it means that a user does not
  if (!ethereum) {
    return;
  }

  //Get wallet provider and signer
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  //contract initialization: create an instance of the contract
  const arbiterNFTContract = new ethers.Contract(
    "0xEE1A1940B63C95af84E6CCeC764B341f75331ED0",
    arbiter.abi,
    signer
  );

  return arbiterNFTContract.verifyUser(account_addr);
};

export { verifyArbiter };
