import { LIGHTHOUSE_API_KEY } from '@/app/settings';
import lighthouse from '@lighthouse-web3/sdk';
import { useMutation } from '@tanstack/react-query';

const useUploadToLighthouse = () => {
  return useMutation({
    mutationFn: (requestParam: {
      files: File[];
      progressCallback: Parameters<typeof lighthouse.upload>[4];
    }) => {
      const { files, progressCallback } = requestParam;
      return lighthouse.upload(
        files,
        LIGHTHOUSE_API_KEY,
        true,
        undefined,
        progressCallback
      );
    },
    onSuccess: (data) => {
      console.log('Upload success', data);
    },
  });
};

export default useUploadToLighthouse;
