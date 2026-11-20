'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaDownload,
  FaLock,
  FaSignOutAlt,
  FaFilter,
  FaUser,
  FaTrashAlt,
  FaExchangeAlt,
  FaFileAlt,
  FaChartLine,
} from 'react-icons/fa'

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [authError, setAuthError] = useState('')

  const [activeTab, setActiveTab] = useState('applications') // applications | messages
  const [applications, setApplications] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)

  // Check session storage for admin session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('globaledge_admin_auth')
    if (sessionAuth === 'true') {
      setIsAuthenticated(true)
      loadData()
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    // Secure default admin access key
    if (passwordInput === 'admin123' || passwordInput === 'globaledge2025' || passwordInput === 'huzglobal786') {
      setIsAuthenticated(true)
      sessionStorage.setItem('globaledge_admin_auth', 'true')
      setAuthError('')
      loadData()
    } else {
      setAuthError('Invalid Admin Passcode. Try: admin123')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('globaledge_admin_auth')
    setIsAuthenticated(false)
    setPasswordInput('')
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const [appRes, msgRes] = await Promise.all([
        fetch('/api/applications'),
        fetch('/api/contact'),
      ])
      const appData = await appRes.json()
      const msgData = await msgRes.json()
      if (appData.success) setApplications(appData.data || [])
      if (msgData.success) setMessages(msgData.data || [])
    } catch (e) {
      console.error('Error fetching admin data:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, newStatus, type = 'app') => {
    try {
      const endpoint = type === 'app' ? '/api/applications' : '/api/contact'
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      const result = await res.json()
      if (result.success) {
        if (type === 'app') {
          setApplications((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
          )
          if (selectedItem && selectedItem.id === id) {
            setSelectedItem((prev) => ({ ...prev, status: newStatus }))
          }
        } else {
          setMessages((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
          )
        }
      }
    } catch (e) {
      console.error('Error updating status:', e)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this record?')) return
    try {
      const res = await fetch(`/api/applications?id=${id}`, { method: 'DELETE' })
      const result = await res.json()
      if (result.success) {
        setApplications((prev) => prev.filter((a) => a.id !== id))
        if (selectedItem?.id === id) setSelectedItem(null)
      }
    } catch (e) {
      console.error('Error deleting record:', e)
    }
  }

  const exportToCSV = () => {
    const data = activeTab === 'applications' ? applications : messages
    if (!data.length) return alert('No data to export')

    const headers = Object.keys(data[0]).join(',')
    const rows = data.map((obj) =>
      Object.values(obj)
        .map((val) => `"${String(val || '').replace(/"/g, '""')}"`)
        .join(',')
    )
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `globaledge_${activeTab}_export.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filter items
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      `${app.firstName} ${app.lastName} ${app.email} ${app.phone} ${app.desiredCountry} ${app.service}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredMessages = messages.filter((msg) => {
    return `${msg.name} ${msg.email} ${msg.phone} ${msg.subject} ${msg.message}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  })

  // Login view if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-[#0f1e33] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-gold text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-primary font-heading">GlobalEdge Executive Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Lead Management & Student Applications Control</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Portal Security Passcode
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin passcode (e.g. admin123)"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm transition-all"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-gold to-gold-dark text-primary font-bold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all text-sm"
            >
              Unlock Admin Portal
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-primary transition-colors">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-primary text-white border-b border-primary-light sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gold rounded-xl flex items-center justify-center text-primary font-bold text-sm shadow-md">
              GE
            </div>
            <div>
              <span className="font-bold font-heading text-lg tracking-tight">GlobalEdge</span>
              <span className="text-gold font-heading font-semibold ml-1.5 text-xs bg-gold/20 px-2 py-0.5 rounded-full border border-gold/30">
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/LEGAL_STUDENT_CONTRACT.pdf"
              download
              className="flex items-center gap-1.5 bg-gold/20 border border-gold/40 text-gold hover:bg-gold hover:text-primary px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              title="Download legal student contract PDF"
            >
              <FaDownload size={11} /> Contract (PDF)
            </a>
            <a
              href="/LEGAL_STUDENT_CONTRACT.docx"
              download
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              title="Download legal student contract in Word format"
            >
              <FaFileAlt size={11} /> Word (.docx)
            </a>
            <Link
              href="/"
              target="_blank"
              className="text-xs text-blue-200 hover:text-white transition-colors hidden md:inline ml-2"
            >
              View Public Website ↗
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Total Applicants</p>
                <h3 className="text-2xl font-bold text-primary font-heading mt-1">{applications.length}</h3>
              </div>
              <div className="w-10 h-10 bg-blue-50 text-primary rounded-xl flex items-center justify-center">
                <FaUserGraduate size={18} />
              </div>
            </div>
            <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
              <FaChartLine /> Real-time applicants recorded
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Inquiries / Messages</p>
                <h3 className="text-2xl font-bold text-primary font-heading mt-1">{messages.length}</h3>
              </div>
              <div className="w-10 h-10 bg-amber-50 text-gold-dark rounded-xl flex items-center justify-center">
                <FaEnvelope size={18} />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Website contact leads</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">New / Unaddressed</p>
                <h3 className="text-2xl font-bold text-amber-600 font-heading mt-1">
                  {applications.filter((a) => a.status === 'new').length}
                </h3>
              </div>
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <FaClock size={18} />
              </div>
            </div>
            <p className="text-xs text-amber-600 mt-2">Requires counseling call</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Admissions & Visa</p>
                <h3 className="text-2xl font-bold text-emerald-600 font-heading mt-1">
                  {applications.filter((a) => a.status === 'enrolled' || a.status === 'contacted').length}
                </h3>
              </div>
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <FaCheckCircle size={18} />
              </div>
            </div>
            <p className="text-xs text-emerald-600 mt-2">Active pipeline status</p>
          </div>
        </div>

        {/* Tab & Controls Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
            <button
              onClick={() => {
                setActiveTab('applications')
                setSelectedItem(null)
              }}
              className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'applications'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              🎓 Student Applications ({applications.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('messages')
                setSelectedItem(null)
              }}
              className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'messages'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              ✉️ Contact Inquiries ({messages.length})
            </button>
          </div>

          {/* Search & Filter & Export */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <FaSearch className="absolute left-3 top-3 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Search by name, email, country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
            </div>

            {activeTab === 'applications' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="in-review">In Review</option>
                <option value="contacted">Contacted</option>
                <option value="enrolled">Enrolled</option>
              </select>
            )}

            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            >
              <FaDownload size={11} /> Export CSV
            </button>
          </div>
        </div>

        {/* Content Area: Table + Detail Drawer */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Table */}
          <div className={`${selectedItem ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden`}>
            {loading ? (
              <div className="p-12 text-center text-gray-400 text-sm">Loading real-time records...</div>
            ) : activeTab === 'applications' ? (
              filteredApplications.length === 0 ? (
                <div className="p-12 text-center text-gray-400 text-sm">
                  No applications found matching criteria.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase font-semibold">
                        <th className="py-3 px-4">Student</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Destination</th>
                        <th className="py-3 px-4">Service</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredApplications.map((app) => (
                        <tr
                          key={app.id}
                          onClick={() => setSelectedItem(app)}
                          className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${
                            selectedItem?.id === app.id ? 'bg-blue-50' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4 font-semibold text-primary">
                            <div>{app.firstName} {app.lastName}</div>
                            <div className="text-[10px] text-gray-400 font-normal">ID: {app.id}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-gray-700 font-medium">{app.phone}</div>
                            <div className="text-gray-400 text-[11px]">{app.email}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block bg-primary/5 text-primary px-2 py-0.5 rounded font-medium">
                              {app.desiredCountry || 'Flexible'}
                            </span>
                            <div className="text-[10px] text-gray-400">{app.intake}</div>
                          </td>
                          <td className="py-3.5 px-4 text-gray-600">
                            {app.service}
                            <div className="text-[10px] text-gray-400">{app.educationLevel}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                app.status === 'new'
                                  ? 'bg-amber-100 text-amber-700'
                                  : app.status === 'in-review'
                                  ? 'bg-blue-100 text-blue-700'
                                  : app.status === 'contacted'
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-emerald-100 text-emerald-700'
                              }`}
                            >
                              {app.status || 'new'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleDelete(app.id)}
                              className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                              title="Delete record"
                            >
                              <FaTrashAlt size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              /* Contact Messages Tab */
              filteredMessages.length === 0 ? (
                <div className="p-12 text-center text-gray-400 text-sm">No inquiries recorded yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase font-semibold">
                        <th className="py-3 px-4">Sender</th>
                        <th className="py-3 px-4">Subject</th>
                        <th className="py-3 px-4">Message Snippet</th>
                        <th className="py-3 px-4">Received</th>
                        <th className="py-3 px-4">Quick Dial</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredMessages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-gray-50">
                          <td className="py-3.5 px-4 font-semibold text-primary">
                            <div>{msg.name}</div>
                            <div className="text-gray-400 text-[11px] font-normal">{msg.email}</div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-gray-800">{msg.subject}</td>
                          <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate">{msg.message}</td>
                          <td className="py-3.5 px-4 text-gray-400 text-[11px]">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <a
                              href={`tel:${msg.phone}`}
                              className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-2.5 py-1 rounded font-medium inline-flex items-center gap-1"
                            >
                              <FaPhone size={10} /> {msg.phone}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>

          {/* Right Detail Inspection Card */}
          {selectedItem && (
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 flex flex-col h-fit sticky top-24">
              <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-100">
                <div>
                  <span className="text-xs font-bold text-gold uppercase tracking-wider">Candidate Profile</span>
                  <h3 className="text-lg font-bold text-primary font-heading">
                    {selectedItem.firstName} {selectedItem.lastName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600 text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-gray-400 block font-medium">Direct Phone & WhatsApp</span>
                  <a
                    href={`https://wa.me/${selectedItem.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 font-bold text-sm hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <FaPhone size={11} /> {selectedItem.phone} (Click to WhatsApp)
                  </a>
                </div>

                <div>
                  <span className="text-gray-400 block font-medium">Email Address</span>
                  <a
                    href={`mailto:${selectedItem.email}`}
                    className="text-primary font-semibold hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <FaEnvelope size={11} /> {selectedItem.email}
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-gray-400 block font-medium">Target Country</span>
                    <span className="font-semibold text-gray-800">{selectedItem.desiredCountry || 'Flexible'}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium">Desired Intake</span>
                    <span className="font-semibold text-gray-800">{selectedItem.intake || 'Flexible'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-400 block font-medium">Current Degree</span>
                    <span className="font-semibold text-gray-800">{selectedItem.educationLevel}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium">GPA / Grade</span>
                    <span className="font-semibold text-gray-800">{selectedItem.gpa || 'Not provided'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-gray-400 block font-medium">English Test Score</span>
                  <span className="font-semibold text-gray-800">{selectedItem.testScore || 'Pending / In-prep'}</span>
                </div>

                <div>
                  <span className="text-gray-400 block font-medium">Service Requested</span>
                  <span className="inline-block bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-md mt-1">
                    {selectedItem.service}
                  </span>
                </div>

                {selectedItem.message && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-500 font-bold block mb-1">Student Inquiry Note:</span>
                    <p className="text-gray-700 italic leading-relaxed">{selectedItem.message}</p>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100">
                  <label className="text-gray-500 font-bold block mb-1.5">Update Pipeline Status:</label>
                  <select
                    value={selectedItem.status || 'new'}
                    onChange={(e) => handleStatusChange(selectedItem.id, e.target.value, 'app')}
                    className="w-full py-2 px-3 border border-gray-200 rounded-xl font-semibold text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="new">🟡 New Application</option>
                    <option value="in-review">🔵 Profile In Review</option>
                    <option value="contacted">🟣 Counselor Contacted</option>
                    <option value="enrolled">🟢 Enrolled & Processing</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
