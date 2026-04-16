import * as SecureStore from 'expo-secure-store';

const WALLET_MNEMONIC_KEY = 'wallet_mnemonic';

export async function saveMnemonic(mnemonic: string): Promise<void> {
  await SecureStore.setItemAsync(WALLET_MNEMONIC_KEY, mnemonic);
}

export async function getMnemonic(): Promise<string | null> {
  return SecureStore.getItemAsync(WALLET_MNEMONIC_KEY);
}

export async function clearMnemonic(): Promise<void> {
  await SecureStore.deleteItemAsync(WALLET_MNEMONIC_KEY);
}
