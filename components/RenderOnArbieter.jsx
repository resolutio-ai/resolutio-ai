import { useEffect, useState } from "react";
import { useResolutioContext } from "../context/ResolutioContext";
import { verifyArbiter } from "../integrations/VerifyArbiter";

const RenderOnArbieter = ({ children }) => {
  const { web3Provider, address } = useResolutioContext();
  const [isArbieter, setArbieter] = useState(false);

  useEffect(() => {
    const checkArtbeiter = async () => {
      console.log(address);
      if (!(web3Provider && address)) return false;
      // logic to check for arbeiter
      const arbiterStatus = await verifyArbiter(address);
      console.log(arbiterStatus);
      setArbieter(arbiterStatus);
    };

    checkArtbeiter();
  }, [web3Provider, address]);

  return isArbieter ? children : null;
};

export default RenderOnArbieter;
