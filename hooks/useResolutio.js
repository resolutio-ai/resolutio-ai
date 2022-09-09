import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { useCallback, useEffect, useReducer } from "react";
import Web3Modal from "web3modal";
import { verifyArbiter } from "../integrations/VerifyArbiter";

import {
  resolutioInitialState,
  resolutioReducer,
} from "../reducers/ResolutioReducer";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID_ETH,
    },
  },
};

let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "testnet", // optional
    cacheProvider: true,
    disableInjectedProvider: false,
    providerOptions, // required
  });
}

export const useResolutio = () => {
  const [state, dispatch] = useReducer(resolutioReducer, resolutioInitialState);
  const { provider, web3Provider, address, network, isLoggedIn, isArbiter } =
    state;

  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();
        const isArbiter = await verifyArbiter(address);
        //toast.success('Connected to Web3')

        dispatch({
          type: "SET_WEB3_PROVIDER",
          provider,
          web3Provider,
          address,
          network,
          isLoggedIn: true,
          isArbiter,
        });
      } catch (e) {
        console.log("connect error", e);
      }
    } else {
      console.error("No Web3Modal");
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      //toast.error('Disconnected from Web3')
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    } else {
      console.error("No Web3Modal");
    }
  }, [provider]);

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  // EIP-1193 events
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = async (accounts) => {
        // toast.info("Changed Web3 Account");
        const isArbiter = await verifyArbiter(accounts[0]);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
        dispatch({
          type: "SET_ISARBITER",
          isArbiter,
        });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        if (typeof window !== "undefined") {
          console.log("switched to chain...", _hexChainId);
          // toast.info("Web3 Network Changed");
          window.location.reload();
        } else {
          console.log("window is undefined");
        }
      };

      const handleDisconnect = (error) => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  return {
    provider,
    web3Provider,
    address,
    network,
    connect,
    disconnect,
    isLoggedIn,
    isArbiter,
  };
};
