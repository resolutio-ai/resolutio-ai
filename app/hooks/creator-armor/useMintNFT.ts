import { useMutation } from '@tanstack/react-query';

const useMintNFT = () => {
  return useMutation({
    //mutationFn: (uri) => mintNFT(uri),
  });
};

export default useMintNFT;
