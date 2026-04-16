import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useWallet } from '@App/context/WalletContext';

export function SeedPhraseRevealScreen() {
  const { getStoredMnemonic } = useWallet();
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMnemonic() {
      try {
        const phrase = await getStoredMnemonic();
        if (!phrase) {
          setError('Seed phrase not found. Import or create a wallet first.');
          return;
        }

        setMnemonic(phrase);
      } catch {
        setError('Unable to reveal seed phrase.');
      } finally {
        setIsLoading(false);
      }
    }

    void loadMnemonic();
  }, [getStoredMnemonic]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" color="#111827" />
          <Text style={styles.stateText}>Loading seed phrase...</Text>
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.phraseCard}>
          <View style={styles.banner}>
            <Text style={styles.bannerText}>HIGHLY SENSITIVE</Text>
          </View>
          <Text style={styles.title}>Your Recovery Phrase</Text>
          <Text style={styles.warningText}>
            Write these words down in order and keep them offline. Do not share screenshots.
          </Text>
          <View style={styles.phraseContainer}>
            <Text selectable style={styles.mnemonicText}>
              {mnemonic}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef3f8',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  banner: {
    alignSelf: 'flex-start',
    backgroundColor: '#fee2e2',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  bannerText: {
    color: '#991b1b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 15,
    lineHeight: 22,
  },
  mnemonicText: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.2,
    lineHeight: 32,
  },
  phraseContainer: {
    backgroundColor: '#f8fafc',
    borderColor: '#dbe5f1',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  phraseCard: {
    backgroundColor: '#ffffff',
    borderColor: '#d9e2ef',
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    padding: 18,
  },
  stateContainer: {
    alignItems: 'center',
    gap: 10,
  },
  stateText: {
    color: '#334155',
    fontSize: 15,
  },
  title: {
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '800',
  },
  warningText: {
    color: '#7f1d1d',
    fontSize: 14,
    lineHeight: 21,
  },
});
