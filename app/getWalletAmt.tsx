'use client'

import React, { useEffect, useState } from 'react';
import {ethereumTokens, polygonTokens} from './tokenDetails';
import { useAccount, useContractRead, useNetwork } from 'wagmi';

export const GetWalletAmount = () => {
    const [balances, setBalances] = useState();
    const { address } = useAccount()

        useEffect(() => {
            if (!address) return;
            
            const FetchBalances = async () => {
                const newBalances = {};
                for (const [name, token] of Object.entries(ethereumTokens)){
                   const {data: balance} = useContractRead({
                    address: token.address,
                    contractInterface: token.abi,
                    functionName: 'balanceOf',
                    args: [address],
                    watch: true,
                   });
                   if (balance){
                        newBalances[name] = balance.toString();
                   }  
                }
                setBalances(newBalances);
            };
            
            FetchBalances();
        },[address]);

        return (
            <div>
                
            </div>
        )
    }