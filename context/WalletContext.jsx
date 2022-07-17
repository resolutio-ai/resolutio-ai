import { createContext, useContext } from "react";
import { useWallet } from "../hooks/useWallet";
import { walletInitialState } from "../reducers/WalletReducer";

const WalletContext = createContext(walletInitialState);

export const WalletContextProvider = ({ children }) => {
  const walletState = useWallet();

  return (
    <WalletContext.Provider value={walletState}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  return useContext(WalletContext);
};
