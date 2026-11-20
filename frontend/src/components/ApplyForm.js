'use client'

import { useState } from 'react'
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const countries = ['United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'New Zealand']
const services = [
  'University Admissions',
  'Visa Guidance',
  'Scholarship Hunting',
  'Test Prep (IELTS/TOEFL/GRE)',
  'Career Counseling',
  'Full Package',
]
const educationLevels = ['High School', 'Bachelor\'s', 'Master\'s', 'PhD', 'Diploma / Certificate']
const intakeOptions = ['September 2025', 'January 2026', 'September 2026', 'January 2027', 'Flexible']

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  desiredCountry: '',
  service: '',
  educationLevel: '',
  intake: '',
  gpa: '',
  testScore: '',
  message: '',
  consent: false,
}

export default function ApplyForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [step, setStep] = useState(1)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const validateStep = (s) => {
    if (s === 1) {
      return form.firstName && form.lastName && form.email && form.phone
    }
    if (s === 2) {
      return form.desiredCountry && form.service && form.educationLevel && form.intake
    }
    return true
  }

  const handleNext = () => {
    if (validateStep(step)) setStep(step + 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.consent) {
      setErrorMsg('Please agree to our privacy policy to continue.')
      return
    }
    setStatus('loading')
    setErrorMsg('')

    try {
      const endpoint = API_URL && API_URL.startsWith('http') && !API_URL.includes('localhost') 
        ? `${API_URL}/api/applications` 
        : '/api/applications'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Submission failed. Please try again.')
      }

      setStatus('success')
      setForm(initialForm)
      setStep(1)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again later.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-3xl shadow-card p-10 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-green-500 text-4xl" />
        </div>
        <h3 className="text-2xl font-bold text-primary font-heading mb-3">Application Submitted!</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Thank you! Our team will review your application and contact you within 24–48 hours for a
          free consultation session.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-primary py-3 px-8"
        >
          Submit Another Application
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-card overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gradient-primary p-6">
        <div className="flex items-center justify-between mb-4">
          {['Personal Info', 'Study Plans', 'Review'].map((label, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step > i + 1
                    ? 'bg-green-400 text-white'
                    : step === i + 1
                    ? 'bg-gold text-primary'
                    : 'bg-white/20 text-white'
                }`}
              >
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`ml-2 text-sm hidden sm:block ${step === i + 1 ? 'text-gold font-semibold' : 'text-white/60'}`}>
                {label}
              </span>
              {i < 2 && (
                <div className={`h-0.5 w-8 sm:w-16 mx-3 transition-all ${step > i + 1 ? 'bg-green-400' : 'bg-white/20'}`} />
              )}
            </div>
          ))}
        </div>
        <h3 className="text-white font-semibold text-lg font-heading">
          {step === 1 && 'Personal Information'}
          {step === 2 && 'Study Preferences'}
          {step === 3 && 'Review & Submit'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="label">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Doe"
                  required
                />
              </div>
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
            <div>
              <label className="label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="+1 234 567 890"
                required
              />
            </div>
            <div>
              <label className="label">Country of Residence</label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. Pakistan, India, Nigeria..."
              />
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={!validateStep(1)}
              className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 2: Study Plans */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <label className="label">Desired Study Destination *</label>
              <select
                name="desiredCountry"
                value={form.desiredCountry}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select a country...</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Service Needed *</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select a service...</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label">Education Level *</label>
                <select
                  name="educationLevel"
                  value={form.educationLevel}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select level...</option>
                  {educationLevels.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Target Intake *</label>
                <select
                  name="intake"
                  value={form.intake}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select intake...</option>
                  {intakeOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label">Current GPA / Percentage</label>
                <input
                  type="text"
                  name="gpa"
                  value={form.gpa}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. 3.5 / 4.0 or 85%"
                />
              </div>
              <div>
                <label className="label">Test Score (if any)</label>
                <input
                  type="text"
                  name="testScore"
                  value={form.testScore}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. IELTS 7.0, GRE 320"
                />
              </div>
            </div>
            <div>
              <label className="label">Additional Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                className="input-field resize-none"
                placeholder="Tell us more about your goals and any specific requirements..."
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 btn-secondary py-4">
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!validateStep(2)}
                className="flex-1 btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Review →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div className="bg-gray-50 rounded-2xl p-5 space-y-3 text-sm">
              <h4 className="font-semibold text-primary font-heading">Application Summary</h4>
              {[
                ['Name', `${form.firstName} ${form.lastName}`],
                ['Email', form.email],
                ['Phone', form.phone],
                ['Country', form.country || '—'],
                ['Destination', form.desiredCountry],
                ['Service', form.service],
                ['Education Level', form.educationLevel],
                ['Target Intake', form.intake],
                ['GPA', form.gpa || '—'],
                ['Test Score', form.testScore || '—'],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-800">{val}</span>
                </div>
              ))}
            </div>

            {form.message && (
              <div className="bg-gray-50 rounded-xl p-4 text-sm">
                <p className="text-gray-500 mb-1 font-medium">Message:</p>
                <p className="text-gray-700">{form.message}</p>
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                className="mt-1 w-4 h-4 accent-gold"
              />
              <span className="text-sm text-gray-600">
                I agree to GlobalEdge Consultancy's{' '}
                <a href="#" className="text-gold hover:underline font-medium">Privacy Policy</a>{' '}
                and consent to being contacted regarding my application.
              </span>
            </label>

            {errorMsg && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                <FaExclamationCircle className="flex-shrink-0" />
                {errorMsg}
              </div>
            )}

            {status === 'error' && !errorMsg && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                <FaExclamationCircle className="flex-shrink-0" />
                Submission failed. Please check your connection and try again.
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 btn-secondary py-4">
                ← Back
              </button>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex-1 btn-primary py-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <FaSpinner className="animate-spin" /> Submitting...
                  </>
                ) : (
                  'Submit Application 🚀'
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
