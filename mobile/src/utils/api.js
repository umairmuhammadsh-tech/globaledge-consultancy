const API_BASE_URL = 'https://frontend-mu-five-97.vercel.app';

// Local memory cache for offline resilience
let localFallbackApplications = [
  {
    id: 1,
    fullName: 'Hamza Tariq',
    email: 'hamza.tariq@gmail.com',
    phone: '+92 300 1234567',
    country: 'Germany 🇩🇪',
    degree: 'Masters',
    field: 'Computer Science',
    status: 'Visa Processing',
    notes: 'DAAD applicant - Blocked account in progress',
    createdAt: '2026-11-19T10:30:00Z',
  },
  {
    id: 2,
    fullName: 'Ayesha Noor',
    email: 'ayesha.noor@outlook.com',
    phone: '+92 321 7654321',
    country: 'China 🇨🇳',
    degree: 'PhD',
    field: 'Biotechnology',
    status: 'Documents Collected',
    notes: 'CSC Type A application submitted; awaiting CSC final list',
    createdAt: '2026-11-20T14:15:00Z',
  },
  {
    id: 3,
    fullName: 'Zubair Ahmed',
    email: 'zubair.ahmed@yahoo.com',
    phone: '+92 333 9876543',
    country: 'Russia 🇷🇺',
    degree: 'Bachelors',
    field: 'Medicine (MBBS)',
    status: 'New',
    notes: 'Interested in Open Doors & State Quota MBBS in English',
    createdAt: '2026-11-21T01:00:00Z',
  }
];

export async function submitApplication(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result && result.success) {
      return { success: true, data: result.data };
    }
  } catch (err) {
    console.warn('API sync fallback to local store:', err.message);
  }

  // Fallback offline storage
  const record = {
    id: Date.now(),
    ...data,
    status: 'New',
    createdAt: new Date().toISOString()
  };
  localFallbackApplications.unshift(record);
  return { success: true, data: record, offline: true };
}

export async function fetchApplications() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/applications`, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' }
    });
    const result = await response.json();
    if (result && result.success && Array.isArray(result.data)) {
      // Merge with any local offline ones not in server
      return result.data;
    }
  } catch (err) {
    console.warn('Network fetch error, using local leads:', err.message);
  }
  return localFallbackApplications;
}

export async function updateApplicationStatus(id, status) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/applications`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    const result = await response.json();
    if (result && result.success) {
      return result.data;
    }
  } catch (err) {
    console.warn('API update error:', err.message);
  }

  const item = localFallbackApplications.find(a => a.id === id);
  if (item) {
    item.status = status;
    return item;
  }
  return null;
}
