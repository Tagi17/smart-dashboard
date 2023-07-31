'use client'

import { createPublicClient, createWalletClient, custom, getContract, http, parseAbi } from 'viem'
import { mainnet, polygonMumbai } from 'viem/chains'

import { ethers } from 'ethers';
import { useEffect } from 'react';
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
    useEffect(() => {
      const publicClient = createPublicClient({
          chain: polygonMumbai,
          transport: http('https://polygon-mumbai.infura.io/v3/952063985f82462c88e42f4ed150b486')
        })
      const walletClient = createWalletClient({
          chain: polygonMumbai,
          transport: custom(window.ethereum)
        });    

    (async () => {
      const [address] = await walletClient.getAddresses();
      console.log('Address:', address);
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
          <div>console.log(address)</div>
        );
};
