import * as UAuthWeb3Modal from "@uauth/web3modal";
import { useCallback, useEffect, useReducer } from "react";
import Web3Modal from "web3modal";
import providerOptions from "../config/providerOptions";
import { web3InitialState, web3Reducer } from "../reducers/Web3Reducer";

export const useWeb3 = () => {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState);
  const { provider, address, networkId, chainId, user } = state;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const web3modal = useMemo(() => {
    const onNewWeb3Modal = UAuthWeb3Modal.registerWeb3Modal;
    console.log("New Web3Modal instance!");
    const w3m = new Web3Modal({
      cacheProvider: true,
      disableInjectedProvider: false,
      providerOptions, // required
    });
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
      providerOptions["custom-uauth"];
    return UAuthWeb3Modal.getUAuth(uauthPackage, uauthOptions);
  }, []);

  const connect = useCallback(
    async (id) => {
      console.log("Connecting...");
      setLoading(true);
      setError(undefined);
      try {
        const provider = id
          ? await web3modal.connectTo(id)
          : await web3modal.connect();

        if (web3modal.cachedProvider === "custom-uauth") {
          //setUser(await uauth.user())
          dispatch({
            type: "SET_USER",
            user: await uauth.user(),
          });
        }

        //setProvider(provider)
        dispatch({
          type: "SET_PROVIDER",
          provider,
        });

        const tempWeb3 = new Web3(provider);

        const [address] = await tempWeb3.eth.getAccounts();
        dispatch({
          type: "SET_ADDRESS",
          address,
        });
        //setAddress(address)
        dispatch({
          type: "SET_CHAIN_ID",
          chainId: await tempWeb3.eth.getChainId(),
        });
        dispatch({
          type: "SET_NETWORK_ID",
          chainId: await tempWeb3.eth.net.getId(),
        });
        //setChainId(await tempWeb3.eth.getChainId())
        //setNetworkId(await tempWeb3.eth.net.getId())

        setError(undefined);
        setLoading(false);

        console.log("Connected!");
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error("Failed to connect!");
      }
    },
    [uauth, web3modal]
  );

  const disconnect = useCallback(async () => {
    console.log("Disconnecting...");

    if (web3modal.cachedProvider === "custom-uauth") {
      web3modal.clearCachedProvider();
      await uauth.logout();
    }

    web3modal.clearCachedProvider();
    unsubscribeFromProvider(provider);
    dispatch({
      type: "RESET_WEB3_PROVIDER",
    });
    //setProvider(undefined)
    //setAddress(undefined)
    //setChainId(undefined)
    //setNetworkId(undefined)

    setLoading(false);

    console.log("Disconnected!");
  }, [provider, uauth, unsubscribeFromProvider, web3modal]);

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
    dispatch({
      type: "RESET_WEB3_PROVIDER",
    });

    //setProvider(undefined)
    //setAddress(undefined)
  };

  const onAccountsChanged = useCallback(async (address) => {
    console.log("provider.accountsChanged", [address]);
    dispatch({
      type: "SET_ADDRESS",
      address,
    });
    //setAddress(address)
  }, []);

  const onChainChanged = useCallback(
    async (chainId) => {
      console.log("provider.chainChanged", chainId);
      dispatch({
        type: "SET_CHAIN_ID",
        chainId,
      });
      dispatch({
        type: "SET_NETWORK_ID",
        networkId: await web3.eth.net.getId(),
      });
      //setChainId(chainId)
      //setNetworkId(await web3.eth.net.getId())
    },
    [web3.eth.net]
  );

  const onNetworkChanged = useCallback(
    async (networkId) => {
      console.log("provider.networkChanged", networkId);
      dispatch({
        type: "SET_NETWORK_ID",
        networkId,
      });
      dispatch({
        type: "SET_CHAIN_ID",
        chainId: await web3.eth.getChainId(),
      });

      //setNetworkId(networkId)
      //setChainId(await web3.eth.getChainId())
    },
    [web3.eth]
  );

  const subscribeToProvider = useCallback(
    (provider) => {
      console.log("Attaching event listeners to provider...");

      if (provider == null || typeof provider.on !== "function") {
        return;
      }

      provider.on("close", onClose);
      provider.on("accountsChanged", onAccountsChanged);
      provider.on("chainChanged", onChainChanged);
      provider.on("networkChanged", onNetworkChanged);

      console.log("Attached event listeners to provider!");
    },
    [onAccountsChanged, onChainChanged, onNetworkChanged]
  );

  const unsubscribeFromProvider = useCallback(
    (provider) => {
      console.log("Removing event listeners to provider...");

      if (provider == null || typeof provider.removeListener !== "function") {
        return;
      }

      provider.removeListener("close", onClose);
      provider.removeListener("accountsChanged", onAccountsChanged);
      provider.removeListener("chainChanged", onChainChanged);
      provider.removeListener("networkChanged", onNetworkChanged);

      console.log("Removed event listeners to provider!");
    },
    [onAccountsChanged, onChainChanged, onNetworkChanged]
  );

  useEffect(() => {
    subscribeToProvider(provider);
    return () => {
      unsubscribeFromProvider(provider);
    };
  }, [provider, subscribeToProvider, unsubscribeFromProvider]);

  //-------------------------------------------

  return {
    web3modal,
    connect,
    disconnect,
    web3,
    isConnected: provider != null,
    isLoading: loading,
    error,
    uauth,
    provider,
    address,
    networkId,
    chainId,
    user,
  };
};
