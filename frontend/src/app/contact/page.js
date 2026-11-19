'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
} from 'react-icons/fa'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const subjects = [
  'University Admissions',
  'Visa Guidance',
  'Scholarship Inquiry',
  'Test Preparation',
  'Career Counseling',
  'General Inquiry',
  'Feedback / Complaint',
]

export default function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Failed to send message.')
      }

      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again later.')
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-block bg-gold/20 text-gold border border-gold/30 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
              💬 We'd Love to Hear from You
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-5">
              Contact Us
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Have a question or want to book a free consultation? Our team is ready to help you
              take the first step toward your international education dream.
            </p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Left: Contact Info */}
              <div className="space-y-6">
                {/* Info Cards */}
                {[
                  {
                    icon: FaPhone,
                    title: 'Phone',
                    lines: ['+1 (234) 567-890', '+1 (234) 567-891'],
                    type: 'tel',
                    links: ['tel:+1234567890', 'tel:+1234567891'],
                  },
                  {
                    icon: FaEnvelope,
                    title: 'Email',
                    lines: ['info@globaledge.com', 'admissions@globaledge.com'],
                    type: 'email',
                    links: ['mailto:info@globaledge.com', 'mailto:admissions@globaledge.com'],
                  },
                  {
                    icon: FaMapMarkerAlt,
                    title: 'Office Address',
                    lines: ['123 Education Avenue, Suite 400', 'New York, NY 10001, USA'],
                    type: 'text',
                    links: null,
                  },
                  {
                    icon: FaClock,
                    title: 'Office Hours',
                    lines: ['Mon – Fri: 9:00 AM – 6:00 PM', 'Saturday: 10:00 AM – 4:00 PM'],
                    type: 'text',
                    links: null,
                  },
                ].map(({ icon: Icon, title, lines, links }, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                        <Icon className="text-primary" size={18} />
                      </div>
                      <h3 className="font-semibold text-primary">{title}</h3>
                    </div>
                    {lines.map((line, j) => (
                      links ? (
                        <a key={j} href={links[j]} className="block text-gray-600 text-sm hover:text-gold transition-colors">
                          {line}
                        </a>
                      ) : (
                        <p key={j} className="text-gray-600 text-sm">{line}</p>
                      )
                    ))}
                  </div>
                ))}

                {/* Social Links */}
                <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
                  <h3 className="font-semibold text-primary mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: FaFacebook, href: '#', color: 'hover:bg-blue-600' },
                      { icon: FaTwitter, href: '#', color: 'hover:bg-sky-500' },
                      { icon: FaInstagram, href: '#', color: 'hover:bg-pink-600' },
                      { icon: FaLinkedin, href: '#', color: 'hover:bg-blue-700' },
                    ].map(({ icon: Icon, href, color }, i) => (
                      <a
                        key={i}
                        href={href}
                        className={`w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center ${color} hover:text-white transition-all`}
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl shadow-card p-8">
                  <h2 className="text-2xl font-bold text-primary font-heading mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-500 text-sm mb-7">
                    Fill out the form and we'll get back to you within 24 hours.
                  </p>

                  {status === 'success' ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                        <FaCheckCircle className="text-green-500 text-4xl" />
                      </div>
                      <h3 className="text-xl font-bold text-primary font-heading mb-2">Message Sent!</h3>
                      <p className="text-gray-500 mb-6">We'll get back to you within 24 hours.</p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="btn-primary py-3 px-8"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="label">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <label className="label">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="label">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="+1 234 567 890"
                          />
                        </div>
                        <div>
                          <label className="label">Subject *</label>
                          <select
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className="input-field"
                            required
                          >
                            <option value="">Select a subject...</option>
                            {subjects.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="label">Message *</label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={6}
                          className="input-field resize-none"
                          placeholder="Tell us how we can help you..."
                          required
                        />
                      </div>

                      {errorMsg && (
                        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                          <FaExclamationCircle className="flex-shrink-0" />
                          {errorMsg}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full btn-primary py-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {status === 'loading' ? (
                          <>
                            <FaSpinner className="animate-spin" /> Sending...
                          </>
                        ) : (
                          'Send Message ✉️'
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="h-72 bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
            <div className="text-center">
              <p className="text-5xl mb-3">📍</p>
              <p className="text-primary font-semibold">123 Education Avenue, Suite 400</p>
              <p className="text-gray-600 text-sm">New York, NY 10001, USA</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 btn-primary py-2 px-6 text-sm"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
