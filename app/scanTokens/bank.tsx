"use client";

import "/app/globals.css";

import React, { useEffect, useRef, useState } from "react";
import { bankConfig, tokenConfig } from "./abi";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import { Input } from "@/components/ui/input";
import { parse } from "path";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

export const GetAddress: React.FC = () => {
  const [enteredAmount, setEnteredAmount] = useState<string>("");
  const tokenAddress = "0x02BdEE024e555Df8764F0157dCd2f64e121Bc769";
  const bankAddress = "0x0a6ab0B97550436D299F385572C6014Ccf4D55A2";
  const { address } = useAccount();

  const { write: writeApprove, isSuccess: isSuccessApprove } = useContractWrite(
    {
      address: "0x02BdEE024e555Df8764F0157dCd2f64e121Bc769",
      abi: tokenConfig.abi,
      functionName: "approve",
      args: [bankAddress, parseEther(enteredAmount)],
      account: address,
    }
  );

  const { write: writeMint, isSuccess: isSuccessMint } = useContractWrite({
    address: "0x02BdEE024e555Df8764F0157dCd2f64e121Bc769",
    abi: tokenConfig.abi,
    functionName: "mint",
    args: [address],
    account: address,
  });

  const { write: writeWithdraw, isSuccess: isSuccessWithdraw } =
    useContractWrite({
      address: "0x0a6ab0B97550436D299F385572C6014Ccf4D55A2",
      abi: bankConfig.abi,
      functionName: "withdraw",
      args: [parseEther("10000")],
      account: address,
    });

  const handleClickApprove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Write button clicked");
    writeApprove();
  };
  const handleClickMint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Mint button clicked");
    writeMint();
  };
  const handleClickWithdraw = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Withdraw button clicked");
    writeWithdraw();
  };

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
      <div className="text-lg w-44">
        <Input
          type="text"
          onChange={handleAmountChange}
          placeholder="Enter Amount"
        />
      </div>
      <div className="px-2 py-1 text-lg">
        <button onClick={handleClickApprove}>Approve</button>
        <br />
        <button onClick={handleClickMint}>Mint</button>
        <br />
        <button onClick={handleClickWithdraw}>Withdraw</button>
      </div>
    </div>
  );
};
