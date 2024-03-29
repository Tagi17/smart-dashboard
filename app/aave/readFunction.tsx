"use client";

import "/app/globals.css";

import React, { useEffect, useRef, useState } from "react";
import { USDCConfig, aavePoolConfig } from './abiAave';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import { Input } from "@/components/ui/input";
import {mumbaiPolygonTestnet} from "../rainbowKit";
import { parse } from "path";
import { parseEther } from "viem";
import { parseUnits } from "@ethersproject/units";
import { useAccount } from "wagmi";

export const WriteFunctions: React.FC = () => {
  
  const [enteredSupplyAmount, setEnteredSupplyAmount] = useState<string>("");
  const [enteredWithdrawAmount, setEnteredWithdrawAmount] = useState<string>("");
  const [enteredApproveAmount, setEnteredApproveAmount] = useState<string>("");

  const parsedSupplyAmount = parseUnits(enteredSupplyAmount || "0", 18);
  const parsedWithdrawAmount = parseUnits(enteredWithdrawAmount || "0", 6); // Assuming USDC for this example
  const parsedApproveAmount = parseUnits(enteredApproveAmount || "1000", 6);
  
    const aavePoolAddress = "0x794a61358D6845594F94dc1DB02A252b5b4814aD";
    const USDCAddress = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
    const bridgedUSDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
    const amUSDCAddress = "0x1a13F4Ca1d028320A707D99520AbFefca3998b7F";
    const { address } = useAccount();
  
  
    const { write: writeSupply, isSuccess: isSuccessSupply} = useContractWrite({
        address: aavePoolAddress,
        abi: aavePoolConfig,
        functionName: "supply",
        args: [USDCAddress, parsedSupplyAmount, address, 0],
        account: address,
    })
    const { write: writeWithdraw, isSuccess: isSuccessWithdraw} = useContractWrite({
        address: aavePoolAddress,
        abi: aavePoolConfig,
        functionName: "withdraw",
        args: [USDCAddress, parsedWithdrawAmount, address],
        account: address,
    })
    
    const { write: writeApprove, isSuccess: isSuccessApprove } = useContractWrite({
        address: USDCAddress,
        abi: USDCConfig.abi,
        functionName: "approve",
        args: [aavePoolAddress, parsedApproveAmount],
        account: address,
    })
    const { data, isError, isLoading} = useContractRead({
        address: USDCAddress,
        abi: USDCConfig.abi,
        functionName: "balanceOf",
        args: [address],
        account: address,
    })
  
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
      let inputValue = event.target.value;
      
      inputValue = inputValue.replace(/^0+|[^0-9.]/g, '');
      
      const split = inputValue.split('.');
      if (split.length > 2) {
          inputValue = split[0] + '.' + split[1];
      }
      if (inputValue === "" || inputValue === "." || !isNaN(parseFloat(inputValue))) {
          setState(inputValue);
      }
  };
  
  
  return (
    <div>
      <div className="text-lg w-44 py-2">
        <Input type="text" value={enteredSupplyAmount} onChange={(e) => setEnteredSupplyAmount(e.target.value)} placeholder="Enter Amount to Supply to Aave" />
      </div>
      <div className="text-lg w-44 py-2">
        <Input type="text" value={enteredWithdrawAmount} onChange={(e) => setEnteredWithdrawAmount(e.target.value)} placeholder="Enter Amount to Approve" />
      </div>
      <div className="text-lg w-44 py-2">
        <Input type="text" value={enteredApproveAmount} onChange={(e) => setEnteredApproveAmount(e.target.value)} placeholder="Enter Amount to Withdraw to Aave" />
      </div>
      <div className="text-lg">
        <button onClick={() => enteredApproveAmount && writeApprove()}>Approve USDC to Aave</button>
        {isSuccessApprove && <p>Approve Successful!</p>}
        <br/>
        <button onClick={() => writeSupply()}>Supply to Aave</button>
        {isSuccessSupply && <p>Supply Successful!</p>}
      <br/>
        <button onClick={() => writeWithdraw()}>Withdraw to Aave</button>
        {isSuccessWithdraw && <p>Withdrawal Successful!</p>}
      </div>
      </div>
    );
};
    