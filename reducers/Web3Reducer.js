export const web3InitialState = {
  //web3Provider: null,
  provider: null,
  address: null,
  networkId: null,
  chainId: null,
  user: null,
};

export const web3Reducer = (state, action) => {
  switch (action.type) {
    case "SET_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        //web3Provider: action.web3Provider,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_NETWORK_ID":
      return {
        ...state,
        networkId: action.networkId,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "RESET_WEB3_PROVIDER":
      return web3InitialState;
    default:
      throw new Error();
  }
};
