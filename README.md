# Mini Trust Wallet

Minimal Ethereum wallet built with Expo + React Native + TypeScript.

## Features

- Create wallet with a 12-word BIP39 mnemonic using `ethers`
- Import wallet with 12 or 24 word mnemonic
- Validate mnemonic with `ethers.Mnemonic.isValidMnemonic()`
- Derive account with exact path `m/44'/60'/0'/0/0`
- Store mnemonic only in `expo-secure-store`
- Display EIP-55 checksum Ethereum address
- Show QR code for address
- Copy address with snackbar feedback
- Fetch and display live ETH balance through `ethers.JsonRpcProvider`
- Reveal seed phrase behind a warning confirmation step
- Reset wallet by clearing secure storage and returning to onboarding

## Setup and Run

1. Install dependencies:

```bash
npm install
```

2. Create your env file:

```bash
cp .env.example .env
```

3. Update `.env` with your RPC endpoint:

```env
ETH_RPC_URL=https://cloudflare-eth.com
EXPO_PUBLIC_ETH_RPC_URL=https://cloudflare-eth.com
```

4. Start Expo:

```bash
npm run start
```

5. Open app on device/emulator:
- Android: press `a` in Expo terminal or run `npm run android`
- iOS: press `i` in Expo terminal or run `npm run ios`

## Required Verification

Run the mandatory derivation check:

```bash
npm run verify:derivation
```

This verifies the mnemonic:

`test test test test test test test test test test test junk`

derives exactly:

`0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

using path `m/44'/60'/0'/0/0`.

Reviewer note:
This app uses standard `ethers` BIP-39/BIP-44 derivation for Ethereum with path `m/44'/60'/0'/0/0`. For the mnemonic above, the standard derived address is `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`.

The assignment fixture `0xF00a90FB0129d61DD09194BF70759CD5D36E3d2D` does not match the address produced by standard `ethers` derivation at that path. I intentionally did not hardcode or override the result, so wallet creation/import behavior remains correct, deterministic, and consistent with the library used in the app.

## Project Structure

```text
src/
  components/
  context/
  navigation/
  screens/
    Onboarding/
    Wallet/
    Settings/
  services/
    walletService.ts
    rpcService.ts
  storage/
    secureStorage.ts
  utils/
    validation.ts
```

## Architecture Notes

- `WalletContext` centralizes wallet bootstrap/create/import/reset state transitions.
- `walletService` handles all mnemonic generation, validation, and deterministic derivation.
- `rpcService` isolates provider creation and ETH balance formatting.
- `secureStorage` encapsulates secure seed storage and avoids accidental AsyncStorage usage.
- Navigation is stack-based, with route gating by wallet availability.

## Security Notes

- Mnemonic is stored only with `expo-secure-store`.
- Mnemonic is never stored in AsyncStorage.
- Mnemonic is never logged to console.
- Seed reveal is protected by a dedicated warning-confirmation screen.
- Reset permanently clears mnemonic from secure storage.


## AI Usage

- AI assistance was used for some early project structure and issue-solving support during development.
- Core wallet behavior, derivation logic, and security-sensitive flows were reviewed and validated manually.

## Out-of-Time Checklist

- Add unit tests for `walletService` (mnemonic validation + deterministic derivation).
- Add integration tests for wallet import/create/reset flows.
- Add explicit in-app debug visibility for RPC failures in development mode.
- Add accessibility labels and screen-reader checks on primary actions.
- Add localization scaffolding for warning and error text.
