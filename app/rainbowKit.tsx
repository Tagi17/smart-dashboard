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

import type { AppProps } from 'next/app';
import { Chain } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// const goerli: Chain = {
//   id: 5,
//   name: 'Goerli',
//   network: 'goerli',
//   nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
//   rpcUrls: {
//     default: { http: ['https://goerli.infura.io/v3/INFURA_API_KEY'] },
//     public: { http: ['https://goerli.infura.io/v3/INFURA_API_KEY'] },
//   },
//   blockExplorers: {
//     etherscan: { name: 'Etherscan', url: 'https://goerli.etherscan.io' },
//     default: { name: 'Etherscan', url: 'https://goerli.etherscan.io' },
//   },
//   testnet: true,
// };

// export type RainbowKitChain  = {
//   id: number;
//   name: string;
//   network: string;
//   nativeCurrency: {
//     decimals: number;
//     name: string;
//     symbol: string;
//   };

// };

export const mumbaiPolygonTestnet: Chain = {
  id: 80001, // This is the chain ID for Mumbai Polygon testnet
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



export const { publicClient, webSocketPublicClient } = configureChains([mumbaiPolygonTestnet], [publicProvider()]);

export const { connectors } = getDefaultWallets({
  appName: 'Smart-Dashboard',
  projectId: "79d53986ece4f57a9937de248cef5af6",
  chains: [mumbaiPolygonTestnet],
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function getRainbowKitProvider (Component: React.ComponentType<AppProps["Component"]>, pageProps: AppProps["pageProps"]) {
  const chains = [mumbaiPolygonTestnet];

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton />
        <Component {...pageProps} chains={chains} wagmiConfig={wagmiConfig} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
