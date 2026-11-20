import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';

export default function ScholarshipsScreen({ onApplyForScholarship }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const levels = ['All', 'Bachelors', 'Masters', 'PhD'];

  const filteredScholarships = SCHOLARSHIPS_DATA.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subjects.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel =
      selectedLevel === 'All' || s.level.includes(selectedLevel);

    return matchesSearch && matchesLevel;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleOpenLink = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#64748B" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search 19+ scholarships, countries, majors..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Degree Level Filter Pills */}
      <View style={styles.filterRow}>
        {levels.map((lvl) => (
          <TouchableOpacity
            key={lvl}
            style={[styles.filterPill, selectedLevel === lvl && styles.filterPillActive]}
            onPress={() => setSelectedLevel(lvl)}
          >
            <Text style={[styles.filterPillText, selectedLevel === lvl && styles.filterPillTextActive]}>
              {lvl}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.resultCount}>
        Found {filteredScholarships.length} fully funded programs
      </Text>

      {/* Scholarships List */}
      <FlatList
        data={filteredScholarships}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isExpanded = expandedId === item.id;
          return (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeaderLeft}>
                  <Text style={styles.flagEmoji}>{item.flag}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.scholarshipName}>{item.name}</Text>
                    <Text style={styles.countryName}>{item.country} • {item.deadline}</Text>
                  </View>
                </View>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#64748B"
                />
              </TouchableOpacity>

              {/* Funding Preview */}
              <View style={styles.fundingBadge}>
                <Ionicons name="gift-outline" size={14} color="#059669" />
                <Text style={styles.fundingText} numberOfLines={isExpanded ? undefined : 2}>
                  {item.funding}
                </Text>
              </View>

              {/* Tags Row */}
              <View style={styles.tagsRow}>
                {item.level.map((lvl, idx) => (
                  <View key={idx} style={styles.tag}>
                    <Text style={styles.tagText}>{lvl}</Text>
                  </View>
                ))}
                <View style={[styles.tag, styles.highlightTag]}>
                  <Text style={styles.highlightTagText}>{item.badge}</Text>
                </View>
              </View>

              {/* Expanded Details */}
              {isExpanded && (
                <View style={styles.expandedContent}>
                  <View style={styles.divider} />
                  <Text style={styles.detailLabel}>Eligibility Criteria:</Text>
                  <Text style={styles.detailText}>{item.eligibility}</Text>

                  <Text style={styles.detailLabel}>Academic Fields / Majors:</Text>
                  <Text style={styles.detailText}>{item.subjects}</Text>

                  <Text style={styles.detailLabel}>Program Duration:</Text>
                  <Text style={styles.detailText}>{item.duration}</Text>

                  <View style={styles.buttonActionRow}>
                    <TouchableOpacity
                      style={styles.portalButton}
                      onPress={() => handleOpenLink(item.link)}
                    >
                      <Ionicons name="open-outline" size={15} color="#2563EB" />
                      <Text style={styles.portalButtonText}>Official Portal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.applyButton}
                      onPress={() => onApplyForScholarship(item.name)}
                    >
                      <Ionicons name="sparkles" size={15} color="#FFFFFF" />
                      <Text style={styles.applyButtonText}>Apply With Us</Text>
                    </TouchableOpacity>
                  </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  filterPillActive: {
    backgroundColor: '#0D9488',
    borderColor: '#0D9488',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  resultCount: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
    fontWeight: '500',
  },
  listContainer: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  flagEmoji: {
    fontSize: 26,
    marginRight: 10,
  },
  scholarshipName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  countryName: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  fundingBadge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ECFDF5',
    padding: 8,
    borderRadius: 8,
    gap: 6,
    marginBottom: 10,
  },
  fundingText: {
    flex: 1,
    fontSize: 11,
    color: '#065F46',
    fontWeight: '500',
    lineHeight: 16,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    color: '#475569',
    fontWeight: '600',
  },
  highlightTag: {
    backgroundColor: '#FEF3C7',
  },
  highlightTagText: {
    fontSize: 10,
    color: '#92400E',
    fontWeight: '700',
  },
  expandedContent: {
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
    marginTop: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
    marginTop: 2,
  },
  buttonActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  portalButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    gap: 6,
  },
  portalButtonText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '700',
  },
  applyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#0D9488',
    gap: 6,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
