import lighthouse from '@lighthouse-web3/sdk';


export const uploadTextEncrypted = async (message: string, signedMessage: any, publicKey: string) => {
   
    if (!process.env.NEXT_PUBLIC_LIGHT_API_KEY) {
        throw new Error("Invalid API Key");
    }

    const result = await lighthouse.textUploadEncrypted(message, process.env.NEXT_PUBLIC_LIGHT_API_KEY, publicKey, signedMessage);
    
    return result;
}

export const uploadText = async (message: string) => {
    
    if (!process.env.NEXT_PUBLIC_LIGHT_API_KEY) {
        throw new Error("Invalid API Key");
    }

    return await lighthouse.uploadText(message, process.env.NEXT_PUBLIC_LIGHT_API_KEY);    
}

export const uploadFile = async (file: any) => {
    
    if (!process.env.NEXT_PUBLIC_LIGHT_API_KEY) {
        throw new Error("Invalid API Key");
    }    

    return await lighthouse.upload(file, process.env.NEXT_PUBLIC_LIGHT_API_KEY, true);
}