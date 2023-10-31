import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useReducer } from "react";
import Web3Modal from "web3modal";
import ArbiterNFT from "../integrations/ArbiterNFT";

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
  const { enqueueSnackbar } = useSnackbar();
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
        let isArbiter;
        try {
          const arbiterNFT = new ArbiterNFT();
          isArbiter = await arbiterNFT.verifyUser(address);
        } catch (error) {
          console.log(error);
          // Toast for incorrect network
          enqueueSnackbar("Please set network to Polygon Mumbai Testnet", {
            variant: "warning",
          });
          isArbiter = false;
        }

        // Toast for wallet connected
        enqueueSnackbar("Connected to Web3 Wallet", { variant: "success" });

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
  }, [enqueueSnackbar]);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }

      // Toast for wallet disconnected
      enqueueSnackbar("Disconnected from Web3 Wallet", { variant: "error" });

      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    } else {
      console.error("No Web3Modal");
    }
  }, [enqueueSnackbar, provider]);

  // // Auto connect to the cached provider
  // useEffect(() => {
  //   if (web3Modal && web3Modal.cachedProvider) {
  //     connect();
  //   }
  // }, [connect]);

  // // EIP-1193 events
  // useEffect(() => {
  //   if (provider?.on) {
  //     const handleAccountsChanged = async (accounts) => {
  //       // Toast for wallet Changed
  //       enqueueSnackbar("Changed Web3 Wallet Account", { variant: "info" });

  //       let isArbiter;
  //       try {
  //         const arbiterNFT = new ArbiterNFT();
  //         isArbiter = await arbiterNFT.verifyUser(accounts[0]);
  //       } catch (error) {
  //         console.log(error);
  //         isArbiter = false;
  //       }

  //       dispatch({
  //         type: "SET_ADDRESS",
  //         address: accounts[0],
  //       });
  //       dispatch({
  //         type: "SET_ISARBITER",
  //         isArbiter,
  //       });
  //     };

  //     // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
  //     const handleChainChanged = (_hexChainId) => {
  //       if (typeof window !== "undefined") {
  //         console.log("switched to chain...", _hexChainId);
  //         // Toast for network Changed
  //         enqueueSnackbar("Web3 Network Changed", { variant: "info" });

  //         window.location.reload();
  //       } else {
  //         console.log("window is undefined");
  //       }
  //     };

  //     const handleDisconnect = (error) => {
  //       console.log("disconnect", error);
  //       disconnect();
  //     };

  //     provider.on("accountsChanged", handleAccountsChanged);
  //     provider.on("chainChanged", handleChainChanged);
  //     provider.on("disconnect", handleDisconnect);

  //     // Subscription Cleanup
  //     return () => {
  //       if (provider.removeListener) {
  //         provider.removeListener("accountsChanged", handleAccountsChanged);
  //         provider.removeListener("chainChanged", handleChainChanged);
  //         provider.removeListener("disconnect", handleDisconnect);
  //       }
  //     };
  //   }
  // }, [provider, disconnect, enqueueSnackbar]);

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
