import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNav({ currentTab, onSelectTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { id: 'scholarships', label: 'Scholarships', icon: 'school-outline', activeIcon: 'school' },
    { id: 'countries', label: 'Destinations', icon: 'globe-outline', activeIcon: 'globe' },
    { id: 'apply', label: 'Apply', icon: 'create-outline', activeIcon: 'create' },
    { id: 'pricing', label: 'Fees & Law', icon: 'document-text-outline', activeIcon: 'document-text' },
    { id: 'admin', label: 'Portal', icon: 'lock-closed-outline', activeIcon: 'lock-closed' }
  ];

  return (
    <View style={styles.navBar}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        const iconName = isActive ? tab.activeIcon : tab.icon;
        const color = isActive ? '#0D9488' : '#94A3B8';

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => onSelectTab(tab.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrapper, isActive && styles.activeIconWrapper]}>
              <Ionicons name={iconName} size={20} color={color} />
            </View>
            <Text style={[styles.tabLabel, { color }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#0A192F',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconWrapper: {
    padding: 3,
    borderRadius: 8,
  },
  activeIconWrapper: {
    backgroundColor: 'rgba(13, 148, 136, 0.15)',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
});
