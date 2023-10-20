'use client'

import { Chain, ConnectButton, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig, createConfig } from 'wagmi';
import { chains, connectors, getRainbowKitProvider, mumbaiPolygonTestnet, wagmiConfig } from "./rainbowKit"

import IsMounted from "./components/isMounted";

const RainbowKitConnectWrapper: React.FC<React.PropsWithChildren<{}>>  = ({ children }) => {
    return (
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    );
  };

  export interface WalletButtonProps {
    chains: Chain[];
    wagmiConfig: any;
    className?: string; // Add the className prop
  }

export default function WalletButton ({ chains, wagmiConfig }: { chains: Chain[], wagmiConfig: any }) {
    const mounted = IsMounted();
    if (!mounted) return;

    return (
        <>
            <RainbowKitConnectWrapper>
                <ConnectButton />
            </RainbowKitConnectWrapper>
        </>
    );
}