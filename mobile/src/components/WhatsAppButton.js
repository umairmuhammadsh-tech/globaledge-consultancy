import React from 'react';
import { StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WhatsAppButton() {
  const handleOpenWhatsApp = () => {
    Linking.openURL('https://wa.me/923124718386?text=Hello%20GlobalEdge%20Team,%20I%20am%20interested%20in%20study%20abroad%20admissions%20and%20scholarships.');
  };

  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={handleOpenWhatsApp}
      activeOpacity={0.85}
      accessibilityLabel="Chat on WhatsApp"
    >
      <Ionicons name="logo-whatsapp" size={30} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 84 : 70,
    right: 18,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 999,
  },
});
