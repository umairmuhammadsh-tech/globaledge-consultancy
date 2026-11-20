import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';
import { COUNTRIES_DATA } from '../data/countriesData';

export default function HomeScreen({ onNavigate }) {
  const featuredScholarships = SCHOLARSHIPS_DATA.slice(0, 4);
  const featuredCountries = COUNTRIES_DATA.slice(0, 4);

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/923124718386?text=Hi%20GlobalEdge,%20I%20want%20to%20get%20free%20counseling%20for%20study%20abroad.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Hero Banner */}
      <View style={styles.heroCard}>
        <View style={styles.pillBadge}>
          <Text style={styles.pillBadgeText}>🌟 HUZ GLOBAL SOLUTIONS</Text>
        </View>
        <Text style={styles.heroTitle}>
          Your Gateway to <Text style={styles.highlightText}>World-Class</Text> Education
        </Text>
        <Text style={styles.heroSubtitle}>
          Expert university placement, 19+ fully funded global scholarships, visa documentation & interview coaching.
        </Text>

        <View style={styles.heroCtaRow}>
          <TouchableOpacity style={styles.primaryCta} onPress={() => onNavigate('apply')} activeOpacity={0.8}>
            <Text style={styles.primaryCtaText}>Apply Now</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryCta} onPress={handleWhatsApp} activeOpacity={0.8}>
            <Ionicons name="logo-whatsapp" size={16} color="#10B981" style={{ marginRight: 6 }} />
            <Text style={styles.secondaryCtaText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Counter Bar */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>19+</Text>
          <Text style={styles.statLabel}>Countries</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>100+</Text>
          <Text style={styles.statLabel}>Universities</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>98%</Text>
          <Text style={styles.statLabel}>Visa Rate</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>500+</Text>
          <Text style={styles.statLabel}>Enrolled</Text>
        </View>
      </View>

      {/* Quick Action Hub */}
      <Text style={styles.sectionHeader}>Quick Services Hub</Text>
      <View style={styles.quickGrid}>
        <TouchableOpacity style={styles.gridCard} onPress={() => onNavigate('scholarships')}>
          <View style={[styles.gridIconCircle, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="school" size={24} color="#2563EB" />
          </View>
          <Text style={styles.gridCardTitle}>Scholarships</Text>
          <Text style={styles.gridCardDesc}>19+ Fully Funded</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridCard} onPress={() => onNavigate('countries')}>
          <View style={[styles.gridIconCircle, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="globe" size={24} color="#16A34A" />
          </View>
          <Text style={styles.gridCardTitle}>Destinations</Text>
          <Text style={styles.gridCardDesc}>UK, US, EU, Asia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridCard} onPress={() => onNavigate('apply')}>
          <View style={[styles.gridIconCircle, { backgroundColor: '#FAF5FF' }]}>
            <Ionicons name="create" size={24} color="#9333EA" />
          </View>
          <Text style={styles.gridCardTitle}>Assessment</Text>
          <Text style={styles.gridCardDesc}>Free Evaluation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridCard} onPress={() => onNavigate('pricing')}>
          <View style={[styles.gridIconCircle, { backgroundColor: '#FFFBEB' }]}>
            <Ionicons name="shield-checkmark" size={24} color="#D97706" />
          </View>
          <Text style={styles.gridCardTitle}>Fees & Contract</Text>
          <Text style={styles.gridCardDesc}>50% Refund Terms</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Scholarships */}
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionHeader}>Top Government Scholarships</Text>
        <TouchableOpacity onPress={() => onNavigate('scholarships')}>
          <Text style={styles.viewAllText}>View All ({SCHOLARSHIPS_DATA.length})</Text>
        </TouchableOpacity>
      </View>

      {featuredScholarships.map((s) => (
        <TouchableOpacity
          key={s.id}
          style={styles.scholarshipCard}
          onPress={() => onNavigate('scholarships')}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardFlag}>{s.flag}</Text>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.cardTitle} numberOfLines={1}>{s.name}</Text>
              <Text style={styles.cardSubtitle}>{s.country}</Text>
            </View>
            <View style={styles.badgePill}>
              <Text style={styles.badgePillText}>{s.badge}</Text>
            </View>
          </View>
          <Text style={styles.cardCoverage} numberOfLines={2}>
            💰 {s.funding}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Featured Destinations */}
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionHeader}>Popular Destinations</Text>
        <TouchableOpacity onPress={() => onNavigate('countries')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.destinationsRow}>
        {featuredCountries.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={styles.countryMiniCard}
            onPress={() => onNavigate('countries')}
            activeOpacity={0.8}
          >
            <Text style={styles.countryMiniFlag}>{c.flag}</Text>
            <Text style={styles.countryMiniName}>{c.name}</Text>
            <Text style={styles.countryMiniVisa}>Visa: {c.visaRate}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Why Choose Us */}
      <View style={styles.whyUsBox}>
        <Text style={styles.whyUsTitle}>Why GlobalEdge?</Text>
        <View style={styles.whyItem}>
          <Ionicons name="checkmark-circle" size={18} color="#0D9488" />
          <Text style={styles.whyItemText}>50% Refund Guarantee on University Placement (€175 of €350)</Text>
        </View>
        <View style={styles.whyItem}>
          <Ionicons name="checkmark-circle" size={18} color="#0D9488" />
          <Text style={styles.whyItemText}>Expert SOP, Motivation Letter & Visa File Preparation</Text>
        </View>
        <View style={styles.whyItem}>
          <Ionicons name="checkmark-circle" size={18} color="#0D9488" />
          <Text style={styles.whyItemText}>Targeted Professor Hunting for Masters & PhD Scholarships</Text>
        </View>
        <View style={styles.whyItem}>
          <Ionicons name="checkmark-circle" size={18} color="#0D9488" />
          <Text style={styles.whyItemText}>Governed under Pakistani & International Legal Contracts</Text>
        </View>
      </View>

      {/* Contact Footer Card */}
      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>Need Immediate Guidance?</Text>
        <Text style={styles.contactSubtitle}>
          Reach out to our senior admission directors directly:
        </Text>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => Linking.openURL('tel:+923124718386')}
        >
          <Ionicons name="call" size={16} color="#0D9488" />
          <Text style={styles.contactButtonText}>+92 312 4718386</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => Linking.openURL('mailto:huzglobalsolutions@gmail.com')}
        >
          <Ionicons name="mail" size={16} color="#0D9488" />
          <Text style={styles.contactButtonText}>huzglobalsolutions@gmail.com</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 90,
  },
  heroCard: {
    backgroundColor: '#0A192F',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  pillBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(13, 148, 136, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  pillBadgeText: {
    color: '#14B8A6',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 8,
  },
  highlightText: {
    color: '#0D9488',
  },
  heroSubtitle: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  heroCtaRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryCta: {
    flex: 1,
    backgroundColor: '#0D9488',
    paddingVertical: 11,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryCtaText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryCta: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingVertical: 11,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  secondaryCtaText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0A192F',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  viewAllText: {
    color: '#0D9488',
    fontSize: 12,
    fontWeight: '600',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  gridIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  gridCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  gridCardDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  scholarshipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardFlag: {
    fontSize: 22,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  badgePill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgePillText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#B45309',
  },
  cardCoverage: {
    fontSize: 11,
    color: '#047857',
    fontWeight: '500',
  },
  destinationsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  countryMiniCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  countryMiniFlag: {
    fontSize: 24,
    marginBottom: 4,
  },
  countryMiniName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  countryMiniVisa: {
    fontSize: 9,
    color: '#16A34A',
    fontWeight: '600',
    marginTop: 2,
  },
  whyUsBox: {
    backgroundColor: '#F0FDFA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#CCFBF1',
    marginBottom: 20,
  },
  whyUsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F766E',
    marginBottom: 10,
  },
  whyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  whyItemText: {
    flex: 1,
    fontSize: 12,
    color: '#134E4A',
    lineHeight: 16,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 8,
    marginBottom: 8,
  },
  contactButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
});
