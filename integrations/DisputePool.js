import { ethers } from "ethers";
import {
  CHAINLINK_RANDOM_GENERATOR_CONTRACT_ADDR,
  DISPUTE_INITIATION_CONTRACT_ADDR,
} from "../config";
import DisputeSystem from "../contracts/DisputePool/DisputePool.json";
import Randomizer from "../contracts/Randomizer/Randomizer.json";

class DisputePool {
  _disputeSystemAddress = DISPUTE_INITIATION_CONTRACT_ADDR;
  _randomizerAddress = CHAINLINK_RANDOM_GENERATOR_CONTRACT_ADDR;
  stake = "0.02";
  _UnInitialized = 0;
  _IsCreated = 1;
  _ArbiterSelection = 2;
  _CanVote = 3;
  _ComputeResult = 4;
  _End = 5;
  _forward = 1;
  _backward = 2;

  async _createDisputeSystemContractInstance() {
    const { ethereum } = window;

    //if none is found, it means that a user does not
    if (!ethereum) {
      return;
    }

    //Get wallet provider and signer
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    //contract initialization: create and return an instance of the contract
    return new ethers.Contract(
      this._disputeSystemAddress,
      DisputeSystem,
      signer
    );
  }

  async _createRandomizerInstance() {
    const { ethereum } = window;

    //if none is found, it means that a user does not
    if (!ethereum) {
      return;
    }

    //Get wallet provider and signer
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    //contract initialization: create and return an instance of the contract
    return new ethers.Contract(_randomizerAddress, Randomizer.abi, signer);
  }

  _getStake = async () => ethers.utils.parseUnits(this.stake, "ether");

  //Create a dispute
  async createDispute(uri) {
    const price = this._getStake();
    //Initialize
    const contract = await this._createDisputeSystemContractInstance();

    let createDisputeTx = await contract.createDispute(uri, { value: price });
    let response = await createDisputeTx.wait();
    return response;
  }

  //Get all arbiters selected for a dispute
  async getAddressesForDispute(disputeId) {
    const contract = await this._createDisputeSystemContractInstance();

    let response = await contract.getAddressesForDispute(disputeId);
    return response;
  }

  //Join a dispute pool
  async joinDisputePool(disputeId) {
    let price = await this._getStake();
    console.log(
      "🚀 ~ file: DisputePool.js ~ line 82 ~ DisputePool ~ joinDisputePool ~ price",
      price
    );
    const contract = await this._createDisputeSystemContractInstance();
    console.log(
      "🚀 ~ file: DisputePool.js ~ line 87 ~ DisputePool ~ joinDisputePool ~ contract",
      contract
    );

    let txn = await contract.joinDisputePool(disputeId, { value: price });
    let response = await txn.wait();

    return response;
  }

  //Vote
  async vote(proposal, disputeId) {
    //Where proposal = 1 => validate and 2 => invalidate
    const contract = await this._createDisputeSystemContractInstance();

    let txn = await contract.vote(proposal, disputeId);
    let response = await txn.wait();

    return response;
  }

  //Get All Disputes
  async getAllDisputes() {
    const contract = await this._createDisputeSystemContractInstance();

    let response = await contract.getAllDisputes();
    return response;
  }

  //get a dispute
  async getDisputeById(disputeId) {
    const contract = await this._createDisputeSystemContractInstance();

    let response = await contract.getDispute(disputeId);
    return response;
  }

  //Get all dispute created by userAddress
  async getMyCreatedDisputes(userAddress) {
    const contract = await this._createDisputeSystemContractInstance();

    let allDisputes = await contract.getAllDisputes();
    let disputeArray = [];

    for (let dispute of allDisputes) {
      if (dispute.creator.toString() === userAddress.toString()) {
        disputeArray.push(dispute);
      }
    }

    return disputeArray;
  }

  //Get all disputes for an arbiter with userAddress
  async getMyArbiterDisputes(userAddress) {
    const contract = await this._createDisputeSystemContractInstance();
    let allDisputes = await contract.getAllDisputes();
    let disputeArray = [];

    for (let dispute of allDisputes) {
      if (dispute.selectedArbiters.includes(userAddress)) {
        disputeArray.push(dispute);
      }
    }
    return disputeArray;
  }

  //Get disputes that have just being newly created and Arbiter selection has not happened
  async getNewDisputes() {
    const contract = await this._createDisputeSystemContractInstance();

    let allDisputes = await contract.getAllDisputes();
    let disputeArray = [];

    for (let dispute of allDisputes) {
      if (dispute.state == this._IsCreated) {
        disputeArray.push(dispute);
      }
    }

    return disputeArray;
  }

  //Get all disputes that are ongoing
  async getOngoingDisputes(disputeId) {
    const contract = await this._createDisputeSystemContractInstance();

    let allDisputes = await contract.getAllDisputes();
    let disputeArray = [];

    for (let dispute of allDisputes) {
      if (
        dispute.state == ArbiterSelection ||
        dispute.state == CanVote ||
        dispute.state == ComputeResult
      ) {
        disputeArray.push(dispute);
      }
    }

    return disputeArray;
  }

  //Get all disputes that have been resolved
  async getResolvedDisputes(disputeId) {
    const contract = await this._createDisputeSystemContractInstance();

    let allDisputes = await contract.getAllDisputes();
    let disputeArray = [];

    for (let dispute of allDisputes) {
      if (dispute.state == End) {
        disputeArray.push(dispute);
      }
    }

    return disputeArray;
  }

  //ADMIN PRIVILEDGES

  //Assign Random Arbiters [4, 8, 2]
  async assignRandomArbiters(disputeId, randomValues) {
    const contract = await this._createDisputeSystemContractInstance();

    let txn = await contract.assignRandomArbiters(disputeId, randomValues);
    let response = await txn.wait();

    return response;
  }

  //End voting
  async endVoting(disputeId) {
    const contract = await this._createDisputeSystemContractInstance();

    let txn = await contract.endVoting(disputeId);
    let response = await txn.wait();

    return response;
  }

  //Change the state of a dispute
  //For the move argument ,Pass Either 1 or 2 to this function
  //1 means move forward and 2 move back ward
  async changeDisputeState(disputeId, move) {
    const contract = await this._createDisputeSystemContractInstance();

    let txn = await contract.changeDisputeState(disputeId, move);
    let response = await txn.wait();
    return response;
  }

  //get Random Values
  async getRandomValues() {}
}

export default DisputePool;
