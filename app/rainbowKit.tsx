'use client';

import '../app/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import { ConnectButton, darkTheme } from "@rainbow-me/rainbowkit";
import { GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
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
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { SiweMessage } from 'siwe';
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

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to my RainbowKit app',
});

export function getRainbowKitProvider (Component: React.ComponentType<AppProps["Component"]>, pageProps: AppProps["pageProps"], session: Session | undefined) {

  return (
    <WagmiConfig config={wagmiConfig}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
          <RainbowKitProvider chains={chains}>
            <ConnectButton />
            <Component {...pageProps} chains={chains} wagmiConfig={wagmiConfig} session={session}/>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}
