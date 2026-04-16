import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { PrimaryButton } from '@App/components/PrimaryButton';
import { Snackbar } from '@App/components/Snackbar';
import { useWallet } from '@App/context/WalletContext';
import type { RootStackParamList } from '@App/navigation/types';
import { fetchEthBalance } from '@App/services/rpcService';

type WalletScreenProps = NativeStackScreenProps<RootStackParamList, 'Wallet'>;

export function WalletScreen({ navigation }: WalletScreenProps) {
  const { address } = useWallet();

  const [balance, setBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  async function loadBalance() {
    if (!address) {
      return;
    }

    setIsLoadingBalance(true);
    setBalanceError(null);

    try {
      const ethBalance = await fetchEthBalance(address);
      setBalance(ethBalance);
    } catch {
      setBalanceError(
        'Unable to fetch ETH balance. Check EXPO_PUBLIC_ETH_RPC_URL and your internet connection.'
      );
    } finally {
      setIsLoadingBalance(false);
    }
  }

  useEffect(() => {
    void loadBalance();
  }, [address]);

  if (!address) {
    return null;
  }

  const shortAddress = `${address.slice(0, 8)}...${address.slice(-6)}`;
  const displayBalance = balance ?? '0.0';

  async function handleCopyAddress() {
    if (!address) {
      return;
    }

    await Clipboard.setStringAsync(address);
    setSnackbarMessage('Address copied to clipboard');
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>Main Wallet</Text>
        <Text style={styles.heroBalance}>{displayBalance} ETH</Text>
        <Text style={styles.heroAddress}>{shortAddress}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.label}>Ethereum Address</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>MAINNET</Text>
          </View>
        </View>
        <Text selectable style={styles.address}>
          {address}
        </Text>
        <View style={styles.qrWrapper}>
          <View style={styles.qrContainer}>
            <QRCode value={address} size={186} />
          </View>
        </View>
        <PrimaryButton label="Copy Address" onPress={handleCopyAddress} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>ETH Balance</Text>
        {isLoadingBalance ? (
          <View style={styles.row}>
            <ActivityIndicator size="small" color="#111827" />
            <Text style={styles.loadingText}>Loading balance...</Text>
          </View>
        ) : balanceError ? (
          <View style={styles.balanceState}>
            <Text style={styles.errorText}>{balanceError}</Text>
            <PrimaryButton label="Retry Balance Fetch" onPress={() => void loadBalance()} />
          </View>
        ) : (
          <Text style={styles.balanceValue}>{displayBalance} ETH</Text>
        )}
      </View>

      <PrimaryButton label="Refresh Balance" onPress={() => void loadBalance()} loading={isLoadingBalance} />
      <PrimaryButton label="Settings" onPress={() => navigation.navigate('Settings')} variant="secondary" />

      <Snackbar
        message={snackbarMessage ?? ''}
        visible={Boolean(snackbarMessage)}
        onDismiss={() => setSnackbarMessage(null)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  address: {
    color: '#0f172a',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 4,
  },
  badge: {
    backgroundColor: '#dbeafe',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    color: '#1d4ed8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  balanceState: {
    gap: 12,
  },
  balanceValue: {
    color: '#0f172a',
    fontSize: 34,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#d9e2ef',
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    padding: 18,
    width: '100%',
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: '#eef3f8',
    flexGrow: 1,
    gap: 16,
    padding: 16,
    paddingBottom: 26,
  },
  errorText: {
    backgroundColor: '#fff1f2',
    borderColor: '#fecdd3',
    borderRadius: 12,
    borderWidth: 1,
    color: '#be123c',
    fontSize: 14,
    lineHeight: 21,
    padding: 12,
  },
  heroAddress: {
    color: '#bfdbfe',
    fontSize: 13,
    letterSpacing: 0.3,
  },
  heroBalance: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
  },
  heroCard: {
    backgroundColor: '#0b1730',
    borderRadius: 18,
    gap: 6,
    padding: 18,
  },
  heroLabel: {
    color: '#93c5fd',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  label: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '700',
  },
  loadingText: {
    color: '#334155',
    fontSize: 15,
  },
  qrContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#dbe5f1',
    borderRadius: 14,
    borderWidth: 1,
    padding: 10,
  },
  qrWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
