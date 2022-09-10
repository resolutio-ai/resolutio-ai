import { useResolutioContext } from "../context/ResolutioContext";

const RenderOnArbiter = ({ children }) => {
  const { isArbiter } = useResolutioContext();
  return isArbiter ? children : null;
};

export default RenderOnArbiter;
