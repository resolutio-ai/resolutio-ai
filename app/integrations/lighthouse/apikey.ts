import { ethers } from 'ethers';

const signAuthMessage = async (
  privateKey: string,
  messageRequested: string
) => {
  const signer = new ethers.Wallet(privateKey);

  return await signer.signMessage(messageRequested);
};

/* export const getApiKey = async () => {
    if (!PUBLIC_KEY || !PRIVATE_KEY) {
        throw new Error(!PUBLIC_KEY ? 'Public Key is missing' : 'Private Key is Missing');
    }

    const verificationMessage = (
        await axios.get(
            `${GET_APIKEY_ENDPOINT}${PUBLIC_KEY}`
        )
    ).data;

    const signedMessage = await signAuthMessage(PRIVATE_KEY, verificationMessage);

    return await lighthouse.getApiKey(PUBLIC_KEY, signedMessage);
} */
