import {ethereumTokens, polygonTokens} from './tokenDetails';

type TokenDetails = {
 address: string;
 abi: any[];
}
type Tokens = {
    [key: string]: TokenDetails;
}
export const fetchEthereumBalance = async (tokenName: keyof typeof ethereumTokens, userAdress: string) => {
    const token = ethereumTokens[tokenName];
}
export const fetchPolygonBalance = async (tokenName: keyof typeof polygonTokens, userAdress: string) => {
    const token = polygonTokens[tokenName];
}