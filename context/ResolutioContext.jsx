import { createContext, useContext } from "react";
import { useResolutio } from "../hooks/useWeb3";
import { web3InitialState } from "../reducers/Web3Reducer";

const Web3Context = createContext(web3InitialState);

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
