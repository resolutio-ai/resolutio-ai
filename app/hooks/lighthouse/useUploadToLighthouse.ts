import { LIGHTHOUSE_API_KEY } from '@/app/settings';
import lighthouse from '@lighthouse-web3/sdk';
import { useMutation } from '@tanstack/react-query';

const useUploadToLighthouse = () => {
  return useMutation({
    mutationFn: (requestParam: {
      files: any;
      progressCallback?: Parameters<typeof lighthouse.upload>[4];
    }) => {
      const { files, progressCallback } = requestParam;
      return lighthouse.upload(
        files,
        LIGHTHOUSE_API_KEY,
        false,
        undefined,
        progressCallback
      );
    }
  });
};

export default useUploadToLighthouse;
