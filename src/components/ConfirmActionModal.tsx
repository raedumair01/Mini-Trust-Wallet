import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from './PrimaryButton';

type ConfirmActionModalProps = {
  visible: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmActionModal({
  visible,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancel',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmActionModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={styles.actions}>
            <PrimaryButton
              label={cancelLabel}
              onPress={onCancel}
              variant="secondary"
              disabled={loading}
            />
            <PrimaryButton
              label={confirmLabel}
              onPress={onConfirm}
              variant="danger"
              loading={loading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    gap: 14,
    padding: 18,
    width: '100%',
  },
  description: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 23,
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '800',
  },
});
