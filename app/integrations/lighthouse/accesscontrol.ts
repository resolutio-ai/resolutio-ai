import lighthouse from '@lighthouse-web3/sdk';
import { signAuthMessage } from './signAuthMessage';
// import { PUBLIC_KEY } from '../../config/env.config';
import { Address } from 'viem';
import { TWO } from '@/utils/constants';

export const applyAccessControl = async (cid: string, userAddress: Address) => {
    try {
        //NB: Our current verfication contract is deployed on FVM main-net which is currently of part of the access control allowed chain         
        const conditions = [
            {
                id: TWO,
                chain: "Calibration",
                method: "verifyUser",
                standardContractType: "Custom",
                // contractAddress: WEB3_ENVIRONMENT === "Testnet" ? TESTNET_WHITELIST_CONTRACT_ADDRESS : MAINNET_WHITELIST_CONTRACT_ADDRESS,
                returnValueTest: {
                    comparator: "==",
                    value: true
                },
                parameters: [userAddress],
            },
        ];

        // Aggregator is what kind of operation to apply to access conditions
        // Suppose there are two conditions then you can apply ([1] and [2]), ([1] or [2]), !([1] and [2]).
        const aggregator = "([1])";

        const signedMessage = await signAuthMessage();

        const response = await lighthouse.applyAccessCondition(
            "PUBLIC_KEY",
            cid,
            signedMessage,
            conditions,
            aggregator
        );

        return response;
    } catch (error: any) {
        throw error;
    }
}