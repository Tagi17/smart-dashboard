'use client'

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { config } from 'dotenv';
import { useAccount } from 'wagmi'

// Load environment variables from the .env file
config();

interface TransactionData {
  // Define the properties of the transaction data
  // Make sure it matches the structure of the API response
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
}

interface ApiResponse {
  status: string;
  message: string;
  result: TransactionData[];
}

export const GetData = () => {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnecting, isDisconnected } = useAccount()

  useEffect(() => {
    const fetchData = async () => {
      const apiKey: string | undefined = process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY;

      if (!apiKey) {
        console.error('API key is not defined.');
        setError('API key defined');
        return;
      }
      setLoading(true);
      try {
        // Construct the API URL with the apiKey
        const apiUrl = `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`;
        // Make the API request
        const response = await axios.get<ApiResponse>(apiUrl);
        setApiData(response.data);
        console.log('API Response:', response.data);
      } catch (error: any) {
        console.error('Error making the API request:', error);
        setError(error.message || 'An error occured while fetching data');
      } finally {
        setLoading(false);
      }
    };
    
    if(address){
      fetchData();
    } else {
      setError('No address provided');
    }
  }, [address]);

  console.log("this is the current address:", address);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {apiData && apiData.result &&(
        <div>
          <p>{apiData.result.length}</p>
        </div>
      )}
      {!apiData && <p>No data available</p>}
    </div>
  );
};
