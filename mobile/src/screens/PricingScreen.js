import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRICING_DATA } from '../data/pricingData';

export default function PricingScreen({ onApplyForPackage }) {
  const handleOpenPdf = () => {
    Linking.openURL(PRICING_DATA.pdfContractUrl);
  };

  const handleOpenDocx = () => {
    Linking.openURL(PRICING_DATA.docxContractUrl);
  };

  const handleShareContract = async () => {
    try {
      await Share.share({
        title: 'GlobalEdge Student Legal Contract',
        message: `Official Student Consultancy Legal Agreement - GlobalEdge Consultancy / HUZ Global Solutions:\nPDF: ${PRICING_DATA.pdfContractUrl}\nWord: ${PRICING_DATA.docxContractUrl}`,
      });
    } catch (err) {
      console.warn('Share error:', err.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.topCard}>
        <View style={styles.badgeRow}>
          <Text style={styles.badgeText}>⚖️ LEGAL CONTRACT & TRANSPARENT TARIFF</Text>
        </View>
        <Text style={styles.topTitle}>Itemized Professional Fee Structure</Text>
        <Text style={styles.topSubtitle}>
          Governed under the Contract Act, 1872 of Pakistan and international consumer standards. Fully transparent, zero hidden charges.
        </Text>
      </View>

      {/* Complete Bundle Highlight Card */}
      <View style={styles.bundleCard}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountBadgeText}>🔥 10% DISCOUNT BUNDLE</Text>
        </View>
        <Text style={styles.bundleTitle}>{PRICING_DATA.bundle.title}</Text>
        <Text style={styles.bundleDesc}>{PRICING_DATA.bundle.description}</Text>

        <View style={styles.pricingRow}>
          <View>
            <Text style={styles.originalPrice}>€{PRICING_DATA.bundle.originalEur}</Text>
            <Text style={styles.bundlePrice}>€{PRICING_DATA.bundle.priceEur} <Text style={styles.netText}>Net</Text></Text>
          </View>
          <View style={styles.savePill}>
            <Text style={styles.savePillText}>You Save €{PRICING_DATA.bundle.discountEur}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bundleButton} onPress={() => onApplyForPackage('All-in-One Comprehensive Package (€1,125)')}>
          <Text style={styles.bundleButtonText}>Apply for Full Bundle</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Individual Modules */}
      <Text style={styles.sectionHeading}>A La Carte Service Modules</Text>

      {PRICING_DATA.modules.map((m, idx) => (
        <View key={idx} style={styles.moduleCard}>
          <View style={styles.moduleHeaderRow}>
            <View>
              <Text style={styles.moduleCode}>{m.code}</Text>
              <Text style={styles.moduleTitle}>{m.title}</Text>
            </View>
            <View style={styles.modulePriceBox}>
              <Text style={styles.modulePriceEur}>€{m.priceEur}</Text>
            </View>
          </View>

          <Text style={styles.moduleDesc}>{m.description}</Text>

          {/* Refund Guarantee Badge for Module A */}
          {m.code === 'MODULE A' && (
            <View style={styles.guaranteeBox}>
              <Ionicons name="shield-checkmark" size={16} color="#047857" />
              <View style={{ flex: 1 }}>
                <Text style={styles.guaranteeHead}>50% Refund Guarantee</Text>
                <Text style={styles.guaranteeBody}>
                  If the company fails to secure an official university admission offer letter, 50% of this fee (€175.00) is promptly refunded back to the student.
                </Text>
              </View>
            </View>
          )}

          {m.code !== 'MODULE A' && (
            <View style={styles.nonRefundBox}>
              <Ionicons name="information-circle-outline" size={16} color="#475569" />
              <Text style={styles.nonRefundText}>{m.refundableText}</Text>
            </View>
          )}
        </View>
      ))}

      {/* Specialized Services */}
      <Text style={styles.sectionHeading}>Specialized Placement Programs</Text>

      {PRICING_DATA.specialServices.map((s, idx) => (
        <View key={idx} style={styles.specialCard}>
          <View style={styles.specialTop}>
            <Text style={styles.specialTitle}>{s.title}</Text>
            <Text style={styles.specialPrice}>{s.range || s.rate}</Text>
          </View>
          <Text style={styles.specialDesc}>{s.description}</Text>
        </View>
      ))}

      {/* Legal Disclaimers & Visa Refund Terms */}
      <View style={styles.legalBox}>
        <View style={styles.legalBoxHeader}>
          <Ionicons name="shield-outline" size={18} color="#0F172A" />
          <Text style={styles.legalBoxTitle}>Essential Contract & Refund Policies</Text>
        </View>

        {PRICING_DATA.legalSummary.map((item, idx) => (
          <View key={idx} style={styles.legalBulletRow}>
            <Text style={styles.legalBulletDot}>•</Text>
            <Text style={styles.legalBulletText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Download Official Legal Contract */}
      <View style={styles.downloadSection}>
        <Text style={styles.downloadTitle}>Official Downloadable Legal Contracts</Text>
        <Text style={styles.downloadSubtitle}>
          Download the fully formatted, legally binding bilateral student agreement:
        </Text>

        <View style={styles.downloadBtnRow}>
          <TouchableOpacity style={styles.pdfBtn} onPress={handleOpenPdf}>
            <Ionicons name="document-text" size={18} color="#DC2626" />
            <Text style={styles.pdfBtnText}>Download PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.docxBtn} onPress={handleOpenDocx}>
            <Ionicons name="document" size={18} color="#2563EB" />
            <Text style={styles.docxBtnText}>Download Word</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShareContract}>
          <Ionicons name="share-social-outline" size={16} color="#0F172A" />
          <Text style={styles.shareBtnText}>Share Contract Links</Text>
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
  topCard: {
    backgroundColor: '#0A192F',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
  },
  badgeRow: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  badgeText: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '700',
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  topSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16,
  },
  bundleCard: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#0D9488',
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#0D9488',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bundleTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bundleDesc: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16,
    marginBottom: 14,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  originalPrice: {
    fontSize: 13,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  bundlePrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#14B8A6',
  },
  netText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  savePill: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  savePillText: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: 12,
  },
  bundleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D9488',
    paddingVertical: 11,
    borderRadius: 8,
    gap: 8,
  },
  bundleButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  moduleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  moduleCode: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0D9488',
    letterSpacing: 0.5,
  },
  moduleTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
    maxWidth: 220,
  },
  modulePriceBox: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  modulePriceEur: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0A192F',
  },
  moduleDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 10,
  },
  guaranteeBox: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    padding: 10,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  guaranteeHead: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
  },
  guaranteeBody: {
    fontSize: 11,
    color: '#047857',
    marginTop: 2,
    lineHeight: 14,
  },
  nonRefundBox: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 6,
    gap: 6,
    alignItems: 'center',
  },
  nonRefundText: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
  },
  specialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  specialTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  specialTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
    marginRight: 6,
  },
  specialPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0D9488',
  },
  specialDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  legalBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  legalBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  legalBoxTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  legalBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  legalBulletDot: {
    fontSize: 14,
    color: '#B45309',
    marginRight: 6,
    lineHeight: 16,
  },
  legalBulletText: {
    flex: 1,
    fontSize: 11,
    color: '#78350F',
    lineHeight: 15,
  },
  downloadSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  downloadTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  downloadSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 12,
  },
  downloadBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  pdfBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  pdfBtnText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 12,
  },
  docxBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  docxBtnText: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 12,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 9,
    borderRadius: 8,
    gap: 6,
  },
  shareBtnText: {
    color: '#0F172A',
    fontWeight: '600',
    fontSize: 12,
  },
});
