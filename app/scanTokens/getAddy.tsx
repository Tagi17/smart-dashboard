'use client'

import '/app/globals.css'

import {
  PublicClient,
  createPublicClient,
  createWalletClient,
  custom,
  getContract,
  http,
  parseAbi,
  parseEther,
  webSocket
} from 'viem'
import React, { useEffect, useRef, useState } from 'react';
import { goerli, mainnet, polygonMumbai } from 'viem/chains'

const client = createWalletClient({
    chain: mainnet,
    transport: http()
  })
export const fetchAddress = async (walletClient: any): Promise<string | null>=> {
    console.log('Fetching address...'); 
    if(walletClient){
      try{
        const [tempAddy] = await walletClient.getAddresses();
        if(tempAddy) {
            console.log('Address:', tempAddy);
            return tempAddy;
        } else {
            return null;
        } 
      } catch(error){
          console.log('Error gettting address:', error);
          return null;
          }
      }
    return null;
  };
export const AddyGet: React.FC = () => {
    const [userAddy, setAddress] = useState<string | null>(null);
    const [walletClient, setWalletClient] = useState<any>(null);
    const [walletClientInitialized, setWalletClientInitialized] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            const tempAddy = await fetchAddress(walletClient);
            setAddress(tempAddy);
            // const tempAddy = await fetchAddress(walletClient);
            // setAddress(tempAddy);
        };
        fetchData();
    }, [walletClient]);

  return (
    <div>
        <p>{userAddy}</p>
    </div>
  );
}