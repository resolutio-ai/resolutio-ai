import { ethers } from "ethers";
import { ARBITER_WHITELISTER_CONTRACT_ADDR } from "../config";
import arbiterNFT from "../contracts/ArbiterNFT/ArbiterNFT.json";

class ArbiterNFT {
  _arbiterNFTAddress = ARBITER_WHITELISTER_CONTRACT_ADDR;

  async _createArbiterNFTContractInstance() {
    const { ethereum } = window;

    //if none is found, it means that a user does not
    if (!ethereum) {
      return;
    }

    //Get wallet provider and signer
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    //contract initialization: create and return an instance of the contract
    return new ethers.Contract(this._arbiterNFTAddress, arbiterNFT.abi, signer);
  }

  // Verify if the user is an arbiter
  async verifyUser(account_addr) {
    const contract = await this._createArbiterNFTContractInstance();
    return contract.verifyUser(account_addr);
  }

  // Get owner of the Contract
  async getOwner() {
    const contract = await this._createArbiterNFTContractInstance();
    return contract.owner();
  }

  // Add an user as an arbiter
  async addUser(account_addr) {
    const contract = await this._createArbiterNFTContractInstance();
    return contract.addUser(account_addr);
  }
}

export default ArbiterNFT;
