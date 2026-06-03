import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Vibration,
} from 'react-native';
import { C, F } from '../styles/theme';

export default function CustomButton({ title, onPress, isDanger }) {

  const handlePress = () => {
    Vibration.vibrate(80);

    // ejecutar acción
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.button,
        { backgroundColor: isDanger ? '#dc2626' : '#2563eb' }
      ]}
      onPress={handlePress}
    >
      <Text style={styles.text}>▶ {title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderWidth: 1,
    borderColor: C.accent,
    width: '80%',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontFamily: F.mono,
    fontSize: 14,
    letterSpacing: 1,
  },
});
``