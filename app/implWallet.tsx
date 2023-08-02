"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { ConnectButton, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";

import IsMounted from "./components/isMounted";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
    [polygonMumbai],
    [publicProvider()]
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