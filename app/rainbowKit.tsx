'use client';

import '../app/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import { ConnectButton, darkTheme } from "@rainbow-me/rainbowkit";
import {
  RainbowKitProvider,
  connectorsForWallets,
  createAuthenticationAdapter,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { goerli, mainnet, polygon } from "wagmi/chains";

import type { AppProps } from 'next/app';
import { Chain } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { useAccount } from 'wagmi';

// interface ExtendedChain extends Chain {
//   network?: string;
// }
export const polygonMainnet: Chain = {
  id: 137,
  name: 'Polygon Mainnet',
  network: 'polygon',
  nativeCurrency: {
    decimals: 18,
    name: 'MATIC',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: {
      http: ['wss://polygon-bor-rpc.publicnode.com'],
    },
    public: {
      http: ['wss://polygon-bor-rpc.publicnode.com'],
    }
  },
  blockExplorers: {
    default: { name: 'PolygonScan', url: 'wss://polygon-bor-rpc.publicnode.com' },
  },
  testnet: false,
};
// export const mumbaiPolygonTestnet: Chain  = {
//   id: 80001, 
//   name: 'Mumbai',
//   network: 'polygon',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'MATIC',
//     symbol: 'MATIC',
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://polygon-mumbai-bor-rpc.publicnode.com'],
//     },
//     public: {
//       http: ['https://polygon-mumbai-bor-rpc.publicnode.com'],
//     },
//   },
//   blockExplorers: {
//     default: { name: 'Mumbai Explorer', url: 'https://mumbai-explorer.matic.today' },
//   },
//   testnet: true,
// };

 const chainsResult  = configureChains(
  [mainnet, polygon, goerli, polygonMainnet],
  [publicProvider()],
);
export const chains = chainsResult.chains;

// export const { publicClient, webSocketPublicClient } = configureChains([mumbaiPolygonTestnet], [publicProvider()]);
export const { publicClient, webSocketPublicClient } = configureChains(chains, [publicProvider()]);

const apiKey: string | undefined = process.env.NEXT_PUBLIC_RAINBOWKIT_API_KEY;

export const { connectors } = getDefaultWallets({
  appName: 'Smart-Dashboard',
  projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_API_KEY as string,
  chains: chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

type ProviderType = {
  children?: React.ReactNode;
  wagmiConfig: any; 
};

export function GetRainbowKitProvider({ children }:ProviderType) {

console.log("Wagmi Config:", wagmiConfig);

  return (
    <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          {children}
        </RainbowKitProvider>
    </WagmiConfig>
  );
}
