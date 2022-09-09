import { useResolutioContext } from "../context/ResolutioContext";

const RenderOnAnonymous = ({ children }) => {
  const { isLoggedIn } = useResolutioContext();
  return !isLoggedIn ? children : null;
};

export default RenderOnAnonymous;
