import { useWeb3Context } from "../context/Web3Context";

const RenderOnAuthenticated = ({ children }) => {
  const { isConnected } = useWeb3Context();
  return isConnected ? children : null;
};

export default RenderOnAuthenticated;
