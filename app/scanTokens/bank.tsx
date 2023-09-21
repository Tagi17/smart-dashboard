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
import { bankConfig, tokenConfig } from './abi'
import { goerli, mainnet, polygonMumbai } from 'viem/chains'

import { StringLiteral } from 'typescript';
import { ethers } from 'ethers';
import { parse } from 'path';

declare global {
    interface Window {
      ethereum: any;
    }
  }
// interface WalletClientType {
//   writeContract: (params: ContractParams) => Promise<string>;
//   getAddresses: () => Promise<string[]>;
// }

// interface ContractParams{
//   address: `0x${string}`;
//   abi: AbiType;
//   functionName: string;
//   account: string;
//   args: any[]
// }
// type AbiType = any[];


export const GetAddress: React.FC = () => {
  const [userAddy, setAddress] = useState<string | null>(null);
  const [walletClient, setWalletClient] = useState<any>(null);
  const [walletClientInitialized, setWalletClientInitialized] = useState(false);
  const [hash, setHash] = useState<string>('');
  const [enteredAmount, setEnteredAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const tokenAddress = "0x02BdEE024e555Df8764F0157dCd2f64e121Bc769";
  const bankAddress = "0x0a6ab0B97550436D299F385572C6014Ccf4D55A2";
  
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue);
    if(!isNaN(numericValue)) {
      setEnteredAmount(inputValue.toString());
    } else{
      setEnteredAmount('');
    }
  }
  
  const ApproveToken = async () => {
    try{
      if(!walletClient){
        console.error('Wallet client not initialized.');
        return;
      }
    const approveHash = await walletClient.writeContract({
      address: '0x02BdEE024e555Df8764F0157dCd2f64e121Bc769',
      abi: tokenConfig.abi,
      functionName: 'approve',
      account: userAddy,
      args: [bankAddress, enteredAmount]  
    });
  }  catch (error) {
    console.error('Error approving tokens:', error);
  }
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
    if (!walletClient) {
      console.error('Wallet client not initialized.');
      return;
    }

    const withdrawHash = await walletClient.writeContract({
      address: bankAddress,
      abi: bankConfig.abi,
      functionName: 'withdraw',
      account: userAddy,
      args: [parseEther('10000')]
      });
    }
  
    const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
  }, 5000);
  
  
    const initWalletClient = async () => {
      try {
        const walletClient = createWalletClient({
          chain: polygonMumbai,
          transport: custom(window.ethereum)
        });    
        console.log('Wallet client initialized:', walletClient);
        setWalletClient(walletClient);
        setWalletClientInitialized(true);
        const [tempAddy] = await walletClient.getAddresses();
          
            setAddress(tempAddy);
            console.log('Address:', tempAddy);
            
            return () => {
              clearInterval(interval);
          };
      } catch (error) {
        console.error('Error initializing wallet client:', error);
      }
    };
    initWalletClient();
  }, []);


  useEffect(() => {
    
    const fetchAddress = async () => {
      console.log('Fetching address...'); 
      if(walletClient){
       
          const [tempAddy] = await walletClient.getAddresses();
          if(tempAddy) {
            setAddress(tempAddy);
            console.log('Address:', tempAddy);
          } else {
              setAddress('');
          }
      }
    };
    fetchAddress();
      const handleInput = (event: InputEvent) => {
        const amountInput = event.target as HTMLInputElement;
        amountInput.value = amountInput.value.replace(/[^0-9]/g, '');
      };
      const handleButtonClick = () => {
        const amountInput = document.getElementById('amountInput') as HTMLInputElement;
        const enteredAmount = parseInt(amountInput.value);
      
        if (isNaN(enteredAmount) || enteredAmount <= 0) {
          alert('Please enter a valid amount greater than 0');
          return;
        }
      };
      
        const amountInput = document.getElementById('amountInput') as HTMLInputElement;
        const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
        if (amountInput && submitButton) {
          amountInput.addEventListener('input', handleInput as EventListener);
          submitButton.addEventListener('click', handleButtonClick);
        }
       return () => {
        if (amountInput ){
          amountInput.removeEventListener('input', handleInput as EventListener);
        }
        if (submitButton) {
          submitButton.removeEventListener('click', handleButtonClick);
        }
      }
      
  }, [walletClient]);

        return (
          <div>
            {userAddy ? ( 
            <>
            Your address: {userAddy}
            <br/>
            {hash && <p>Transaction Hash: {hash}</p>}
            <br/>
          {walletClient && (
            <>
            <div className='token'>

                <button onClick={mintTokens} className="button">Mint Tokens</button>
                <br/>
                <button onClick={deposit} className="button">Deposit Tokens</button>
                <br/>
                <button onClick={withdraw} className="button">Withdraw Tokens</button>
          
            </div>
            </>
          )}

            <br/>
            <div className="inputContainer">
            <input type="number" value={enteredAmount} onChange={handleAmountChange} placeholder='Enter Amount' className='inputTextColor'/>
            {walletClient && <button onClick={ApproveToken} className='submitButton'>Submit</button>}
            <br/>
            </div>
            </>
          ):(
              <p>Loading address...</p>
            )}
            </div>
          );
};

