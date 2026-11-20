import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COUNTRIES_DATA } from '../data/countriesData';

export default function CountriesScreen({ onSelectCountry }) {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = COUNTRIES_DATA.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.popularDegrees.some(d => d.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#64748B" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search study destination countries, fields..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.headerSubtitle}>
        Compare {filtered.length} global study destinations & visa acceptance rates
      </Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isExpanded = expandedId === item.id;
          return (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.cardTop}
                onPress={() => setExpandedId(isExpanded ? null : item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.countryFlag}>{item.flag}</Text>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.intakeText}>Intakes: {item.intakes}</Text>
                </View>
                <View style={styles.visaPill}>
                  <Text style={styles.visaRateText}>{item.visaRate} Visa</Text>
                </View>
              </TouchableOpacity>

              <Text style={styles.summaryText}>{item.summary}</Text>

              {/* Quick specs */}
              <View style={styles.specsRow}>
                <View style={styles.specItem}>
                  <Ionicons name="wallet-outline" size={14} color="#0D9488" />
                  <Text style={styles.specLabel} numberOfLines={1}>{item.avgTuition}</Text>
                </View>
              </View>

              {isExpanded && (
                <View style={styles.expandedSection}>
                  <View style={styles.divider} />
                  
                  <View style={styles.infoRow}>
                    <Ionicons name="briefcase-outline" size={16} color="#475569" style={{ marginTop: 2 }} />
                    <View style={{ flex: 1, marginLeft: 8 }}>
                      <Text style={styles.infoTitle}>Work Rights & Post-Study Visa:</Text>
                      <Text style={styles.infoDesc}>{item.workRights}</Text>
                    </View>
                  </View>

                  <View style={[styles.infoRow, { marginTop: 10 }]}>
                    <Ionicons name="book-outline" size={16} color="#475569" style={{ marginTop: 2 }} />
                    <View style={{ flex: 1, marginLeft: 8 }}>
                      <Text style={styles.infoTitle}>High-Demand Degrees:</Text>
                      <View style={styles.degreesWrapper}>
                        {item.popularDegrees.map((deg, idx) => (
                          <View key={idx} style={styles.degPill}>
                            <Text style={styles.degPillText}>{deg}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.applyBtn}
                    onPress={() => onSelectCountry(item.name + ' ' + item.flag)}
                  >
                    <Ionicons name="paper-plane" size={15} color="#FFFFFF" />
                    <Text style={styles.applyBtnText}>Apply for {item.name}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 90,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  countryFlag: {
    fontSize: 30,
  },
  countryName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  intakeText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  visaPill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  visaRateText: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: '700',
  },
  summaryText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 17,
    marginBottom: 10,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 6,
    flex: 1,
  },
  specLabel: {
    fontSize: 11,
    color: '#0F766E',
    fontWeight: '600',
  },
  expandedSection: {
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  infoDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 16,
  },
  degreesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  degPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  degPillText: {
    fontSize: 10,
    color: '#475569',
    fontWeight: '600',
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D9488',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 14,
    gap: 6,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
