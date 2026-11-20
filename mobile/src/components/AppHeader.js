import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AppHeader({ onOpenAdmin }) {
  const handleCall = () => {
    Linking.openURL('tel:+923124718386');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/923124718386?text=Hello%20GlobalEdge%20Consultancy,%20I%20need%20expert%20guidance%20for%20admissions%20and%20scholarships.');
  };

  return (
    <View style={styles.header}>
      <View style={styles.brandContainer}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoBadgeText}>GE</Text>
        </View>
        <View>
          <Text style={styles.brandTitle}>GlobalEdge</Text>
          <Text style={styles.brandSubtitle}>HUZ Global Solutions</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleCall} accessibilityLabel="Call Us">
          <Ionicons name="call" size={18} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.iconButton, styles.waButton]} onPress={handleWhatsApp} accessibilityLabel="WhatsApp Us">
          <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0A192F',
    paddingTop: Platform.OS === 'ios' ? 52 : 36,
    paddingBottom: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#0D9488',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoBadgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waButton: {
    backgroundColor: '#10B981',
  },
});
