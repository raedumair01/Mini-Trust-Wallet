export function normalizeMnemonicInput(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .join(' ');
}

export function getMnemonicWordCount(mnemonic: string): number {
  if (!mnemonic.trim()) {
    return 0;
  }

  return mnemonic.trim().split(/\s+/).length;
}

export function isSupportedMnemonicWordCount(wordCount: number): boolean {
  return wordCount === 12 || wordCount === 24;
}
