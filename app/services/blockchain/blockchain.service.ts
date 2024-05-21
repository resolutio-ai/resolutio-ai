import { creatorArmourNFT } from '@/app/contracts';
import { CREATOR_ARMOUR_CONTRACT_ADDR } from '@/app/settings';
import { BrowserProvider, Contract } from 'ethers';
import { Magic } from 'magic-sdk';

class CreatorArmourNFT {
  creatorArmourNFTAddress: string = CREATOR_ARMOUR_CONTRACT_ADDR;
  magic: Magic | null = null;
  constructor(magic: Magic | null) {
    if (!magic) {
      throw new Error('Magic instance is required');
    }
    this.magic = magic;
  }

  createContractInstance() {
    if (!this.magic) {
      throw new Error('Magic not initialized');
    }

    const provider = new BrowserProvider(this.magic.rpcProvider);

    return new Contract(
      this.creatorArmourNFTAddress,
      creatorArmourNFT.abi,
      provider
    );
  }
}

export const mintNFT = async (uri: string, magic: Magic | null) => {
  if (!magic) {
    throw new Error('Magic not initialized');
  }

  const creatorArmourNFT = new CreatorArmourNFT(magic);
  const creatorArmourNFTContract = creatorArmourNFT.createContractInstance();

  try {
    const tx = await creatorArmourNFTContract.safeMint(uri);
    console.log('Transaction Hash:', tx.hash);

    const receipt = await tx.wait();
    console.log('Transaction confirmed in block number', receipt.blockNumber);

    return receipt;
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw new Error('Error minting NFT');
  }
};
