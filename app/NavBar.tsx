"use client";

import '../app/globals.css'

import { ConnectButton, Theme, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { Container, Navbar } from "react-bootstrap";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { bsc, bscTestnet, goerli, mainnet, polygon } from "wagmi/chains";

import { BsExclude } from "react-icons/bs";
import IsMounted from "./components/isMounted";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
import dynamic from 'next/dynamic';
import layout from './layout';
import { publicProvider } from "wagmi/providers/public";
import { useEffect } from "react";

const { chains, publicClient } = configureChains(
    [mainnet, polygon, goerli],
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


  const myCustomTheme: Theme = {
    fonts: {
      body: 'Bluu',
      connectButtonText: 'Bluu',
    },
  };
  

  const ApplyCustomFont = () => {
    useEffect(() => {
      const style = document.createElement('style');
      style.innerHTML = `
        @font-face {
          font-family: 'Bluu';
          src: url('../fonts/BluuNext-master/Fonts/webfonts/bluunext-bold.ttf') format('truetype');
        }
        body {
          font-family: 'Bluu';
        }
      `;
      document.head.appendChild(style);
  
      return () => {
        document.head.removeChild(style);
      };
    }, []);
  
    return null;
  };

export default function NavBar() {
    const mounted = IsMounted();
    if (!mounted) return;
    return (
        <>
    <RainbowKitProvider theme={myCustomTheme} chains={chains}>
            <ApplyCustomFont />
            <WagmiConfig config={wagmiConfig}>
            <Navbar className="py-3" style={{ backgroundColor: "#0c030f", borderBottom: "2px solid #f310e1", fontSize: "1.9rem" }} bg="light" variant="light" sticky="top">
            <div className="grid grid-cols-3 grid-rows-1" style={{ gridTemplateColumns: ".5fr .5fr 1fr" }}>
                <div className="col-span-1">
                <BsExclude size={40} className="custom-icon mr-2" />
                </div>
                <div className="col-span-1">
                <span className="text-center">DASHBOARD</span>
                </div>
                <div className="col-span-1 flex justify-end">
                <div className="wallet-button">
                   
                    <RainbowKitProvider chains={chains}>
                        <ConnectButton.Custom>
                        {({ account, chain, openConnectModal }) => {
                            const connected = account && chain;
                            if (!connected) {
                            return (
                                <button onClick={openConnectModal} type="button">
                                Connect Wallet
                                </button>
                            );
                            }
                            // Custom button for connected state
                            return (
                            <button onClick={openConnectModal} type="button">
                                {account.displayName}
                                {account.displayBalance ? ` (${account.displayBalance})` : ''}
                            </button>
                            );
                        }}
                        </ConnectButton.Custom>
                    </RainbowKitProvider>
                    
                </div>
                </div>
            </div>
            </Navbar>
            </WagmiConfig>
        </RainbowKitProvider>
        </>
    );
}