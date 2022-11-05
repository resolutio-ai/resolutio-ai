import { ethers } from "ethers";
import {
  CHAINLINK_RANDOM_GENERATOR_CONTRACT_ADDR,
  DISPUTE_INITIATION_CONTRACT_ADDR,
} from "../config";
import {
  ARBITER_SELECTION,
  CAN_VOTE,
  COMPUTE_RESULT,
  CREATED,
  END,
} from "../constants/constants";
import DisputeSystem from "../contracts/DisputePool/DisputePool.json";
import Randomizer from "../contracts/Randomizer/Randomizer.json";

class DisputePool {
  _disputeSystemAddress = DISPUTE_INITIATION_CONTRACT_ADDR;
  _randomizerAddress = CHAINLINK_RANDOM_GENERATOR_CONTRACT_ADDR;
  stake = "0.02";
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

    const createDisputeTx = await contract.createDispute(uri, { value: price });
    const response = await createDisputeTx.wait();
    return response;
  }

  //Get all arbiters selected for a dispute
  async getAddressesForDispute(disputeId) {
    const contract = await this._createDisputeSystemContractInstance();

    const response = await contract.getAddressesForDispute(disputeId);
    return response;
  }

  //Join a dispute pool
  async joinDisputePool(disputeId) {
    const price = await this._getStake();
    const contract = await this._createDisputeSystemContractInstance();

    const txn = await contract.joinDisputePool(disputeId, { value: price });
    const response = await txn.wait();

    return response;
  }

  //Vote
  async vote(proposal, disputeId) {
    //Where proposal = 1 => validate and 2 => invalidate
    const contract = await this._createDisputeSystemContractInstance();

    const txn = await contract.vote(proposal, disputeId);
    const response = await txn.wait();

    return response;
  }

  //Get All Disputes
  async getAllDisputes() {
    const contract = await this._createDisputeSystemContractInstance();

    const response = await contract.getAllDisputes();
    return response;
  }

  //get a dispute
  async getDisputeById(disputeId) {
    const contract = await this._createDisputeSystemContractInstance();

    const response = await contract.getDispute(disputeId);
    return response;
  }

  //Get all dispute created by userAddress
  async getMyCreatedDisputes(userAddress) {
    const contract = await this._createDisputeSystemContractInstance();

    const allDisputes = await contract.getAllDisputes();

    const userDisputes = allDisputes.filter(
      (dispute) => dispute.creator === userAddress
    );

    return userDisputes;
  }

  //Get all disputes for an arbiter with userAddress
  async getMyArbiterDisputes(userAddress) {
    const contract = await this._createDisputeSystemContractInstance();
    const allDisputes = await contract.getAllDisputes();

    const arbiterDisputes = allDisputes.filter((dispute) =>
      dispute.selectedArbiters.includes(userAddress)
    );

    return arbiterDisputes;
  }

  //Get disputes that have just being newly created and Arbiter selection has not happened
  async getNewDisputes() {
    const contract = await this._createDisputeSystemContractInstance();

    const allDisputes = await contract.getAllDisputes();

    const newDisputes = allDisputes.filter(
      (dispute) => dispute.state == CREATED
    );

    return newDisputes;
  }

  //Get all disputes that are ongoing
  async getOngoingDisputes() {
    const contract = await this._createDisputeSystemContractInstance();

    const allDisputes = await contract.getAllDisputes();

    const ongoingDisputes = allDisputes.filter(
      (dispute) =>
        dispute.state == ARBITER_SELECTION ||
        dispute.state == CAN_VOTE ||
        dispute.state == COMPUTE_RESULT
    );

    return ongoingDisputes;
  }

  //Get all disputes that have been resolved
  async getResolvedDisputes() {
    const contract = await this._createDisputeSystemContractInstance();

    const allDisputes = await contract.getAllDisputes();
    const resolvedDisputes = allDisputes.filter(
      (dispute) => dispute.state == END
    );

    return resolvedDisputes;
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
