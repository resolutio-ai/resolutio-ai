import { createContext, useContext } from "react";
import { useResolutio } from "../hooks/useResolutio";
import { resolutioInitialState } from "../reducers/ResolutioReducer";

const Web3Context = createContext(resolutioInitialState);

export const ResolutioContextProvider = ({ children }) => {
  const web3ProviderState = useResolutio();

  return (
    <Web3Context.Provider value={web3ProviderState}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  return useContext(Web3Context);
};
