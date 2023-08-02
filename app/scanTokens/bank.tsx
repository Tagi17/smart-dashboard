'use client'

import { createPublicClient, createWalletClient, custom, getContract, http, parseAbi } from 'viem'
import { goerli, mainnet, polygonMumbai } from 'viem/chains'
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import { wagmiContractConfig } from './abi'

declare global {
    interface Window {
      ethereum: any;
    }
  }
  // export async function GetAddress(): Promise<void> {
// export const GetAddress = async () => {
// export async function GetAddress(): Promise<void> {

export const GetAddress: React.FC = () => {
  const [address, setAddress] = useState<string>('');
    useEffect(() => {
      const publicClient = createPublicClient({
          chain: goerli,
          transport: http('https://goerli.infura.io/v3/f4ef13675ba347f9bf406732babe9d3d')
        })
      const walletClient = createWalletClient({
          chain: goerli,
          transport: custom(window.ethereum)
        });    

    (async () => {
      const [address] = await walletClient.getAddresses();
      console.log('Address:', address);
      setAddress(address);
    })();
  }, []);

    //   const contract = getContract({
    //     ...wagmiContractConfig,
    //     publicClient: publicClient,
    // })
    
                  // const [address] = await walletClient.getAddresses()
      
    //   const { request }  = await publicClient.simulateContract({
    //     ...wagmiContractConfig,
    //     functionName: 'mint',
    //     account: address,
    //   })
      
    //   const  approveSimulation  = await publicClient.simulateContract({
    //     ...wagmiContractConfig,
    //     functionName: 'approve',
    //     account: address,
    //     args: [],
    //   })
    
    // const  mintTransaction  = await walletClient.writeContract(request);
    //const  approveTransaction = await walletClient.writeContract(approveSimulation);
    
        return (
          <div>
            {address}
             <br />
            console.log(address)
            </div>
        );
};
