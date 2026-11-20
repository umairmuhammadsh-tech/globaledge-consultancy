import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Modal,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchApplications, updateApplicationStatus } from '../utils/api';

const PASSCODES = ['admin123', 'globaledge2025', 'huzglobal786'];
const STATUSES = ['All', 'New', 'Under Review', 'Interview Scheduled', 'Visa Processing', 'Enrolled'];

export default function AdminScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [statusModalApp, setStatusModalApp] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (PASSCODES.includes(passcode.trim())) {
      setIsAuthenticated(true);
      setPasscodeError(false);
      setPasscode('');
    } else {
      setPasscodeError(true);
    }
  };

  const loadData = async () => {
    setLoading(true);
    const data = await fetchApplications();
    setApplications(data || []);
    setLoading(false);
  };

  const handleStatusChange = async (appId, newStatus) => {
    setStatusModalApp(null);
    setLoading(true);
    const updated = await updateApplicationStatus(appId, newStatus);
    if (updated) {
      setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    }
    setLoading(false);
  };

  const handleCall = (phone) => {
    if (!phone) return;
    Linking.openURL(`tel:${phone.replace(/\s+/g, '')}`);
  };

  const handleWhatsApp = (phone, name) => {
    if (!phone) return;
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(`Hi ${name || 'Student'}, this is GlobalEdge Consultancy / HUZ Global Solutions regarding your study abroad application.`);
    Linking.openURL(`https://wa.me/${cleanPhone}?text=${text}`);
  };

  const handleEmail = (email, name) => {
    if (!email) return;
    const subject = encodeURIComponent('GlobalEdge Consultancy - Update on Your Admission Dossier');
    const body = encodeURIComponent(`Dear ${name},\n\nWe have reviewed your application at GlobalEdge Consultancy...`);
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  const filteredApps = applications.filter(a => {
    if (selectedStatus === 'All') return true;
    return (a.status || 'New') === selectedStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return { bg: '#EFF6FF', text: '#1D4ED8' };
      case 'Under Review': return { bg: '#FEF3C7', text: '#B45309' };
      case 'Interview Scheduled': return { bg: '#FAF5FF', text: '#7E22CE' };
      case 'Visa Processing': return { bg: '#ECFDF5', text: '#047857' };
      case 'Enrolled': return { bg: '#DCFCE7', text: '#15803D' };
      default: return { bg: '#F1F5F9', text: '#475569' };
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <View style={styles.loginContainer}>
        <View style={styles.loginCard}>
          <View style={styles.lockIconCircle}>
            <Ionicons name="lock-closed" size={32} color="#0D9488" />
          </View>
          <Text style={styles.loginTitle}>Admin Portal</Text>
          <Text style={styles.loginSubtitle}>
            Secure access to student applications & leads pipeline.
          </Text>

          <Text style={styles.passcodeLabel}>Enter Master Passcode</Text>
          <TextInput
            style={[styles.passcodeInput, passcodeError && styles.passcodeInputError]}
            placeholder="Enter passcode (e.g. admin123)"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            value={passcode}
            onChangeText={(t) => { setPasscode(t); setPasscodeError(false); }}
            onSubmitEditing={handleLogin}
          />

          {passcodeError && (
            <Text style={styles.errorText}>Invalid passcode. Please try again.</Text>
          )}

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Unlock Admin CRM</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.hintText}>
            Authorized for GlobalEdge / HUZ Global Solutions leadership.
          </Text>
        </View>
      </View>
    );
  }

  // Authenticated Portal
  return (
    <View style={styles.portalContainer}>
      {/* Top Bar */}
      <View style={styles.topToolbar}>
        <View>
          <Text style={styles.toolbarTitle}>Student Leads CRM</Text>
          <Text style={styles.toolbarCount}>{applications.length} Total Applicants Recorded</Text>
        </View>
        <View style={styles.toolbarActions}>
          <TouchableOpacity style={styles.toolBtn} onPress={loadData}>
            <Ionicons name="refresh" size={18} color="#0D9488" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolBtn} onPress={() => setIsAuthenticated(false)}>
            <Ionicons name="log-out-outline" size={18} color="#DC2626" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.statusScrollWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={STATUSES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.statusFilterPill, selectedStatus === item && styles.statusFilterActive]}
              onPress={() => setSelectedStatus(item)}
            >
              <Text style={[styles.statusFilterText, selectedStatus === item && styles.statusFilterTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#0D9488" />
          <Text style={styles.loadingText}>Loading applications...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredApps}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.leadList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="folder-open-outline" size={40} color="#94A3B8" />
              <Text style={styles.emptyText}>No applications found in this category.</Text>
            </View>
          }
          renderItem={({ item }) => {
            const statusStyle = getStatusColor(item.status || 'New');
            return (
              <View style={styles.appCard}>
                <View style={styles.appCardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.appStudentName}>{item.fullName}</Text>
                    <Text style={styles.appSubText}>
                      {item.city ? `${item.city} • ` : ''}
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}
                    onPress={() => setStatusModalApp(item)}
                  >
                    <Text style={[styles.statusBadgeText, { color: statusStyle.text }]}>
                      {item.status || 'New'} ▾
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Details */}
                <View style={styles.appDetailsGrid}>
                  <Text style={styles.appDetailLine}>
                    <Text style={styles.appDetailLabel}>Destination: </Text>
                    {item.country || 'Not specified'}
                  </Text>
                  <Text style={styles.appDetailLine}>
                    <Text style={styles.appDetailLabel}>Degree: </Text>
                    {item.degree || 'Degree'} {item.field ? `in ${item.field}` : ''}
                  </Text>
                  {item.gpa ? (
                    <Text style={styles.appDetailLine}>
                      <Text style={styles.appDetailLabel}>GPA/Marks: </Text>
                      {item.gpa}
                    </Text>
                  ) : null}
                  {item.scholarshipPreference ? (
                    <Text style={styles.appDetailLine}>
                      <Text style={styles.appDetailLabel}>Track: </Text>
                      {item.scholarshipPreference}
                    </Text>
                  ) : null}
                  {item.notes ? (
                    <Text style={styles.appNotesBox}>
                      💬 {item.notes}
                    </Text>
                  ) : null}
                </View>

                {/* Action Buttons: WhatsApp, Call, Email */}
                <View style={styles.appActionRow}>
                  <TouchableOpacity
                    style={[styles.appActionBtn, styles.waActionBtn]}
                    onPress={() => handleWhatsApp(item.phone, item.fullName)}
                  >
                    <Ionicons name="logo-whatsapp" size={15} color="#FFFFFF" />
                    <Text style={styles.waActionText}>WhatsApp</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.appActionBtn, styles.callActionBtn]}
                    onPress={() => handleCall(item.phone)}
                  >
                    <Ionicons name="call" size={15} color="#1E293B" />
                    <Text style={styles.callActionText}>Call</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.appActionBtn, styles.emailActionBtn]}
                    onPress={() => handleEmail(item.email, item.fullName)}
                  >
                    <Ionicons name="mail" size={15} color="#1E293B" />
                    <Text style={styles.emailActionText}>Email</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}

      {/* STATUS UPDATE MODAL */}
      <Modal visible={statusModalApp !== null} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.statusDialog}>
            <Text style={styles.statusDialogTitle}>
              Update Pipeline Status for {statusModalApp?.fullName}
            </Text>
            {STATUSES.filter(s => s !== 'All').map((st, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.statusChoice}
                onPress={() => handleStatusChange(statusModalApp.id, st)}
              >
                <Text style={styles.statusChoiceText}>{st}</Text>
                {statusModalApp?.status === st && (
                  <Ionicons name="checkmark-circle" size={18} color="#0D9488" />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.cancelBtn} onPress={() => setStatusModalApp(null)}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#0A192F',
    justifyContent: 'center',
    padding: 20,
  },
  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  lockIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  loginSubtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 18,
  },
  passcodeLabel: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  passcodeInput: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 8,
  },
  passcodeInputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 11,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D9488',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    gap: 8,
    marginTop: 6,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  hintText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 16,
  },
  portalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  topToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  toolbarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  toolbarCount: {
    fontSize: 11,
    color: '#64748B',
  },
  toolbarActions: {
    flexDirection: 'row',
    gap: 8,
  },
  toolBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusScrollWrapper: {
    marginBottom: 10,
  },
  statusFilterPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 6,
  },
  statusFilterActive: {
    backgroundColor: '#0A192F',
    borderColor: '#0A192F',
  },
  statusFilterText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  statusFilterTextActive: {
    color: '#FFFFFF',
  },
  loadingBox: {
    marginTop: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 12,
    color: '#64748B',
  },
  emptyBox: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 13,
    color: '#94A3B8',
  },
  leadList: {
    paddingBottom: 90,
  },
  appCard: {
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
  appCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  appStudentName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  appSubText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  appDetailsGrid: {
    marginBottom: 12,
  },
  appDetailLine: {
    fontSize: 12,
    color: '#334155',
    marginBottom: 3,
  },
  appDetailLabel: {
    fontWeight: '600',
    color: '#64748B',
  },
  appNotesBox: {
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 6,
    fontSize: 11,
    color: '#475569',
    marginTop: 4,
  },
  appActionRow: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  appActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    gap: 5,
  },
  waActionBtn: {
    backgroundColor: '#10B981',
  },
  waActionText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
  callActionBtn: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  callActionText: {
    color: '#1E293B',
    fontWeight: '600',
    fontSize: 11,
  },
  emailActionBtn: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emailActionText: {
    color: '#1E293B',
    fontWeight: '600',
    fontSize: 11,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  statusDialog: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
  },
  statusDialogTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },
  statusChoice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  statusChoiceText: {
    fontSize: 13,
    color: '#334155',
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  cancelBtnText: {
    color: '#64748B',
    fontWeight: '600',
    fontSize: 13,
  },
});
