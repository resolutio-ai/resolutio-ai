export const walletInitialState = {
  provider: null,
  address: null,
  networkId: null,
  chainId: null,
};

export const walletReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        address: action.address,
        networkId: action.network,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_NETWORK_ID":
      return {
        ...state,
        network: action.networkId,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "RESET_STATE":
      return walletInitialState;
    default:
      throw new Error();
  }
};
