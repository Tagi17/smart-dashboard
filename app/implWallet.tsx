"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { Chain, ConnectButton, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";

import IsMounted from "./components/isMounted";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from 'react';
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// const { chains, publicClient } = configureChains(
//     [polygonMumbai],
//     [publicProvider()]
//   );


const mumbaiPolygonTestnet: Chain = {
  id: 80001, // This is the chain ID for Mumbai Polygon testnet
  name: 'Mumbai',
  network: 'polygon',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
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

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ polygonMumbai], 
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "Smart-Dashboard",
  projectId: "79d53986ece4f57a9937de248cef5af6",
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: publicClient({chainId: 80001}),
  webSocketPublicClient,
});

// const { chains, publicClient } = configureChains(
//   [mumbaiPolygonTestnet],
//   [publicProvider()]
// );

  // const wagmiConfig = createConfig({
  //   autoConnect: true,
  //   connectors,
  //   publicClient: publicClient({chainId: 80001})
  // });
  
  function Wallet() {
    const mounted = IsMounted();
    if (!mounted) return;
    return (
      <>
       <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} initialChain={mainnet}>
            <div>
                <ConnectButton />
            </div>
            </RainbowKitProvider>
        </WagmiConfig>
      </>
    );
  }
  
  
  export default Wallet;