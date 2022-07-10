import { useWeb3Context } from "../context/Web3Context";

const RenderOnAuthenticated = ({ children }) => {
  const { web3Provider } = useWeb3Context();
  return web3Provider ? children : null;
};

export default RenderOnAuthenticated;
