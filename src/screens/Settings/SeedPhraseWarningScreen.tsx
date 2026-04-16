import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '@App/components/PrimaryButton';
import type { RootStackParamList } from '@App/navigation/types';

type SeedPhraseWarningScreenProps = NativeStackScreenProps<RootStackParamList, 'SeedPhraseWarning'>;

export function SeedPhraseWarningScreen({ navigation }: SeedPhraseWarningScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
        <Text style={styles.topBannerText}>PRIVATE INFORMATION</Text>
      </View>
      <View style={styles.warningCard}>
        <Text style={styles.title}>Before You Continue</Text>
        <Text style={styles.description}>
          Your recovery phrase will be visible on-screen next. Make sure nobody is around and no
          screen recording is active.
        </Text>
        <Text style={styles.description}>
          Anyone with these words can steal your funds permanently.
        </Text>
      </View>
      <PrimaryButton
        label="Reveal Phrase Securely"
        onPress={() => navigation.navigate('SeedPhraseReveal')}
      />
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
  description: {
    color: '#7f1d1d',
    fontSize: 15,
    lineHeight: 23,
  },
  topBanner: {
    alignSelf: 'flex-start',
    backgroundColor: '#fee2e2',
    borderRadius: 999,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  topBannerText: {
    color: '#991b1b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  title: {
    color: '#991b1b',
    fontSize: 29,
    fontWeight: '800',
  },
  warningCard: {
    backgroundColor: '#fff7f7',
    borderColor: '#fecaca',
    borderRadius: 16,
    borderWidth: 1,
    gap: 11,
    marginBottom: 18,
    padding: 18,
  },
});
