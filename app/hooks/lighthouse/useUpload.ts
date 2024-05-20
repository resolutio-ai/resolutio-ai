import { LIGHTHOUSE_API_KEY } from '@/app/settings';
import lighthouse from '@lighthouse-web3/sdk';
import { useMutation } from '@tanstack/react-query';

const useUpload = (
  files: File[],
  progressCallback: Parameters<typeof lighthouse.upload>[4]
) => {
  return useMutation({
    mutationFn: () =>
      lighthouse.upload(
        files,
        LIGHTHOUSE_API_KEY,
        true,
        undefined,
        progressCallback
      ),
  });
};

export default useUpload;
