import { ethers } from "ethers";
// import { PRIVATE_KEY, PUBLIC_KEY } from "../../config/env.config";
import lighthouse from '@lighthouse-web3/sdk';

export const signAuthMessage = async () => {
    const provider = new ethers.JsonRpcProvider();
    const signer = new ethers.Wallet("PRIVATE_KEY", provider);
    const messageRequested = (await lighthouse.getAuthMessage("PUBLIC_KEY")).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return signedMessage;
}