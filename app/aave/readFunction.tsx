"use client";

import "/app/globals.css";

import React, { useEffect, useRef, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import { Input } from "@/components/ui/input";
import { aavePoolConfig } from './abiAave';
import { parse } from "path";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

export const WriteFunctions: React.FC = () => {
    
    const aavePool = "0x794a61358D6845594F94dc1DB02A252b5b4814aD";
    const USDC = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
    const bridgedUSDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
    const amUSDC = "0x1a13F4Ca1d028320A707D99520AbFefca3998b7F";
    const { address } = useAccount();

    const { write: writeSupply, isSuccess: isSuccessSupply} = useContractWrite({
        address: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        abi: aavePoolConfig,
        functionName: "supply",
        args: [address],
        account: address,
    })
    
};
    