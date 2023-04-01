// AuthContext.js
import { createContext, useContext } from "react";
import { useResolutioBackdrop } from "../hooks/useResolutioBackdrop";

const backdropInitialState = {
  backdropOpen: false,
  backdropMsg: "Loading...",
  openBackdrop: (msg) => {},
  closeBackdrop: () => {},
};

const ResolutioBackdropContext = createContext(backdropInitialState);

export const ResolutioBackdropContextProvider = ({ children }) => {
  const backdropProviderState = useResolutioBackdrop();

  return (
    <ResolutioBackdropContext.Provider value={backdropProviderState}>
      {children}
    </ResolutioBackdropContext.Provider>
  );
};

export const useResolutioBackdropContext = () => {
  return useContext(ResolutioBackdropContext);
};
