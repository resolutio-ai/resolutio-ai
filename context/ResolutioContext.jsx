import { createContext, useContext } from "react";
import { useResolutio } from "../hooks/useResolutio";
import { resolutioInitialState } from "../reducers/ResolutioReducer";

const ResolutioContext = createContext(resolutioInitialState);

export const ResolutioContextProvider = ({ children }) => {
  const resolutioProviderState = useResolutio();

  return (
    <ResolutioContext.Provider value={resolutioProviderState}>
      {children}
    </ResolutioContext.Provider>
  );
};

export const useResolutioContext = () => {
  return useContext(ResolutioContext);
};
