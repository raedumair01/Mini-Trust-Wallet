import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type SnackbarProps = {
  message: string;
  visible: boolean;
  onDismiss: () => void;
};

export function Snackbar({ message, visible, onDismiss }: SnackbarProps) {
  useEffect(() => {
    if (!visible) {
      return;
    }

    const timeout = setTimeout(() => {
      onDismiss();
    }, 2200);

    return () => clearTimeout(timeout);
  }, [onDismiss, visible]);

  if (!visible) {
    return null;
  }

  return (
    <View pointerEvents="none" style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  message: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  wrapper: {
    alignItems: 'center',
    bottom: 24,
    left: 0,
    position: 'absolute',
    right: 0,
  },
});
