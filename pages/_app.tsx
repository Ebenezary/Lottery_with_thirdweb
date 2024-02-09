import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  useAddress,
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { Toast } from "react-hot-toast";

// import {sepolia} from "@thirdweb-dev/chains";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId="a137f99284d09ec05eaf316cd8f239fd"
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
