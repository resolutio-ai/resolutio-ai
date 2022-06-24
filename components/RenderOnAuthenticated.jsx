import { useWeb3 } from "../hooks/useWeb3";

const RenderOnAuthenticated = ({ children }) => {
  const { web3Provider } = useWeb3();
  return web3Provider ? children : null;
};

export default RenderOnAuthenticated;
