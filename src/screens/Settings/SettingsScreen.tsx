import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ConfirmActionModal } from '@App/components/ConfirmActionModal';
import { PrimaryButton } from '@App/components/PrimaryButton';
import { useWallet } from '@App/context/WalletContext';
import type { RootStackParamList } from '@App/navigation/types';

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { resetWallet } = useWallet();
  const [isResetting, setIsResetting] = useState(false);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);

  function handleResetWallet() {
    setIsResetModalVisible(true);
  }

  async function confirmResetWallet() {
    setIsResetting(true);

    try {
      await resetWallet();
    } finally {
      setIsResetting(false);
      setIsResetModalVisible(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.securityCard}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SECURITY FIRST</Text>
        </View>
        <Text style={styles.title}>Protect Your Recovery Phrase</Text>
        <Text style={styles.description}>
          Keep your seed phrase offline. Never share it in chat, screenshots, or cloud notes.
        </Text>
        <View style={styles.ruleList}>
          <Text style={styles.ruleItem}>- Anyone with your phrase can drain funds instantly.</Text>
          <Text style={styles.ruleItem}>- This app never asks for your phrase in support chats.</Text>
          <Text style={styles.ruleItem}>- Store a paper backup in a safe place.</Text>
        </View>
      </View>

      <View style={styles.actionCard}>
        <Text style={styles.actionTitle}>Sensitive Actions</Text>
        <Text style={styles.actionSubtitle}>
          Review warnings before revealing or resetting wallet data.
        </Text>
        <View style={styles.actions}>
          <PrimaryButton
            label="Reveal Seed Phrase"
            onPress={() => navigation.navigate('SeedPhraseWarning')}
            variant="secondary"
          />
          <PrimaryButton
            label="Reset Wallet"
            onPress={handleResetWallet}
            loading={isResetting}
            variant="danger"
          />
        </View>
      </View>

      <ConfirmActionModal
        visible={isResetModalVisible}
        title="Reset wallet on this device?"
        description="This removes the wallet from this phone. Continue only if your recovery phrase is backed up and verified."
        confirmLabel="Yes, Reset Wallet"
        loading={isResetting}
        onConfirm={() => {
          void confirmResetWallet();
        }}
        onCancel={() => setIsResetModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actionCard: {
    backgroundColor: '#ffffff',
    borderColor: '#d9e2ef',
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  actionSubtitle: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 10,
  },
  actionTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
  },
  actions: {
    gap: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fee2e2',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#991b1b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  container: {
    backgroundColor: '#eef3f8',
    flexGrow: 1,
    gap: 14,
    padding: 16,
    paddingBottom: 28,
  },
  description: {
    color: '#7f1d1d',
    fontSize: 15,
    lineHeight: 23,
  },
  ruleItem: {
    color: '#7f1d1d',
    fontSize: 14,
    lineHeight: 21,
  },
  ruleList: {
    gap: 4,
    marginTop: 4,
  },
  securityCard: {
    backgroundColor: '#fff7f7',
    borderColor: '#fecaca',
    borderRadius: 14,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  title: {
    color: '#991b1b',
    fontSize: 24,
    fontWeight: '700',
  },
});
