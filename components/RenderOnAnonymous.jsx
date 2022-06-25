import { useWeb3Context } from "../context/Web3Context";

const RenderOnAnonymous = ({ children }) => {
  const { web3Provider } = useWeb3Context();

  return !web3Provider ? children : null;
};

export default RenderOnAnonymous;
