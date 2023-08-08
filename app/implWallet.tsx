"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { Chain, ConnectButton, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";

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


// const mumbaiPolygonTestnet: Chain = {
//   id: 80001, // This is the chain ID for Mumbai Polygon testnet
//   name: 'Mumbai',
//   network: 'polygon',

//   iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'MATIC',
//     symbol: 'MATIC',
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://rpc-mumbai.maticvigil.com/'],
//     },
//   },
//   blockExplorers: {
//     default: { name: 'Mumbai Explorer', url: 'https://mumbai-explorer.matic.today' },
//   },
//   testnet: true,
// };

const { chains, publicClient } = configureChains(
  [ polygonMumbai], 
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);


  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "79d53986ece4f57a9937de248cef5af6",
    chains,
  });
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  
  function Wallet() {
    const mounted = IsMounted();
    if (!mounted) return;
    return (
      <>
       <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <div>
                <ConnectButton />
            </div>
            </RainbowKitProvider>
        </WagmiConfig>
      </>
    );
  }
  
  
  export default Wallet;