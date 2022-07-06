// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

/// @title Randomness Generator
/// @author Ogubuike Alexandra
/// @notice Generates off-chain random numbers and saves them in s_randomWords
contract Randomizer is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;
    LinkTokenInterface LINKTOKEN;

    uint64 s_subscriptionId;

    address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;

    address link = 0x01BE23585060835E02B77ef475b0Cc51aA1e0709;

    bytes32 keyHash =
        0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;

    uint32 callbackGasLimit = 100000;

    uint16 requestConfirmations = 3;

    uint32 numWords = 4; //Using four because its possible the randomization will bring the same number twice

    uint256[] public s_randomWords;
    uint256 public s_requestId;
    address s_owner;

    constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        LINKTOKEN = LinkTokenInterface(link);
        s_owner = msg.sender;
        s_subscriptionId = subscriptionId;
    }

    /// @dev Requests Randomness
    function requestRandomWords() external onlyOwner {
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }

    /// @dev Sets our state arrary to hold the random values requested
    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        s_randomWords = randomWords;
    }

    modifier onlyOwner() {
        require(msg.sender == s_owner);
        _;
    }
}