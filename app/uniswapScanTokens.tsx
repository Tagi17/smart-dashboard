import { Fetcher, Pair, Token, TokenAmount } from '@uniswap/sdk';
import { JsonRpcProvider, ethers } from 'ethers';
import { gql, request } from 'graphql-request';

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
    this.provider = new ethers.providers.JsonRpcProvider(providerUrl);
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
          const { pair } = position;
          const token0 = new Token(pair.token0.address, pair.token0.symbol, pair.token0.decimals);
          const token1 = new Token(pair.token1.address, pair.token1.symbol, pair.token1.decimals);

          const pairTokens = new Pair(token0, token1);

          const provider = new ethers.providers.JsonRpcProvider();
          const walletAddress = await this.getConnectedWalletAddress();
          const signer = provider.getSigner(walletAddress);

          const [token0Balance, token1Balance] = await Promise.all([
            Fetcher.fetchTokenBalance(this.provider, token0.address, walletAddress),
            Fetcher.fetchTokenBalance(this.provider, token1.address, walletAddress),
          ]);

          return {
            ...position,
            pair: {
              ...pair,
              token0: {
                ...pair.token0,
                balance: new TokenAmount(token0, token0Balance),
              },
              token1: {
                ...pair.token1,
                balance: new TokenAmount(token1, token1Balance),
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
