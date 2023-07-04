'use client';

import '../app/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { argentWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';

import type { AppProps } from 'next/app';
import { Chain } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const goerli: Chain = {
  id: 5,
  name: 'Goerli',
  network: 'goerli',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://goerli.infura.io/v3/INFURA_API_KEY'] },
    public: { http: ['https://goerli.infura.io/v3/INFURA_API_KEY'] },
  },
  blockExplorers: {
    etherscan: { name: 'Etherscan', url: 'https://goerli.etherscan.io' },
    default: { name: 'Etherscan', url: 'https://goerli.etherscan.io' },
  },
  testnet: true,
};

const { publicClient, webSocketPublicClient } = configureChains([goerli], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'Smart-Dashboard',
  projectId: '',
  chains: [goerli],
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function getRainbowKitProvider(Component: React.ComponentType<AppProps['Component']>, pageProps: AppProps['pageProps']) {
  const chains = [goerli];

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
