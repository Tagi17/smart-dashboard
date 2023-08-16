"use client";

import '../app/globals.css'

import { Chain, ConnectButton, darkTheme } from "@rainbow-me/rainbowkit";
import { Container, Navbar } from "react-bootstrap";
import { bsc, bscTestnet, goerli, mainnet, polygon } from "wagmi/chains";
import { connectors, getRainbowKitProvider, mumbaiPolygonTestnet, wagmiConfig } from "./rainbowKit"

import { BsExclude } from "react-icons/bs";
import IsMounted from "./components/isMounted";
import { alchemyProvider } from "wagmi/providers/alchemy";
import dynamic from 'next/dynamic';
import layout from './layout';
import { publicProvider } from "wagmi/providers/public";
import { useEffect } from "react";

// const { chains, publicClient } = configureChains(
//     [mainnet, polygon, goerli],
//     [publicProvider()]
//   );
//   const { connectors } = getDefaultWallets({
//     appName: "My RainbowKit App",
//     projectId: "79d53986ece4f57a9937de248cef5af6",
//     chains,
//   });
//   const wagmiConfig = createConfig({
//     autoConnect: true,
//     connectors,
//     publicClient,
//   });


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


export default function NavBar({ chains, wagmiConfig }: { chains: Chain[], wagmiConfig: any }) {
    const mounted = IsMounted();
    if (!mounted) return;
    
    return (
        <>
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
                        <ConnectButton/>
                    </div>
                </div>
            </div>
        </Navbar>
    </>
    );
}