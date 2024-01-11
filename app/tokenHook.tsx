'use client'

import {ethereumTokens, polygonTokens} from './tokenDetails';
import { useAccount, useContractRead, useContractReads, useNetwork } from 'wagmi';

export const useFetchBalances = (address: string) => {
    const balances = Object.entries(ethereumToken).map(([name, token]) => {
        const { data: balance} = useContractReads({
            address: token.address,
            contractInterface: token.abi,
            functionName: 'balanceOf',
            args: [address],
        });
        return { name, balance };
    });
    return balances;
}