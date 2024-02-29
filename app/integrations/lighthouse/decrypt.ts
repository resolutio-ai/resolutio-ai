import * as dotenv from 'dotenv';
dotenv.config();
import lighthouse from '@lighthouse-web3/sdk';
//import { PRIVATE_KEY, PUBLIC_KEY } from '../../config/env.config';
import { signAuthMessage } from './signAuthMessage';

export const decrypt = async (cid: string) => {

    // Get file encryption key
    const signedMessage = await signAuthMessage();
    const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
        cid,
        "PUBLIC_KEY",
        signedMessage
    );

    if (!fileEncryptionKey?.data?.key) {
        throw new Error("Invalid encryption key");
    }

    // Decrypt File
    return await lighthouse.decryptFile(
        cid,
        fileEncryptionKey.data.key
    );
}