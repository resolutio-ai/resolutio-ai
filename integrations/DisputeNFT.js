import { ethers } from "ethers";
import {
  CHAINLINK_RANDOM_GENERATOR_CONTRACT_ADDR,
  DECISION_NFT_CONTRACT_ADDR,
} from "../config";

import DecisionNFT from "../contracts/DecisionNFT/DecisionNft.json";

class DisputeNFT {
  _decisionNFTAddress = DECISION_NFT_CONTRACT_ADDR;

  async _createDecisionNFTContractInstance() {
    const { ethereum } = window;

    //if none is found, it means that a user does not
    if (!ethereum) {
      return;
    }

    //Get wallet provider and signer
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    //contract initialization: create and return an instance of the contract
    return new ethers.Contract(this._decisionNFTAddress, DecisionNFT, signer);
  }

  //Create a dispute
  async mintToken(disputeId, amountToBeMinted, uri) {
   
    //Initialize
    const contract = await this._createDecisionNFTContractInstance();
    console.log('contract',contract);
    const mintTokenTx = await contract.mintToken(disputeId, amountToBeMinted, uri);
    const response = await mintTokenTx.wait();
    return response;
  }

  //Create a dispute
  async airDropToken(disputeId, quantityPerAddress, arrayOfAddresses) {
    //Initialize
    const contract = await this._createDecisionNFTContractInstance();

    const airDropTokenTx = await contract.airDropToken(
      disputeId,
      quantityPerAddress,
      arrayOfAddresses
    );
    const response = await airDropTokenTx.wait();
    return response;
  }
}

export default DisputeNFT;