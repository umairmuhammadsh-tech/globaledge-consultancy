// In-memory store for demo / serverless runtime
// Applications and Contacts
let globalApplications = [
  {
    id: 'APP-1001',
    firstName: 'Ahmed',
    lastName: 'Raza',
    email: 'ahmed.raza@example.com',
    phone: '+92 300 1234567',
    country: 'Pakistan',
    desiredCountry: 'Germany',
    service: 'Scholarship Hunting',
    educationLevel: "Bachelor's",
    intake: 'September 2025',
    gpa: '3.75',
    testScore: 'IELTS 7.5',
    message: 'Looking for fully funded DAAD master programs in Computer Science.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'APP-1002',
    firstName: 'Fatima',
    lastName: 'Noor',
    email: 'fatima.noor@example.com',
    phone: '+92 321 9876543',
    country: 'Pakistan',
    desiredCountry: 'China',
    service: 'University Admissions',
    educationLevel: "Master's",
    intake: 'September 2025',
    gpa: '3.89',
    testScore: 'GRE 320',
    message: 'Applying for CSC / ANSO PhD scholarships in Biomedical Sciences.',
    status: 'in-review',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 'APP-1003',
    firstName: 'Muhammad',
    lastName: 'Ali',
    email: 'm.ali@example.com',
    phone: '+92 333 5551212',
    country: 'Pakistan',
    desiredCountry: 'Japan',
    service: 'Visa Guidance',
    educationLevel: 'High School',
    intake: 'January 2026',
    gpa: '88%',
    testScore: 'TOEFL 98',
    message: 'Interested in MEXT Undergraduate scholarship track.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
]

let globalContacts = [
  {
    id: 'MSG-2001',
    name: 'Hamza Tariq',
    email: 'hamza.tariq@example.com',
    phone: '+92 313 4443322',
    subject: 'Scholarship Inquiry',
    message: 'Can I apply for Türkiye Bursları if my graduation result is pending next month?',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'unread',
  },
  {
    id: 'MSG-2002',
    name: 'Zainab Bibi',
    email: 'zainab.b@example.com',
    phone: '+92 345 6789012',
    subject: 'Visa Guidance',
    message: 'Need help reviewing my Erasmus statement of purpose before next week deadline.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: 'read',
  },
]

export function getApplications() {
  return globalApplications
}

export function addApplication(app) {
  const newApp = {
    id: `APP-${Date.now().toString().slice(-4)}`,
    ...app,
    status: 'new',
    createdAt: new Date().toISOString(),
  }
  globalApplications.unshift(newApp)
  return newApp
}

export function updateApplicationStatus(id, status) {
  const index = globalApplications.findIndex((a) => a.id === id)
  if (index !== -1) {
    globalApplications[index].status = status
    return globalApplications[index]
  }
  return null
}

export function deleteApplication(id) {
  globalApplications = globalApplications.filter((a) => a.id !== id)
  return true
}

export function getContacts() {
  return globalContacts
}

export function addContact(msg) {
  const newMsg = {
    id: `MSG-${Date.now().toString().slice(-4)}`,
    ...msg,
    status: 'unread',
    createdAt: new Date().toISOString(),
  }
  globalContacts.unshift(newMsg)
  return newMsg
}

export function updateContactStatus(id, status) {
  const index = globalContacts.findIndex((c) => c.id === id)
  if (index !== -1) {
    globalContacts[index].status = status
    return globalContacts[index]
  }
  return null
}
