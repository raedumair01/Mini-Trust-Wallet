import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { WalletProvider, useWallet } from '@App/context/WalletContext';
import type { RootStackParamList } from '@App/navigation/types';
import { CreateWalletBackupScreen } from '@App/screens/Onboarding/CreateWalletBackupScreen';
import { OnboardingScreen } from '@App/screens/Onboarding/OnboardingScreen';
import { SeedPhraseRevealScreen } from '@App/screens/Settings/SeedPhraseRevealScreen';
import { SeedPhraseWarningScreen } from '@App/screens/Settings/SeedPhraseWarningScreen';
import { SettingsScreen } from '@App/screens/Settings/SettingsScreen';
import { WalletScreen } from '@App/screens/Wallet/WalletScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { address, isReady } = useWallet();

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#111827" />
        <Text style={styles.loadingText}>Loading wallet...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!address ? (
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerBackButtonDisplayMode: 'minimal',
            headerTintColor: '#0f172a',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#eef3f8',
            },
            headerTitleStyle: {
              color: '#0f172a',
              fontSize: 20,
              fontWeight: '700',
            },
          }}
        >
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateWalletBackup"
            component={CreateWalletBackupScreen}
            options={{ title: 'Back Up Phrase' }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerBackButtonDisplayMode: 'minimal',
            headerTintColor: '#0f172a',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#eef3f8',
            },
            headerTitleStyle: {
              color: '#0f172a',
              fontSize: 20,
              fontWeight: '700',
            },
          }}
        >
          <Stack.Screen
            name="Wallet"
            component={WalletScreen}
            options={{
              title: 'Wallet',
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: 'Settings',
            }}
          />
          <Stack.Screen
            name="SeedPhraseWarning"
            component={SeedPhraseWarningScreen}
            options={{
              title: 'Seed Phrase Warning',
            }}
          />
          <Stack.Screen
            name="SeedPhraseReveal"
            component={SeedPhraseRevealScreen}
            options={{
              title: 'Your Seed Phrase',
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <StatusBar style="dark" backgroundColor="#eef3f8" translucent={false} />
      <AppNavigator />
    </WalletProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    flex: 1,
    gap: 12,
    justifyContent: 'center',
  },
  loadingText: {
    color: '#334155',
    fontSize: 16,
    fontWeight: '500',
  },
});
