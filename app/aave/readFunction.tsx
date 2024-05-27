"use client";

import "/app/globals.css";

import React, { useEffect, useRef, useState } from "react";
import { USDCConfig, aavePoolConfig } from "./abiAave";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseEther } from "viem";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";

export const WriteFunctions: React.FC = () => {
  const [enteredAmount, setEnteredAmount] = useState<string>("");
  const [enteredSupplyAmount, setEnteredSupplyAmount] = useState<string>("");
  const [enteredWithdrawAmount, setEnteredWithdrawAmount] = useState<string>("");
  const [enteredApproveAmount, setEnteredApproveAmount] = useState<string>("");
  const [enteredApproveAmountAave, setEnteredApproveAmountAave] = useState<string>("");
  const [balanceData, setbalanceData] = useState<string>("");

  const parsedSupplyAmountUnits = parseUnits(enteredAmount || "0", 6);
  const parsedSupplyAmount = parseEther(enteredSupplyAmount || "0");
  const parsedWithdrawAmount = parseUnits(enteredWithdrawAmount || "0", 6);
  const parsedApproveAmount = parseUnits(enteredApproveAmount || "0", 6);
  // const parseDataBalance = parseUnits(balanceData || "0", 6);
  

  const aavePoolAddress = "0x794a61358D6845594F94dc1DB02A252b5b4814aD";
  const USDCAddress = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
  const bridgedUSDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const amUSDCAddress = "0x1a13F4Ca1d028320A707D99520AbFefca3998b7F";
  const aPolUSDCn = "0xA4D94019934D8333Ef880ABFFbF2FDd611C762BD";
  
  const { address } = useAccount();

  const { write: writeSupply, isSuccess: isSuccessSupply } = useContractWrite({
    address: aavePoolAddress,
    abi: aavePoolConfig,
    functionName: "supply",
    args: [USDCAddress, parsedSupplyAmountUnits, address, 0],
    account: address,
  });
  const { write: writeApprove, isSuccess: isSuccessApprove } = useContractWrite({
      address: USDCAddress,
      abi: USDCConfig.abi,
      functionName: "approve",
      args: [aavePoolAddress, parsedApproveAmount],
      account: address,
      onError: (error) => console.error("Approve error:", error),
    });
  const { write: writeApproveaPolUSDCn, isSuccess: isSuccessApproveaPolUSDCn } = useContractWrite({
      address: aPolUSDCn,
      abi: USDCConfig.abi,
      functionName: "approve",
      args: [aavePoolAddress, parsedWithdrawAmount],
      account: address,
      onError: (error) => console.error("Approve error:", error),
    });
  const { write: writeWithdraw, isSuccess: isSuccessWithdraw } = useContractWrite({
    address: aavePoolAddress,
    abi: aavePoolConfig,
    functionName: "withdraw",
    args: [USDCAddress, parsedWithdrawAmount, address],
    account: address,
  });
  const {data: dataBalance, isError: errorBalance, isLoading: loadingBalance} = useContractRead({
    address: USDCAddress,
    abi: USDCConfig.abi,
    functionName: "balanceOf",
    args: [address],
    account: address,
    enabled: true,
  });
  const formattedBalance = dataBalance ? (Number(dataBalance) / 1e6).toFixed(6) : "0.000000";
  
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      setEnteredAmount(inputValue.toString());
    } else {
      setEnteredAmount("");
    }
  };
  return (
    <div>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: "repeat(2, minmax(0, max-content))" }}
      >
        <div>
          <div className="text-lg w-44 py-2">
            {/* <Input type="text" value={enteredSupplyAmount} onChange={(e) => setEnteredSupplyAmount(e.target.value)} placeholder="Enter USDC to Supply to Aave" /> */}
            <Input
              type="text"
              onChange={handleAmountChange}
              placeholder="Enter USDC to Supply to Aave"
            />
          </div>
          <div className="text-lg w-44 py-2">
            <Input type="text" value={enteredApproveAmount}
              onChange={(e) => setEnteredApproveAmount(e.target.value)}
              placeholder="Enter Amount to Approve"
            />
          </div>
          <div className="text-lg w-44 py-2">
            <Input
              type="text"
              value={enteredWithdrawAmount}
              onChange={(e) => setEnteredWithdrawAmount(e.target.value)}
              placeholder="Enter Amount to Withdraw"
            />
          </div>

    
        </div>
        <div className="">
          <div className="text-lg py-2 ">
            <Button variant="outline" onClick={() => writeSupply()}>
              Supply to Aave
            </Button>
            {isSuccessSupply && <p>Supply Successful!</p>}
          </div>
          <div className="text-lg py-2 ">
            <Button
              variant="outline"
              onClick={() => enteredApproveAmount && writeApprove()}
            >
              Approve USDC to Aave
            </Button>
            {isSuccessApprove && <p>Approve Successful!</p>}
          </div>
          <div className="text-lg py-2 ">
            <Button
              variant="outline"
              onClick={() => enteredWithdrawAmount && writeApproveaPolUSDCn()}
            >
              Approve aPOLUSDCn
            </Button>
            {isSuccessApproveaPolUSDCn && <p>Approve Successful!</p>}
          </div>

          <div className="text-lg py-2 ">
            <Button variant="outline" onClick={() => writeWithdraw()}>
              Withdraw to Aave
            </Button>
            {isSuccessWithdraw && <p>Withdrawal Successful!</p>}
          </div>
        </div>
      </div>

      <div className="text-lg py-2">
        <Button
          variant="outline"
          onClick={() => balanceData && dataBalance?.toString()}
        >
          Get USDC Balance
        </Button>
      </div>
      {
        balanceData.toString()
    }
      <div>Balance: {formattedBalance} USDC</div>
    </div>
  );
};
