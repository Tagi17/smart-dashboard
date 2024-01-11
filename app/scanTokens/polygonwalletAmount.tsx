'use client'

import React, { useEffect, useState } from 'react';
import {ethereumTokens, polygonTokens} from '../tokenDetails';
import { useAccount, useContractRead, useNetwork } from 'wagmi';

import axios from 'axios';
import { config } from 'dotenv';
import {fetchAddress} from './getAddy';

interface ApiResponse{
    status: string;
    message: string;
    result: string;
  }

export const GetWalletAmount = () => {
    const [apiData, setApiData] = useState<ApiResponse | null>(null);
    const { address } = useAccount();

    useEffect(() => {
        const getAddressAndSetApiData = async () => {
          const apiKey = process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY;
          if (!apiKey) {
            console.error('API key is not initialized');
            return;
          }
    
          const apiUrl = `https://api-testnet.polygonscan.com/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
          
          try {
            const response = await axios.get(apiUrl);
            if (response.data.status !== '1') {
              console.error('Error from API:', response.data.message);
              return;
            }
            setApiData(response.data);
          } catch (error) {
            console.error('Error making the request:', error);
          }
        };
       
        if (address) {
          getAddressAndSetApiData();
        }
        console.log("Complete API Response:", apiData);
      }, [apiData, address]);

      const formatBalance = (balance: string): string => {
        const numericBalance = parseFloat(balance);
        if (isNaN(numericBalance)) {
          console.error('Invalid balance value:', balance);
          return 'Error';
        }
        return (numericBalance / Math.pow(10, 18)).toFixed(2);
      };
        
    return (
        <div>
             {apiData && (
          <div>
            <p>MATIC Balance: {formatBalance(apiData.result)} MATIC</p>
          </div>
            )}
        </div>
    );
};