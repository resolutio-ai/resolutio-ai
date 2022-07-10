import { useWeb3Context } from "../context/Web3Context";

const RenderOnAnonymous = ({ children }) => {
  const { isConnected } = useWeb3Context();

  return !isConnected ? children : null;
};

export default RenderOnAnonymous;
