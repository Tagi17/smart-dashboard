'use client'
// import {apiKey} from "../env";

// https://api.polygonscan.com/api
//    ?module=account
//    &action=balancemulti
//    &address=0x5A534988535cf27a70e74dFfe299D06486f185B7,0x54bA15efe1b6D886bA4Cd5C5837240675BD0D43a,0x39842a0Fe638cc956b76A49E918c30d818708BA0
//    &tag=latest
//    &apikey=apiKey

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { config } from 'dotenv';

// Load environment variables from the .env file
config();

interface AddressData{
  address: string;
  txCount: number;
}
interface ApiResponse{
  status: string;
  message: string;
  result: AddressData[];
}
export const GetData = () => {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);

// Define and export the environment variable
  useEffect(() =>{
    const fetchData = async () => {
    const apiKey: string | undefined = process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY;
      
    if (!apiKey) {
      console.error('API key is not defined.');
      return;
    }
    try {
      // Construct the API URL with the apiKey
      const apiUrl = `https://api.polygonscan.com/api?module=account&action=balancemulti&address=0x5A534988535cf27a70e74dFfe299D06486f185B7,0x54bA15efe1b6D886bA4Cd5C5837240675BD0D43a,0x39842a0Fe638cc956b76A49E918c30d818708BA0&tag=latest&apikey=${apiKey}`;
      // Make the API request
      const response = await axios.get(apiUrl);
      setApiData(response.data);
      // Handle the API response
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error making the API request:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {apiData && (
        <div>
          <p>{apiData.result.length}</p>
        <div>
          {apiData.result.map((entry: AddressData, index: number) => (
            <div key={index}>
              {/* Address: {entry.address} */}
              <br/>
              {entry.txCount}
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};


