import { ethers } from 'ethers';
import {
  getMnemonicWordCount,
  isSupportedMnemonicWordCount,
  normalizeMnemonicInput,
} from '@App/utils/validation';

export const ETH_DERIVATION_PATH = "m/44'/60'/0'/0/0";
export const DERIVATION_FIXTURE_MNEMONIC =
  'test test test test test test test test test test test junk';
export const DERIVATION_FIXTURE_ADDRESS =
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

export type WalletDetails = {
  mnemonic: string;
  address: string;
};

// Generate a standard 12-word mnemonic
export function generateMnemonic(): string {
  return ethers.Wallet.createRandom().mnemonic!.phrase;
}

// Validate mnemonic (12 or 24 words + BIP39 correctness)
export function validateMnemonic(mnemonic: string): boolean {
  const normalizedMnemonic = normalizeMnemonicInput(mnemonic);
  const wordCount = getMnemonicWordCount(normalizedMnemonic);

  if (!isSupportedMnemonicWordCount(wordCount)) {
    return false;
  }

  return ethers.Mnemonic.isValidMnemonic(normalizedMnemonic);
}

// Derive Ethereum address using strict BIP44 path
export function deriveAddressFromMnemonic(mnemonic: string): string {
  const normalizedMnemonic = normalizeMnemonicInput(mnemonic);

  if (!validateMnemonic(normalizedMnemonic)) {
    throw new Error(
      'Invalid mnemonic. Please enter a valid 12 or 24 word seed phrase.'
    );
  }

  const rootWallet = ethers.HDNodeWallet.fromPhrase(
    normalizedMnemonic,
    undefined,
    'm'
  );
  const wallet = rootWallet.derivePath(ETH_DERIVATION_PATH);
  return ethers.getAddress(wallet.address); // EIP-55 checksum
}

// Create new wallet
export function createWallet(): WalletDetails {
  const mnemonic = generateMnemonic();
  const address = deriveAddressFromMnemonic(mnemonic);

  return {
    mnemonic,
    address,
  };
}

// Import wallet from mnemonic
export function importWallet(mnemonic: string): WalletDetails {
  const normalizedMnemonic = normalizeMnemonicInput(mnemonic);

  if (!validateMnemonic(normalizedMnemonic)) {
    throw new Error(
      'Invalid mnemonic. Please enter a valid 12 or 24 word seed phrase.'
    );
  }

  const address = deriveAddressFromMnemonic(normalizedMnemonic);

  return {
    mnemonic: normalizedMnemonic,
    address,
  };
}
