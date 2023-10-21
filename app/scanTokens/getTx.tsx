'use client'

import React, { useEffect, useState } from 'react';

import axios from 'axios';

const YourComponent = () => {
const [totalTransactions, setTotalTransactions] = useState(null);

useEffect(() => {
  // Function to fetch the transaction count
  const fetchTransactionCount = async () => {
    try {
      const response = await axios.get('https://api.polygonscan.com/api?module=account&action=balance&address=0x5A534988535cf27a70e74dFfe299D06486f185B7&apikey=YourApiKeyToken'); // Update with your actual API URL

      // Assuming the response.data contains the transaction count
      const transactionCount = response.data.totalTransactions; // Replace 'totalTransactions' with the actual field in the response

      setTotalTransactions(transactionCount);
    } catch (error) {
      console.error('Error fetching transaction count:', error);
    }
  };

  fetchTransactionCount();
}, []);
}