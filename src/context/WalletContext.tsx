import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  importWallet as importWalletFromMnemonic,
  createWallet as createWalletFromMnemonic,
} from '@App/services/walletService';
import {
  clearMnemonic,
  getMnemonic,
  saveMnemonic,
} from '@App/storage/secureStorage';

type WalletContextValue = {
  address: string | null;
  isReady: boolean;
  createWallet: () => Promise<void>;
  importWallet: (mnemonic: string) => Promise<void>;
  getStoredMnemonic: () => Promise<string | null>;
  resetWallet: () => Promise<void>;
};

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

type WalletProviderProps = {
  children: React.ReactNode;
};

export function WalletProvider({ children }: WalletProviderProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function bootstrapWallet() {
      try {
        const storedMnemonic = await getMnemonic();
        if (!storedMnemonic) {
          setAddress(null);
          return;
        }

        const wallet = importWalletFromMnemonic(storedMnemonic);
        setAddress(wallet.address);
      } catch {
        await clearMnemonic();
        setAddress(null);
      } finally {
        setIsReady(true);
      }
    }

    void bootstrapWallet();
  }, []);

  async function createWallet() {
    const wallet = createWalletFromMnemonic();
    await saveMnemonic(wallet.mnemonic);
    setAddress(wallet.address);
  }

  async function importWallet(mnemonic: string) {
    const wallet = importWalletFromMnemonic(mnemonic);
    await saveMnemonic(wallet.mnemonic);
    setAddress(wallet.address);
  }

  async function getStoredMnemonic() {
    return getMnemonic();
  }

  async function resetWallet() {
    await clearMnemonic();
    setAddress(null);
  }

  const value: WalletContextValue = {
    address,
    isReady,
    createWallet,
    importWallet,
    getStoredMnemonic,
    resetWallet,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): WalletContextValue {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }

  return context;
}
