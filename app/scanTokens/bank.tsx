'use client'

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
import { bankConfig, tokenConfig } from './abi'
import { goerli, mainnet, polygonMumbai } from 'viem/chains'
import { useEffect, useRef, useState } from 'react';

import { ethers } from 'ethers';
import { parse } from 'path';

declare global {
    interface Window {
      ethereum: any;
    }
  }
  

export const GetAddress: React.FC = () => {
  const [userAddy, setAddress] = useState<string>('');
  const [walletClient, setWalletClient] = useState<any>(null);
  const [amount, setAmount] = useState<string>('');
  const [hash, setHash] = useState<string>('');
  const [enteredAmount, setEnteredAmount] = useState<string>('');

  const tokenAddress = "0x02BdEE024e555Df8764F0157dCd2f64e121Bc769";
  const bankAddress = "0x0a6ab0B97550436D299F385572C6014Ccf4D55A2";
  
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  }
  
  const approveToken = async () => {
    try{
      if(!walletClient){
        console.error('Wallet client not initialized.');
        return;
      }
    }
    catch (error) {
      console.error('Error approving tokens:', error);
    }
    setEnteredAmount(enteredAmount);
    const approveHash = await walletClient.writeContract({
      address: '0x02BdEE024e555Df8764F0157dCd2f64e121Bc769',
      abi: tokenConfig.abi,
      functionName: 'approve',
      account: userAddy,
      args: [bankAddress, enteredAmount]  
    });
  }

  const mintTokens = async () => {
    try {
      if (!walletClient) {
        console.error('Wallet client not initialized.');
        return;
      }

  const mintHash = await walletClient.writeContract({
    address: '0x02BdEE024e555Df8764F0157dCd2f64e121Bc769',
    abi: tokenConfig.abi,
    functionName: 'mint',
    account: userAddy,
    args: [userAddy]
  });

  console.log('Transaction hash:', mintHash);
  setHash(mintHash);
    } catch (error) {
      console.error('Error minting tokens:', error);
    }
  };

  const deposit = async () => {

      if (!walletClient) {
        console.error('Wallet client not initialized.');
        return;
      }

      const depositHash = await walletClient.writeContract({
        address: bankAddress,
        abi: bankConfig.abi,
        functionName: 'deposit',
        account: userAddy,
        args: [parseEther('10000')]
        });
  }

  const withdraw = async () => {

    const withdrawHash = await walletClient.writeContract({
      address: bankAddress,
      abi: bankConfig.abi,
      functionName: 'withdraw',
      account: userAddy,
      args: [parseEther('10000')]
      });
}

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', async () => {
      const amountInput = document.getElementById('amountInput') as HTMLInputElement;
      const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    
      amountInput.addEventListener('input', (event) => {
        amountInput.value = amountInput.value.replace(/[^0-9]/g, '');
      });
  
      submitButton.addEventListener('click', async () => {
        const enteredAmount = parseInt(amountInput.value);
  
        if (isNaN(enteredAmount) || enteredAmount <= 0) {
          alert('Please enter a valid amount greater than 0');
          return;
        }
      const publicClient = createPublicClient({
          chain: polygonMumbai,
          transport: webSocket('wss://polygon-mumbai.g.alchemy.com/v2/ZDgTfnpUmVWbI4_Um77CIOv7FhDDgxBP')
        })
      const client  = createWalletClient({
          chain: polygonMumbai,
          transport: custom(window.ethereum)
        });    
        setWalletClient(client);
          
    (async () => {
      var [tempAddy] = await walletClient?.getAddresses();
      setAddress(tempAddy);
      console.log('Address:', userAddy);

    })();

  });
  });
  }, [userAddy, walletClient]);
    
        return (
          <div>
            {/* Your address: {userAddy} */}
             
            {/* {hash && <p>Transaction Hash: {hash}</p>} */}
           
           
            {/* {walletClient && <button onClick={mintTokens}>Mint Tokens</button>} */}

            <br/>
            {walletClient && <button onClick={approveToken}>Approve Tokens</button>}
            <input type="text" value={enteredAmount} onChange={handleAmountChange} placeholder='Enter Amount' />
            <br/>
            {/* <input type="text" value={amount} onChange={handleAmountChange} /> */}
         
            <br/>
            {/* {walletClient && <button onClick={deposit}>Deposit Tokens</button>} */}
         
            <br/>
         
            {/* {walletClient && <button onClick={withdraw}>Withdraw Tokens</button>} */}
          </div>
        );
};

