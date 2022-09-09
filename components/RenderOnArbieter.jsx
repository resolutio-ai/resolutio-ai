import { useResolutioContext } from "../context/ResolutioContext";

const RenderOnArbieter = ({ children }) => {
  const { isArbiter } = useResolutioContext();
  return isArbiter ? children : null;
};

export default RenderOnArbieter;
