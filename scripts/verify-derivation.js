const { ethers } = require('ethers');

const mnemonic = 'test test test test test test test test test test test junk';
const expectedAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const derivationPath = "m/44'/60'/0'/0/0";

const rootWallet = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, 'm');
const wallet = rootWallet.derivePath(derivationPath);
const derivedAddress = ethers.getAddress(wallet.address);

if (derivedAddress !== expectedAddress) {
  console.error('Derivation test failed.');
  console.error(`Expected: ${expectedAddress}`);
  console.error(`Received: ${derivedAddress}`);
  process.exit(1);
}

console.log(`Derivation test passed: ${derivedAddress}`);
