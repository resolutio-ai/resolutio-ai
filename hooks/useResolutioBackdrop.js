import { useCallback, useState } from "react";

export const useResolutioBackdrop = () => {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [backdropMsg, setBackdropMsg] = useState("Loading...");

  const openBackdrop = useCallback((msg) => {
    setBackdropMsg(msg);
    setBackdropOpen(true);
  }, []);
  const closeBackdrop = useCallback(() => {
    setBackdropOpen(false);
    setBackdropMsg("Loading...");
  }, []);

  return { backdropOpen, backdropMsg, openBackdrop, closeBackdrop };
};
