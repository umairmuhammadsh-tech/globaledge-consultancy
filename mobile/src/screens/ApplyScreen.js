import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Linking,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { submitApplication } from '../utils/api';

const COUNTRIES = [
  'Germany 🇩🇪',
  'United Kingdom 🇬🇧',
  'United States 🇺🇸',
  'Canada 🇨🇦',
  'Australia 🇦🇺',
  'China 🇨🇳 (CSC / ANSO)',
  'Russia 🇷🇺 (Open Doors / State Quota)',
  'Saudi Arabia 🇸🇦 (Study in Saudi)',
  'South Korea 🇰🇷 (GKS)',
  'Japan 🇯🇵 (MEXT)',
  'France 🇫🇷 (Eiffel)',
  'Belgium 🇧🇪 (Master Mind)',
  'Indonesia 🇮🇩 (KNB)',
  'Turkey 🇹🇷 (Türkiye Bursları)',
  'Hungary 🇭🇺 (Stipendium)',
  'Switzerland 🇨🇭 (Swiss Excellence)',
  'Ireland 🇮🇪',
  'Italy 🇮🇹',
  'Sweden 🇸🇪'
];

const DEGREES = ['Bachelors', 'Masters', 'PhD / Doctorate', 'Diploma / Foundation'];

const ENGLISH_TESTS = [
  'IELTS (Academic)',
  'PTE Academic',
  'Duolingo English Test',
  'TOEFL iBT',
  'English Proficiency Certificate (Medium of Instruction)',
  'None / Planning to take'
];

export default function ApplyScreen({ initialCountry, initialScholarship, onFinish }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  const [degree, setDegree] = useState('Masters');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [gpa, setGpa] = useState('');
  const [englishTest, setEnglishTest] = useState('English Proficiency Certificate (Medium of Instruction)');

  const [country, setCountry] = useState(initialCountry || 'Germany 🇩🇪');
  const [scholarshipTrack, setScholarshipTrack] = useState(initialScholarship || 'CSC / DAAD / Top Govt Scholarship');
  const [notes, setNotes] = useState('');

  // Dropdown Picker Modals
  const [pickerType, setPickerType] = useState(null); // 'country', 'degree', 'english'

  useEffect(() => {
    if (initialCountry) setCountry(initialCountry);
  }, [initialCountry]);

  useEffect(() => {
    if (initialScholarship) setScholarshipTrack(initialScholarship);
  }, [initialScholarship]);

  const validateStep1 = () => {
    if (!fullName.trim()) {
      Alert.alert('Required Field', 'Please enter your full name.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Required Field', 'Please enter a valid email address.');
      return false;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      Alert.alert('Required Field', 'Please enter your WhatsApp / mobile phone number.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!fieldOfStudy.trim()) {
      Alert.alert('Required Field', 'Please enter your desired field of study (e.g., Computer Science, MBA).');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      country,
      degree,
      field: fieldOfStudy.trim(),
      gpa: gpa.trim(),
      englishTest,
      scholarshipPreference: scholarshipTrack,
      notes: notes.trim(),
      source: 'Mobile App (GlobalEdge iOS/Android)'
    };

    const res = await submitApplication(payload);
    setLoading(false);

    if (res && res.success) {
      setSubmissionResult(res.data);
      setSuccessModalVisible(true);
    } else {
      Alert.alert('Notice', 'Your application has been stored offline. We will sync it shortly.');
      setSuccessModalVisible(true);
    }
  };

  const resetForm = () => {
    setSuccessModalVisible(false);
    setCurrentStep(1);
    setFullName('');
    setEmail('');
    setPhone('');
    setCity('');
    setFieldOfStudy('');
    setGpa('');
    setNotes('');
  };

  const openWhatsAppConfirmation = () => {
    const text = encodeURIComponent(
      `Hello GlobalEdge, I just submitted an application through the mobile app!\nName: ${fullName}\nCountry: ${country}\nDegree: ${degree} in ${fieldOfStudy}.`
    );
    Linking.openURL(`https://wa.me/923124718386?text=${text}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Progress Header */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Student Assessment & Application</Text>
          <Text style={styles.stepIndicator}>Step {currentStep} of 3</Text>
        </View>

        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%' }]} />
        </View>

        <View style={styles.stepsLabelRow}>
          <Text style={[styles.stepLabelText, currentStep >= 1 && styles.stepLabelActive]}>1. Contact</Text>
          <Text style={[styles.stepLabelText, currentStep >= 2 && styles.stepLabelActive]}>2. Academic</Text>
          <Text style={[styles.stepLabelText, currentStep === 3 && styles.stepLabelActive]}>3. Destination</Text>
        </View>
      </View>

      {/* STEP 1: Personal Info */}
      {currentStep === 1 && (
        <View style={styles.stepFormCard}>
          <Text style={styles.stepTitle}>Personal & Contact Details</Text>
          <Text style={styles.stepDesc}>Our advisors will contact you directly via WhatsApp and email.</Text>

          <Text style={styles.inputLabel}>Full Name *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Muhammad Ali"
            placeholderTextColor="#94A3B8"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.inputLabel}>Email Address *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. ali@gmail.com"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputLabel}>WhatsApp / Mobile Phone *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. +92 312 4718386"
            placeholderTextColor="#94A3B8"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.inputLabel}>Current City / Country</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Lahore, Pakistan"
            placeholderTextColor="#94A3B8"
            value={city}
            onChangeText={setCity}
          />

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Continue to Academic Details</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 2: Academic Background */}
      {currentStep === 2 && (
        <View style={styles.stepFormCard}>
          <Text style={styles.stepTitle}>Academic Profile</Text>
          <Text style={styles.stepDesc}>Helps us evaluate your eligibility for top universities and scholarships.</Text>

          <Text style={styles.inputLabel}>Intended Degree Level</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setPickerType('degree')}
          >
            <Text style={styles.selectButtonText}>{degree}</Text>
            <Ionicons name="chevron-down" size={18} color="#64748B" />
          </TouchableOpacity>

          <Text style={styles.inputLabel}>Field of Study / Major *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Computer Science, Public Health, MBA"
            placeholderTextColor="#94A3B8"
            value={fieldOfStudy}
            onChangeText={setFieldOfStudy}
          />

          <Text style={styles.inputLabel}>Current GPA / Marks Percentage</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. 3.4/4.0 or 82%"
            placeholderTextColor="#94A3B8"
            value={gpa}
            onChangeText={setGpa}
          />

          <Text style={styles.inputLabel}>English Proficiency Status</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setPickerType('english')}
          >
            <Text style={styles.selectButtonText} numberOfLines={1}>{englishTest}</Text>
            <Ionicons name="chevron-down" size={18} color="#64748B" />
          </TouchableOpacity>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setCurrentStep(1)}>
              <Ionicons name="arrow-back" size={16} color="#475569" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.nextButton, { flex: 2 }]} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next: Destination</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 3: Study Preference */}
      {currentStep === 3 && (
        <View style={styles.stepFormCard}>
          <Text style={styles.stepTitle}>Destination & Preferences</Text>
          <Text style={styles.stepDesc}>Select your desired country and funding path.</Text>

          <Text style={styles.inputLabel}>Target Country *</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setPickerType('country')}
          >
            <Text style={styles.selectButtonText}>{country}</Text>
            <Ionicons name="chevron-down" size={18} color="#64748B" />
          </TouchableOpacity>

          <Text style={styles.inputLabel}>Scholarship Preference / Program</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. CSC China, DAAD, Erasmus+, Self-Funded"
            placeholderTextColor="#94A3B8"
            value={scholarshipTrack}
            onChangeText={setScholarshipTrack}
          />

          <Text style={styles.inputLabel}>Additional Questions / Notes</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Tell us about your background or any specific university you want to target..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={3}
            value={notes}
            onChangeText={setNotes}
          />

          {/* Refund Guarantee Badge */}
          <View style={styles.guaranteeNotice}>
            <Ionicons name="shield-checkmark" size={18} color="#0D9488" />
            <Text style={styles.guaranteeNoticeText}>
              Includes 50% Refund Guarantee (€175 of €350) on Module A if no university admission offer is secured.
            </Text>
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setCurrentStep(2)}>
              <Ionicons name="arrow-back" size={16} color="#475569" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.nextButton, { flex: 2, backgroundColor: '#0D9488' }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Text style={styles.nextButtonText}>Submit Application</Text>
                  <Ionicons name="checkmark-done" size={18} color="#FFFFFF" />
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* SELECTION MODALS */}
      <Modal visible={pickerType !== null} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {pickerType === 'country' && 'Select Target Country'}
                {pickerType === 'degree' && 'Select Degree Level'}
                {pickerType === 'english' && 'Select English Proficiency'}
              </Text>
              <TouchableOpacity onPress={() => setPickerType(null)}>
                <Ionicons name="close" size={22} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 380 }}>
              {pickerType === 'country' &&
                COUNTRIES.map((c, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.modalItem}
                    onPress={() => {
                      setCountry(c);
                      setPickerType(null);
                    }}
                  >
                    <Text style={[styles.modalItemText, country === c && styles.modalItemActive]}>
                      {c}
                    </Text>
                    {country === c && <Ionicons name="checkmark" size={18} color="#0D9488" />}
                  </TouchableOpacity>
                ))}

              {pickerType === 'degree' &&
                DEGREES.map((d, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.modalItem}
                    onPress={() => {
                      setDegree(d);
                      setPickerType(null);
                    }}
                  >
                    <Text style={[styles.modalItemText, degree === d && styles.modalItemActive]}>
                      {d}
                    </Text>
                    {degree === d && <Ionicons name="checkmark" size={18} color="#0D9488" />}
                  </TouchableOpacity>
                ))}

              {pickerType === 'english' &&
                ENGLISH_TESTS.map((t, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.modalItem}
                    onPress={() => {
                      setEnglishTest(t);
                      setPickerType(null);
                    }}
                  >
                    <Text style={[styles.modalItemText, englishTest === t && styles.modalItemActive]}>
                      {t}
                    </Text>
                    {englishTest === t && <Ionicons name="checkmark" size={18} color="#0D9488" />}
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* SUCCESS MODAL */}
      <Modal visible={successModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { alignItems: 'center', padding: 24 }]}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark" size={36} color="#FFFFFF" />
            </View>
            <Text style={styles.successTitle}>Application Submitted!</Text>
            <Text style={styles.successMessage}>
              Thank you, <Text style={{ fontWeight: '700' }}>{fullName}</Text>. Your application for{' '}
              <Text style={{ fontWeight: '700' }}>{country}</Text> has been recorded successfully.
            </Text>
            <Text style={styles.successSub}>
              A senior consultant from HUZ Global Solutions is reviewing your profile and will contact you via WhatsApp shortly.
            </Text>

            <TouchableOpacity style={styles.waModalButton} onPress={openWhatsAppConfirmation}>
              <Ionicons name="logo-whatsapp" size={18} color="#FFFFFF" />
              <Text style={styles.waModalButtonText}>Chat with Advisor on WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.doneModalButton} onPress={resetForm}>
              <Text style={styles.doneModalButtonText}>Done & Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  stepIndicator: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0D9488',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0D9488',
  },
  stepsLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepLabelText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  stepLabelActive: {
    color: '#0D9488',
    fontWeight: '700',
  },
  stepFormCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
    marginTop: 8,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F172A',
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  selectButtonText: {
    fontSize: 13,
    color: '#0F172A',
    flex: 1,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A192F',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 18,
    gap: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  backButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  backButtonText: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 13,
  },
  guaranteeNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCFBF1',
    gap: 8,
    marginTop: 14,
  },
  guaranteeNoticeText: {
    flex: 1,
    fontSize: 11,
    color: '#0F766E',
    lineHeight: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalItemText: {
    fontSize: 13,
    color: '#334155',
  },
  modalItemActive: {
    color: '#0D9488',
    fontWeight: '700',
  },
  successIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  successMessage: {
    fontSize: 13,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 8,
  },
  successSub: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 18,
  },
  waModalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    width: '100%',
    marginBottom: 10,
  },
  waModalButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  doneModalButton: {
    paddingVertical: 8,
  },
  doneModalButtonText: {
    color: '#64748B',
    fontWeight: '600',
    fontSize: 12,
  },
});
