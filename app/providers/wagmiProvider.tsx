import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import {
  RainbowKitProvider,
  connectorsForWallets,
  createAuthenticationAdapter,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createConfig } from "wagmi";

import React from "react";
import { Web3Modal } from "@web3modal/react";
import { config } from 'dotenv';
import { polygonMumbai } from "wagmi/chains";

config();

type WagmiProviderType = {
  children: React.ReactNode;
};

const chains = [polygonMumbai];
const envProjectId = process.env.NEXT_PUBLIC_W3C_PID;
const projectId: string = envProjectId || '';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);
const WagmiProvider = ({ children }: WagmiProviderType) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default WagmiProvider;