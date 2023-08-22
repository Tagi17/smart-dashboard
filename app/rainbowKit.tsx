'use client';

import '../app/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import { ConnectButton, darkTheme } from "@rainbow-me/rainbowkit";
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { goerli, mainnet, polygon } from "wagmi/chains";

import type { AppProps } from 'next/app';
import { Chain } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export const mumbaiPolygonTestnet: Chain = {
  id: 80001, 
  name: 'Mumbai',
  network: 'polygon',
  nativeCurrency: {
    decimals: 18,
    name: 'MATIC',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-mumbai.maticvigil.com/'],
    },
    public: {
      http: ['https://rpc-mumbai.maticvigil.com/'],
    },
  },
  blockExplorers: {
    default: { name: 'Mumbai Explorer', url: 'https://mumbai-explorer.matic.today' },
  },
  testnet: true,
};

 const chainsResult  = configureChains(
  [mainnet, polygon, goerli, mumbaiPolygonTestnet],
  [publicProvider()],
);
export const chains = chainsResult.chains;

// export const { publicClient, webSocketPublicClient } = configureChains([mumbaiPolygonTestnet], [publicProvider()]);
export const { publicClient, webSocketPublicClient } = configureChains(chains, [publicProvider()]);

export const { connectors } = getDefaultWallets({
  appName: 'Smart-Dashboard',
  projectId: "79d53986ece4f57a9937de248cef5af6",
  chains: chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function getRainbowKitProvider (Component: React.ComponentType<AppProps["Component"]>, pageProps: AppProps["pageProps"]) {
  // const chains = [mumbaiPolygonTestnet];

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton />
        <Component {...pageProps} chains={chains} wagmiConfig={wagmiConfig} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
