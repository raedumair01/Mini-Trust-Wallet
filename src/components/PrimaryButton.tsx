import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
};

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variantStyles[variant],
        isDisabled && styles.disabledButton,
        pressed && !isDisabled && styles.pressedButton,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? '#111827' : '#ffffff'} />
      ) : (
        <Text style={[styles.label, variant === 'secondary' && styles.secondaryLabel]}>{label}</Text>
      )}
    </Pressable>
  );
}

const variantStyles = StyleSheet.create({
  danger: {
    backgroundColor: '#dc2626',
  },
  primary: {
    backgroundColor: '#0f172a',
  },
  secondary: {
    backgroundColor: '#f1f5f9',
    borderColor: '#d7e0eb',
    borderWidth: 1,
  },
});

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 14,
    justifyContent: 'center',
    minHeight: 54,
    paddingHorizontal: 16,
    shadowColor: '#0f172a',
    shadowOffset: {
      height: 8,
      width: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    width: '100%',
    elevation: 2,
  },
  disabledButton: {
    opacity: 0.62,
  },
  label: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '700',
  },
  pressedButton: {
    transform: [{ scale: 0.992 }],
  },
  secondaryLabel: {
    color: '#0f172a',
  },
});
