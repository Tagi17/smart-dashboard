import { ChainId, Fetcher, Pair, Token, TokenAmount } from '@uniswap/sdk';
import { gql, request } from 'graphql-request';

import { JsonRpcProvider } from 'ethers';

const ethers = require('ethers');
const fs = require('fs');

export interface LiquidityPosition {
  liquidityTokenBalance: string;
  pair: {
    token0: {
      symbol: string;
      address: string;
      abi: any; 
    };
    token1: {
      symbol: string;
      address: string;
      abi: any; 
    };
  };
}

export interface LiquidityPositionsData {
  liquidityPositions: LiquidityPosition[];
}

export interface UniswapDataProvider {
  getConnectedWalletAddress(): Promise<string>;
  getLiquidityPositions(walletAddress: string): Promise<LiquidityPosition[]>;
}

class UniswapDataProviderImpl implements UniswapDataProvider {
  private readonly GRAPH_API_ENDPOINT: string;
  private readonly provider: JsonRpcProvider;

  constructor(graphApiEndpoint: string, providerUrl: string) {
    this.GRAPH_API_ENDPOINT = graphApiEndpoint;
    this.provider = new JsonRpcProvider(providerUrl);
  }

  async getConnectedWalletAddress(): Promise<string> {
    const signer = await this.provider.getSigner();
    const walletAddress = await signer.getAddress();
    return walletAddress;
  }

  async getLiquidityPositions(walletAddress: string): Promise<LiquidityPosition[]> {
    const query = gql`
      query GetLiquidityPositions($walletAddress: String!) {
        liquidityPositions(where: { user: $walletAddress }) {
          liquidityTokenBalance
          pair {
            token0 {
              symbol
              address
              abi
            }
            token1 {
              symbol
              address
              abi
            }
          }
        }
      }
    `;

    const variables = {
      walletAddress: walletAddress.toLowerCase(),
    };

    try {
      const data = await request<LiquidityPositionsData>(this.GRAPH_API_ENDPOINT, query, variables);
      const liquidityPositions = data.liquidityPositions;

      const positionsWithBalances = await Promise.all(
        liquidityPositions.map(async (position) => {
          const USDC = new Token(ChainId.MAINNET, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', 18, 'USDC', 'USD Coin');
          const ETH = new Token(ChainId.MAINNET, '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc', 18, 'ETH', 'Ethereum');

          const pair = await Fetcher.fetchPairData(USDC, ETH);
          
          
          const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/952063985f82462c88e42f4ed150b486");
          const walletAddress = await this.getConnectedWalletAddress();
          const signer = provider.getSigner(walletAddress);

          const [USDCBalance, ETHBalance] = await Promise.all([
            Fetcher.fetchTokenData(this.provider, USDC.address, walletAddress),
            Fetcher.fetchTokenData(this.provider, ETH.address, walletAddress),
          ]);

          return {
            ...position,
            pair: {
              ...pair,
              USDC: {
                ...pair.USDC,
                balance: new TokenAmount(USDC, USDCBalance),
              },
              ETH: {
                ...pair.ETH,
                balance: new TokenAmount(ETH, ETHBalance),
              },  
            },
          };
        })
      );

      return positionsWithBalances;
    } catch (error) {
      console.error('Failed to retrieve liquidity positions:', error);
      throw error;
    }
  }
}

export default UniswapDataProviderImpl;
