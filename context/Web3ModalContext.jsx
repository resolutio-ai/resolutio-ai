import * as UAuthWeb3Modal from "@uauth/web3modal";
import { useContext, useEffect, useMemo, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";

const Web3ModalContext = createContext(null);

export const Web3ModalProvider = ({ children, onNewWeb3Modal, ...options }) => {
  const [networkId, setNetworkId] = useState();
  const [chainId, setChainId] = useState();
  const [provider, setProvider] = useState();
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();

  const web3modal = useMemo(() => {
    console.log("New Web3Modal instance!");
    const w3m = new Web3Modal(options);
    if (typeof onNewWeb3Modal === "function") {
      onNewWeb3Modal(w3m);
    }
    return w3m;
  }, []);

  const web3 = useMemo(() => {
    console.log("New Web3 instance!");
    return provider ? new Web3(provider) : undefined;
  }, [provider]);

  const uauth = useMemo(() => {
    console.log("New UAuth instance!");
    const { package: uauthPackage, options: uauthOptions } =
      options.providerOptions["custom-uauth"];
    return UAuthWeb3Modal.getUAuth(uauthPackage, uauthOptions);
  }, []);

  const connect = async (id) => {
    console.log("Connecting...");
    setLoading(true);
    setError(undefined);
    try {
      const provider = id
        ? await web3modal.connectTo(id)
        : await web3modal.connect();

      if (web3modal.cachedProvider === "custom-uauth") {
        setUser(await uauth.user());
      }

      setProvider(provider);

      const tempWeb3 = new Web3(provider);

      const [address] = await tempWeb3.eth.getAccounts();
      setAddress(address);

      setChainId(await tempWeb3.eth.getChainId());
      setNetworkId(await tempWeb3.eth.net.getId());

      setError(undefined);
      setLoading(false);

      console.log("Connected!");
    } catch (e) {
      setError(e);
      setLoading(false);

      console.error("Failed to connect!");
    }
  };

  const disconnect = async () => {
    console.log("Disconnecting...");

    if (web3modal.cachedProvider === "custom-uauth") {
      web3modal.clearCachedProvider();
      await uauth.logout();
    }

    web3modal.clearCachedProvider();
    unsubscribeFromProvider(provider);
    setProvider(undefined);
    setAddress(undefined);
    setLoading(false);
    setChainId(undefined);
    setNetworkId(undefined);

    console.log("Disconnected!");
  };

  // Web3Modal event emitter

  useEffect(() => {
    const onErrorEvent = (error) => {
      console.error("web3modal.ERROR_EVENT", error);
      setError(error);
    };

    const onCloseEvent = () => {
      console.log("web3modal.CLOSE_EVENT");
    };

    const onConnectEvent = async (provider) => {
      console.log("web3modal.CONNECT_EVENT", provider);
    };

    console.log("Attaching event listeners to web3modal!");
    web3modal.on(ERROR_EVENT, onErrorEvent);
    web3modal.on(CLOSE_EVENT, onCloseEvent);
    web3modal.on(CONNECT_EVENT, onConnectEvent);

    return () => {
      console.log("Removing event listeners to web3modal!");
      web3modal.off(ERROR_EVENT, onErrorEvent);
      web3modal.off(CLOSE_EVENT, onCloseEvent);
      web3modal.off(CONNECT_EVENT, onConnectEvent);
    };
  }, [web3modal]);

  // Provider event emitter

  const onClose = () => {
    console.log("provider.close");

    setProvider(undefined);
    setAddress(undefined);
  };

  const onAccountsChanged = async ([address]) => {
    console.log("provider.accountsChanged", [address]);
    setAddress(address);
  };

  const onChainChanged = async (chainId) => {
    console.log("provider.chainChanged", chainId);
    setChainId(chainId);
    setNetworkId(await web3.eth.net.getId());
  };

  const onNetworkChanged = async (networkId) => {
    console.log("provider.networkChanged", networkId);
    setNetworkId(networkId);
    setChainId(await web3.eth.getChainId());
  };

  const subscribeToProvider = (provider) => {
    console.log("Attaching event listeners to provider...");

    if (provider == null || typeof provider.on !== "function") {
      return;
    }

    provider.on("close", onClose);
    provider.on("accountsChanged", onAccountsChanged);
    provider.on("chainChanged", onChainChanged);
    provider.on("networkChanged", onNetworkChanged);

    console.log("Attached event listeners to provider!");
  };

  const unsubscribeFromProvider = (provider) => {
    console.log("Removing event listeners to provider...");

    if (provider == null || typeof provider.removeListener !== "function") {
      return;
    }

    provider.removeListener("close", onClose);
    provider.removeListener("accountsChanged", onAccountsChanged);
    provider.removeListener("chainChanged", onChainChanged);
    provider.removeListener("networkChanged", onNetworkChanged);

    console.log("Removed event listeners to provider!");
  };

  useEffect(() => {
    subscribeToProvider(provider);
    return () => {
      unsubscribeFromProvider(provider);
    };
  }, [provider]);

  const value = {
    web3modal,
    connect,
    disconnect,
    networkId,
    chainId,
    provider,
    web3,
    address,
    isConnected: provider != null,
    isLoading: loading,
    error,
    user,
    uauth,
  };

  return (
    <Web3ModalContext.Provider value={value}>
      {children}
    </Web3ModalContext.Provider>
  );
};

export const useWeb3Modal = () => useContext(Web3ModalContext);
