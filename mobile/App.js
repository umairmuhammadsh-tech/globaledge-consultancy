import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import AppHeader from './src/components/AppHeader';
import BottomNav from './src/components/BottomNav';
import WhatsAppButton from './src/components/WhatsAppButton';

import HomeScreen from './src/screens/HomeScreen';
import ScholarshipsScreen from './src/screens/ScholarshipsScreen';
import CountriesScreen from './src/screens/CountriesScreen';
import ApplyScreen from './src/screens/ApplyScreen';
import PricingScreen from './src/screens/PricingScreen';
import AdminScreen from './src/screens/AdminScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [targetCountry, setTargetCountry] = useState(null);
  const [targetScholarship, setTargetScholarship] = useState(null);

  const handleApplyForScholarship = (scholarshipName) => {
    setTargetScholarship(scholarshipName);
    setCurrentTab('apply');
  };

  const handleSelectCountry = (countryName) => {
    setTargetCountry(countryName);
    setCurrentTab('apply');
  };

  const handleApplyForPackage = (packageName) => {
    setTargetScholarship(packageName);
    setCurrentTab('apply');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#0A192F" />
      
      {/* Top Application Header */}
      <AppHeader onOpenAdmin={() => setCurrentTab('admin')} />

      {/* Screen Views */}
      <View style={styles.screenContainer}>
        {currentTab === 'home' && (
          <HomeScreen
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'scholarships' && (
          <ScholarshipsScreen
            onApplyForScholarship={handleApplyForScholarship}
          />
        )}

        {currentTab === 'countries' && (
          <CountriesScreen
            onSelectCountry={handleSelectCountry}
          />
        )}

        {currentTab === 'apply' && (
          <ApplyScreen
            initialCountry={targetCountry}
            initialScholarship={targetScholarship}
            onFinish={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'pricing' && (
          <PricingScreen
            onApplyForPackage={handleApplyForPackage}
          />
        )}

        {currentTab === 'admin' && (
          <AdminScreen />
        )}
      </View>

      {/* Floating WhatsApp Action Button (visible except on admin tab) */}
      {currentTab !== 'admin' && <WhatsAppButton />}

      {/* Persistent Bottom Navigation Tab Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A192F',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
