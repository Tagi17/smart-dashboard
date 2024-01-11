import "@/styles/globals.css"; // CSS doesnt really matter now

import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";

import type { AppProps } from "next/app";
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// configure the chains and provider that you want to use for your app, 
//connectors, chains 
const { chains, publicClient, webSocketPublicClient  } = configureChains(
  [mainnet, polygonMumbai],
  [alchemyProvider({ apiKey: 'NEXT_PUBLIC_ALCHEMY_API_KEY' }),publicProvider()]
);
// type WagmiProviderType = {
//   children: React.ReactNode;
// };

// This creates a wagmi client instance of createClient 
// and passes in the provider and webSocketProvider.
const config = createConfig({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export default function WagmiAppProvider({ Component, pageProps }: AppProps) {
  return (
    // Wrap your application with the WagmiConfig component 
    // and pass the client instance as a prop to it.
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}