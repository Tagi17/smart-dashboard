'use client'

import { PublicClient, createPublicClient, createWalletClient, custom, getContract, http, parseAbi, webSocket } from 'viem'
import { goerli, mainnet, polygonMumbai } from 'viem/chains'
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import { tokenConfig } from './abi'

declare global {
    interface Window {
      ethereum: any;
    }
  }
  // export async function GetAddress(): Promise<void> {
// export const GetAddress = async () => {
// export async function GetAddress(): Promise<void> {

export const GetAddress: React.FC = () => {
  const [userAddy, setAddress] = useState<string>('');
    
  useEffect(() => {
      const publicClient = createPublicClient({
          chain: polygonMumbai,
          transport: webSocket('wss://polygon-mumbai.g.alchemy.com/v2/ZDgTfnpUmVWbI4_Um77CIOv7FhDDgxBP')
        })
      const walletClient = createWalletClient({
          chain: polygonMumbai,
          transport: custom(window.ethereum)
        });    
      
    (async () => {
      const [userAddy] = await walletClient.getAddresses();
      console.log('Address:', userAddy);
      setAddress(userAddy);
      
      const hash = await walletClient.writeContract({
        address: '0x02BdEE024e555Df8764F0157dCd2f64e121Bc769',
        abi: tokenConfig.abi,
        functionName: 'mint',
        account: userAddy,
        args: [userAddy]
      })
      
      // const { request } = await publicClient.simulateContract({
      //   ...tokenConfig,
      //   functionName: 'mint',
      //   account: userAddy,
      // });

    })();
  }, []);

      
    //   const  approveSimulation  = await publicClient.simulateContract({
    //     ...tokenConfig,
    //     functionName: 'approve',
    //     account: address,
    //     args: [],
    //   })
    
    // const  mintTransaction  = await walletClient.writeContract(request);
    //const  approveTransaction = await walletClient.writeContract(approveSimulation);
    
        return (
          <div>
            {userAddy}
             <br />
            console.log(userAddy)
            </div>
        );
};
