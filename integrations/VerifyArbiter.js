import { ethers } from "ethers";
import { ARBITER_WHITELISTER_CONTRACT_ADDR } from "../config";
import arbiter from "../contracts/ArbiterNFT/ArbiterNFT.json";

const _createArbiterVerificationContractInstance = async () => {
  const { ethereum } = window;

  //if none is found, it means that a user does not
  if (!ethereum) {
    return;
  }

  //Get wallet provider and signer
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  //contract initialization: create an instance of the contract
  return new ethers.Contract(
    ARBITER_WHITELISTER_CONTRACT_ADDR,
    arbiter.abi,
    signer
  );
}

const verifyArbiter = async (account_addr) => {
  const contract = await _createArbiterVerificationContractInstance();
  return contract.verifyUser(account_addr);
};

const transferOwnership = async (newOwnersAddress)  => {
  const contract = await _createArbiterVerificationContractInstance();
  return await contract.transferOwnership(newOwnersAddress);
}

const getContractOwner = async () => {
  const contract = await _createArbiterVerificationContractInstance();
  return await contract.owner();
}

const addAUserToWhiteList = async (userAddress) => {
  const contract = await _createArbiterVerificationContractInstance();
  return await contract.addUser(userAddress);
}

export { 
  verifyArbiter, 
  transferOwnership, 
  getContractOwner, 
  addAUserToWhiteList,
};
