import { useMagicContext } from '@/app/contexts';
import { mintNFT } from '@/app/services';
import { useMutation } from '@tanstack/react-query';

const useMintNFT = () => {
  const { magic } = useMagicContext();

  return useMutation({
    mutationFn: (uri: string) => mintNFT(uri, magic),
  });
};

export default useMintNFT;
