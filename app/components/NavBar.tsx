"use client";

import "../app/globals.css";

import {
  Chain,
  ConnectButton,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { Container, Navbar } from "react-bootstrap";
import {
  GetRainbowKitProvider,
  chains,
  connectors,
  wagmiConfig,
} from "../rainbowKit";
import { WagmiConfig, createConfig } from "wagmi";
import { bsc, bscTestnet, goerli, mainnet, polygon } from "wagmi/chains";

import { BsExclude } from "react-icons/bs";
import IsMounted from "./isMounted";
import { alchemyProvider } from "wagmi/providers/alchemy";
import dynamic from "next/dynamic";
import layout from "../layout";
import { publicProvider } from "wagmi/providers/public";
import { useEffect } from "react";

const ApplyCustomFont = () => {
  useEffect(() => {
    const style = document.createElement("style");
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

const RainbowKitConnectWrapper: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default function NavBar({
  chains,
  wagmiConfig,
}: {
  chains: Chain[];
  wagmiConfig: any;
}) {
  const mounted = IsMounted();
  if (!mounted) return;

  return (
    <>
      <Navbar
        className="py-3"
        style={{
          backgroundColor: "#0c030f",
          borderBottom: "2px solid #f310e1",
          fontSize: "1.9rem",
        }}
        bg="light"
        variant="light"
        sticky="top"
      >
        <div
          className="grid grid-cols-3 grid-rows-1"
          style={{ gridTemplateColumns: ".5fr .5fr 1fr" }}
        >
          <div className="col-span-1">
            <BsExclude size={40} className="custom-icon mr-2" />
          </div>
          <div className="col-span-1">
            <span className="text-center">DASHBOARD</span>
          </div>
          <div className="col-span-1 flex justify-end">
            <div className="wallet-button">
              <RainbowKitConnectWrapper>
                <ConnectButton />
              </RainbowKitConnectWrapper>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
}
