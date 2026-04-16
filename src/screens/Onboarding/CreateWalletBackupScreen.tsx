import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '@App/components/PrimaryButton';
import { useWallet } from '@App/context/WalletContext';
import type { RootStackParamList } from '@App/navigation/types';
import { generateMnemonic } from '@App/services/walletService';

type CreateWalletBackupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateWalletBackup'
>;

export function CreateWalletBackupScreen({
  navigation,
}: CreateWalletBackupScreenProps) {
  const { importWallet } = useWallet();
  const [mnemonic, setMnemonic] = useState(() => generateMnemonic());
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const words = useMemo(() => mnemonic.split(' '), [mnemonic]);

  async function handleConfirm() {
    setError(null);
    setIsConfirming(true);

    try {
      await importWallet(mnemonic);
    } catch {
      setError(
        'Unable to create wallet right now. Please regenerate and try again.'
      );
    } finally {
      setIsConfirming(false);
    }
  }

  function handleRegenerate() {
    if (isConfirming) {
      return;
    }

    setError(null);
    setMnemonic(generateMnemonic());
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.warningCard}>
        <Text style={styles.kicker}>STEP 1 OF 2</Text>
        <Text style={styles.title}>Back Up Your 12 Words</Text>
        <Text style={styles.subtitle}>
          Write these words in order and keep them offline. You will need them
          to recover your wallet.
        </Text>
      </View>

      <View style={styles.wordsCard}>
        <View style={styles.wordsGrid}>
          {words.map((word, index) => (
            <View key={`${word}-${index}`} style={styles.wordChip}>
              <Text style={styles.wordIndex}>{index + 1}</Text>
              <Text style={styles.wordText}>{word}</Text>
            </View>
          ))}
        </View>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.actions}>
        <PrimaryButton
          label="Regenerate Phrase"
          onPress={handleRegenerate}
          variant="secondary"
          disabled={isConfirming}
        />
        <PrimaryButton
          label="I Backed It Up, Continue"
          onPress={() => {
            void handleConfirm();
          }}
          loading={isConfirming}
        />
        <PrimaryButton
          label="Back"
          onPress={() => navigation.goBack()}
          variant="secondary"
          disabled={isConfirming}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 10,
  },
  container: {
    backgroundColor: '#eef3f8',
    flexGrow: 1,
    gap: 14,
    padding: 16,
    paddingBottom: 26,
  },
  errorText: {
    color: '#be123c',
    fontSize: 14,
    lineHeight: 21,
  },
  kicker: {
    color: '#991b1b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  subtitle: {
    color: '#7f1d1d',
    fontSize: 15,
    lineHeight: 22,
  },
  title: {
    color: '#991b1b',
    fontSize: 28,
    fontWeight: '800',
  },
  warningCard: {
    backgroundColor: '#fff7f7',
    borderColor: '#fecaca',
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  wordChip: {
    backgroundColor: '#f8fafc',
    borderColor: '#d9e2ef',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    minWidth: '47%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  wordIndex: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '700',
    minWidth: 18,
  },
  wordText: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '600',
  },
  wordsCard: {
    backgroundColor: '#ffffff',
    borderColor: '#d9e2ef',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  wordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
});
