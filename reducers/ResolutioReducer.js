export const resolutioInitialState = {
  provider: null,
  web3Provider: null,
  address: null,
  network: null,
  isLoggedIn: false,
  isArbiter: false,
  isAdmin: false,
};

export const resolutioReducer = (state, action) => {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        network: action.network,
        isLoggedIn: action.isLoggedIn,
        isArbiter: action.isArbiter,
        isAdmin: action.isAdmin,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_NETWORK":
      return {
        ...state,
        network: action.network,
      };
    case "SET_LOGGEDIN":
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case "SET_ISARBITER":
      return {
        ...state,
        isArbiter: action.isArbiter,
      };
    case "SET_ISADMIN":
      return {
        ...state,
        isAdmin: action.isAdmin,
      };
    case "RESET_WEB3_PROVIDER":
      return resolutioInitialState;
    default:
      throw new Error();
  }
};
