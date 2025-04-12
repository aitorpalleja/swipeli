import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { X, Heart } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface ActionButtonsProps {
  onAccept: () => void;
  onReject: () => void;
}

export function ActionButtons({ onAccept, onReject }: ActionButtonsProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.rejectButton, { backgroundColor: theme.colors.error }]}
        onPress={onReject}
      >
        <X color="white" size={32} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.acceptButton, { backgroundColor: theme.colors.success }]}
        onPress={onAccept}
      >
        <Heart color="white" size={32} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rejectButton: {
    marginRight: 20,
  },
  acceptButton: {
    marginLeft: 20,
  },
});