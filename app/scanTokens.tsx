import { ChainId, Fetcher, Pair, Token, TokenAmount } from '@uniswap/sdk';
import { gql, request } from 'graphql-request';

import { JsonRpcProvider } from 'ethers';

const ethers = require('ethers');
const fs = require('fs');

const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/952063985f82462c88e42f4ed150b486");

  async function getPairInfo() {
    try{
        const USDC_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
        const ETH_ADDRESS = '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc';

        const USDC = new Token(ChainId.MAINNET, USDC_ADDRESS, 6, 'USDC', 'USD Coin');
        const ETH = new Token(ChainId.MAINNET, ETH_ADDRESS, 18, 'ETH', 'Ethereum');

        const pair = await Fetcher.fetchPairData(USDC, ETH);         
        const usdcName = USDC.name;
        const ethName = ETH.name;
        const ethPrice = pair.priceOf(USDC).toSignificant(6);

        const pairInfo = {
          token0: {
            name: usdcName,
            price: ethPrice
          },
          token1: {
            name: ethName,
            price: '1.0',
          },
        };
      
      console.log('USDC-ETH pair info:', pairInfo);
      return pairInfo;
    } catch (error) {
      console.error('Failed to retrieve liquidity positions:', error);
      throw error;
    }
}
getPairInfo();

