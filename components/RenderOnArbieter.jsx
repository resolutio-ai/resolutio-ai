import { useCallback, useMemo } from "react";
import { useWeb3Context } from "../context/Web3Context";
import { isArbiter } from "../integrations/ArbiterNFT";

const RenderOnArbieter = () => {
  const { web3Provider, address } = useWeb3Context();

  const checkArtbeiter = useCallback(async () => {
    if (address) return false;
    // logic to check for arbeiter
    return isArbiter(address);
  }, [address]);

  const isArbieter = useMemo(() => {
    return web3Provider && checkArtbeiter();
  }, [web3Provider, checkArtbeiter]);

  return isArbieter ? children : null;
};

export default RenderOnArbieter;
