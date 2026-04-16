import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { PrimaryButton } from '@App/components/PrimaryButton';
import { useWallet } from '@App/context/WalletContext';
import type { RootStackParamList } from '@App/navigation/types';
import {
  getMnemonicWordCount,
  isSupportedMnemonicWordCount,
} from '@App/utils/validation';

type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const { importWallet } = useWallet();

  const [mnemonicInput, setMnemonicInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const wordCount = getMnemonicWordCount(mnemonicInput);

  function handleCreateWallet() {
    setError(null);
    navigation.navigate('CreateWalletBackup');
  }

  async function handleImportWallet() {
    setError(null);
    setIsImporting(true);

    try {
      await importWallet(mnemonicInput);
      setMnemonicInput('');
    } catch (walletError) {
      if (walletError instanceof Error) {
        setError(walletError.message);
      } else {
        setError('Unable to import wallet. Please check the seed phrase and try again.');
      }
    } finally {
      setIsImporting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.keyboardContainer}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.heroCard}>
          <Text style={styles.kicker}>SELF-CUSTODY ETH WALLET</Text>
          <Text style={styles.title}>Mini Trust Wallet</Text>
          <Text style={styles.subtitle}>
            Create a new wallet or import your existing recovery phrase in seconds.
          </Text>
        </View>

        <View style={styles.section}>
          <PrimaryButton
            label="Create New Wallet"
            onPress={handleCreateWallet}
            disabled={isImporting}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Import Existing Wallet</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            multiline
            onChangeText={setMnemonicInput}
            placeholder="Enter your 12- or 24-word recovery phrase"
            placeholderTextColor="#64748b"
            style={styles.textInput}
            value={mnemonicInput}
          />
          <Text style={styles.helperText}>
            {wordCount > 0
              ? `Detected ${wordCount} words (${isSupportedMnemonicWordCount(wordCount) ? 'supported length' : 'use 12 or 24 words'})`
              : 'Seed phrases must be exactly 12 or 24 words'}
          </Text>
          <PrimaryButton
            label="Import Wallet"
            onPress={handleImportWallet}
            loading={isImporting}
            disabled={!mnemonicInput.trim()}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef3f8',
    flexGrow: 1,
    gap: 20,
    padding: 20,
    paddingTop: 42,
  },
  divider: {
    backgroundColor: '#d7e0eb',
    height: 1,
    width: '100%',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '500',
  },
  heroCard: {
    backgroundColor: '#0b1730',
    borderRadius: 18,
    gap: 10,
    padding: 18,
  },
  kicker: {
    color: '#93c5fd',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  helperText: {
    color: '#64748b',
    fontSize: 13,
    marginBottom: 10,
  },
  keyboardContainer: {
    backgroundColor: '#eef3f8',
    flex: 1,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: '#bfdbfe',
    fontSize: 15,
    lineHeight: 22,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderColor: '#d0dae7',
    borderRadius: 14,
    borderWidth: 1,
    color: '#0f172a',
    fontSize: 15,
    minHeight: 130,
    padding: 12,
    textAlignVertical: 'top',
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
  },
});
