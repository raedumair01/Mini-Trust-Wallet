import { ethers } from 'ethers';

let provider: ethers.JsonRpcProvider | null = null;

function getRpcUrl(): string {
  const envRpcUrl =
    process.env.EXPO_PUBLIC_ETH_RPC_URL ?? process.env.ETH_RPC_URL;

  if (!envRpcUrl || !envRpcUrl.trim()) {
    throw new Error(
      'RPC URL is missing. Add EXPO_PUBLIC_ETH_RPC_URL to your .env file.'
    );
  }

  return envRpcUrl.trim();
}

export function getProvider(): ethers.JsonRpcProvider {
  if (!provider) {
    provider = new ethers.JsonRpcProvider(getRpcUrl());
  }

  return provider;
}

export async function fetchEthBalance(address: string): Promise<string> {
  const checksumAddress = ethers.getAddress(address);
  const balanceInWei = await getProvider().getBalance(checksumAddress);
  return ethers.formatEther(balanceInWei);
}
