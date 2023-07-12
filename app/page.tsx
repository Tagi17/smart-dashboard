import "@rainbow-me/rainbowkit/styles.css";

import { ConnectButton, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { bsc, bscTestnet, goerli, mainnet, polygon } from "wagmi/chains";

import AnimatedBanner from './animatedBanner';
import Image from 'next/image';
import IsMounted from "./components/isMounted";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
import dynamic from 'next/dynamic';
import layout from './layout';
import { publicProvider } from "wagmi/providers/public";
import uniswap from "./uniswap.png";

function Page() {

  return (
    <>
      
      <div>
        <div>
          <AnimatedBanner />
        </div>
        <div className="uniswap">
       
        </div>
        <div className="grid grid-cols-3 grid-rows-1" style={{ gridTemplateColumns: '.5fr .5fr 1fr' }}> 
          <div className="curved-box">
            <span className="leftBox">User Wallet Info:</span>
            <span className="leftBox1">You have 196 transactions</span>
          </div>
          <div className="curved-box1">
            <div className="uniswap1">
              <span>UNISWAP</span>
              </div>
                <span className="saysc">See all your staked crypto</span>
              </div>
          <div className="curved-box2 flex">
            <div className="image flex"> 
              <Image src={uniswap} alt="Uniswap logo" width={200} height={200}/>
              <span className="liquid flex-grow">{'>'}Liquid Staking</span>
            </div>  
          </div>
        </div>
      </div>
    </>
  );
}


export default Page;