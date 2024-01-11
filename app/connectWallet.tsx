import { Chain, ConnectButton, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { GetRainbowKitProvider, chains, connectors, mumbaiPolygonTestnet, wagmiConfig } from "./rainbowKit"
import { WagmiConfig, createConfig } from 'wagmi';

import IsMounted from "./components/isMounted";

//was used to export into the page.tsx file to show connectwallet button but it is an unnceccesary file 
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
    className?: string; 
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