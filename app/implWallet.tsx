"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { ConnectButton, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { bsc, bscTestnet, goerli, mainnet, polygon } from "wagmi/chains";

import IsMounted from "./components/isMounted";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
    [goerli],
    [publicProvider()]
  );
  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
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