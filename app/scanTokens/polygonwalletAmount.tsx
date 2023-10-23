'use client'

import React, { useEffect, useState } from 'react';

import { Wallet } from 'lucide-react';
import axios from 'axios';
import { config } from 'dotenv';
import {fetchAddress} from './getAddy';
import { walletActions } from 'viem';

interface AddressData{
    address: string;
    balance: number;
  }
  interface ApiResponse{
    status: string;
    message: string;
    result: AddressData;
  }

export const GetWalletAmount = () => {
    const [apiData, setApiData] = useState<ApiResponse | null>(null);
    const [walletClient, setWalletClient] = useState<any>(null);

        const getAddressAndSetApiData = async (walletClient: any) => {
        const tempAddy = await fetchAddress(walletClient);
            try{
                const apiKey: string | undefined = process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY;
                if(!apiKey) {
                    console.error("apiKey not initialized");
                    return;
                }
                const apiUrl = `https://api.polygonscan.com/api?module=account&action=balance&address=${tempAddy}&tag=latest&apikey=${apiKey}`;
                const response = await axios.get(apiUrl);
                setApiData(response.data);
                console.log("Api Data", setApiData);
                console.log("API Response", apiData);
                console.log("Balance", apiData?.result?.balance);
                } catch (error){
                console.log("Error making the request", error);
                }
            };
            useEffect(() => {
                getAddressAndSetApiData(walletClient);
             }, []);
        let totalWalletAmount = 0;
        if (apiData && apiData.result && apiData.result.balance !== undefined){
            totalWalletAmount = parseFloat(apiData.result.balance.toString());
            console.log(totalWalletAmount);
        }
    return (
        <div>
            {apiData && (
                <div>
                     <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'MTC' }).format(totalWalletAmount)}</p>
                </div>
            )}
        </div>
    );
};