# Integrating CreatorArmourNFT Smart Contract

ContractAddress: 0x8BA8c962bb3e9f17C6E5817f0aBBF51f8f6A1bBC

## Introduction

This document provides instructions on how to integrate the CreatorArmourNFT smart contract, written in Solidity, with JavaScript for interacting with the Ethereum blockchain. The CreatorArmourNFT contract allows users to mint non-fungible tokens (NFTs) representing creator armours.

## Installation

1. Import the Ethers library into your JavaScript file:

   ```javascript
   import { ethers } from 'ethers';
   ```

2. Connect to an Ethereum provider:

   ```javascript
   const provider = new ethers.BrowserProvider((magic as any).rpcProvider);
   ```

3. Create a signer using your wallet. For instance, using a private key:

   ```javascript
   const signer = provider.getSigner();
   ```

4. Import the ABI (Application Binary Interface) of the CreatorArmourNFT smart contract into your JavaScript file. Import the ABI from `./CreatorArmourNFT.Json`:

5. Instantiate the contract object using the contract address and ABI:

   ```javascript
   const creatorArmourNFTContract = (contract = new Contract(
     'contractAddress',
     abi,
     provider
   ));
   ```

   Please import `Contract` from `ethers`

6. Interact with the smart contract using the contract methods. For example, to mint a new NFT:

   ```javascript
   const uri = 'CID From Light House';

   async function mintNFT() {
     try {
       const tx = await creatorArmourNFTContract.safeMint(uri);
       console.log('Transaction Hash:', tx.hash);

       const receipt = await tx.wait();
       console.log(
         'Transaction confirmed in block number',
         receipt.blockNumber
       );
     } catch (error) {
       console.error('Error minting NFT:', error);
     }
   }
   ```
