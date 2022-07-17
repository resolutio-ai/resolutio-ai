import { useCallback, useReducer } from "react";
import { walletInitialState, walletReducer } from "../reducers/WalletReducer";

export const useWallet = () => {
  const [state, dispatch] = useReducer(walletReducer, walletInitialState);
  const { provider, address, networkId, chainId } = state;

  const connect = useCallback(async () => {
    dispatch({
      type: "SET_ADDRESS",
      address: "x0daaad",
    });
  }, []);

  const disconnect = useCallback(async () => {
    dispatch({
      type: "RESET_STATE",
    });
  }, []);

  return {
    provider,
    address,
    networkId,
    chainId,
    connect,
    disconnect,
  };
};
