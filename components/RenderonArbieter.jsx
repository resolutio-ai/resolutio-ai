import { useCallback, useMemo } from "react";
import { useWeb3Context } from "../context/Web3Context";

const RenderonArbieter = () => {
  const { web3Provider, address } = useWeb3Context();

  const checkArtbeiter = useCallback(() => {
    if (address) return false;
    // logic to check for arbeiter
    return true;
  }, [address]);

  const isArbieter = useMemo(() => {
    return web3Provider && checkArtbeiter();
  }, [web3Provider, checkArtbeiter]);

  return isArbieter ? children : null;
};

export default RenderonArbieter;
