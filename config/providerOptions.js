import UAuthSPA from "@uauth/js";
import * as UAuthWeb3Modal from "@uauth/web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const uauthOptions = {
  clientID: "88302836-bf75-4bf1-aca1-3ed4d506204b",
  redirectUri: "http://127.0.0.1:3000",
  scope: "openid wallet email email:optional profile",
};

const providerOptions = {
  "custom-uauth": {
    display: UAuthWeb3Modal.display,
    connector: UAuthWeb3Modal.connector,
    package: UAuthSPA,
    options: uauthOptions,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID_ETH,
    },
  },
};

export default providerOptions;
