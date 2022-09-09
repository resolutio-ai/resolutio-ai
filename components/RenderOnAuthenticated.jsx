import { useResolutioContext } from "../context/ResolutioContext";

const RenderOnAuthenticated = ({ children }) => {
  const { isLoggedIn } = useResolutioContext();
  return isLoggedIn ? children : null;
};

export default RenderOnAuthenticated;
