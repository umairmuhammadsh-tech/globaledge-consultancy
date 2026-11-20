'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState } from 'react'
import {
  FaMobileAlt,
  FaQrcode,
  FaDownload,
  FaCheckCircle,
  FaWhatsapp,
  FaLock,
  FaGraduationCap,
  FaExternalLinkAlt,
  FaFilePdf,
  FaPhone
} from 'react-icons/fa'

export default function MobileAppPage() {
  const [deviceView, setDeviceView] = useState('iphone') // 'iphone' | 'android'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-800 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <FaMobileAlt /> Official Cross-Platform Mobile Application
          </div>
          <h1 className="text-4xl font-extrabold text-primary sm:text-5xl tracking-tight">
            GlobalEdge in Your Pocket
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Apply for international universities, explore 19+ fully funded scholarships, track your visa status, and chat directly with counselors — all from your mobile phone.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 text-base hover:-translate-y-0.5"
            >
              <FaExternalLinkAlt /> Launch Mobile App in Browser
            </a>
            <a
              href="https://wa.me/923124718386?text=Hi%20GlobalEdge,%20please%20send%20me%20the%20mobile%20app%20link."
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 text-base hover:-translate-y-0.5"
            >
              <FaWhatsapp size={20} /> Get App Link on WhatsApp
            </a>
          </div>
        </div>

        {/* Live Mobile Interactive Demo + Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start my-8">
          {/* Left Column: Mobile App Interactive Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative border-[10px] border-gray-900 rounded-[48px] overflow-hidden shadow-2xl bg-black w-[340px] h-[680px]">
              {/* Speaker notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-36 bg-gray-900 rounded-b-xl z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-gray-700 rounded-full" />
              </div>

              {/* Live Web App Iframe */}
              <iframe
                src="/app"
                title="GlobalEdge Mobile App"
                className="w-full h-full border-0 pt-4"
                allow="camera; microphone; geolocation"
              />
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              💡 Interactive live mobile preview. Tap tabs, buttons, or forms to test live!
            </p>
          </div>

          {/* Right Column: Key Capabilities & Architecture */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-teal-600" /> Complete Mobile Feature Suite
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">19+ Scholarships Directory</h3>
                    <p className="text-xs text-gray-600">Search CSC, DAAD, MEXT, GKS, Open Doors, and direct official links.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">3-Step Assessment Form</h3>
                    <p className="text-xs text-gray-600">Students apply in 60 seconds with instant sync to the admin database.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Fees & 50% Refund Guarantee</h3>
                    <p className="text-xs text-gray-600">Clear breakdown of €350, €400, €500 modules and 10% discount bundle.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Legal Contract Downloads</h3>
                    <p className="text-xs text-gray-600">1-tap download of official PDF and Word (.docx) bilateral contracts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Built-in Mobile Admin CRM</h3>
                    <p className="text-xs text-gray-600">Passcode-protected portal to manage leads, dial students, and WhatsApp.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Offline Resilience</h3>
                    <p className="text-xs text-gray-600">Local fallback cache prevents lead loss in poor network conditions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Install as PWA on Phone */}
            <div className="bg-gradient-to-br from-primary to-slate-900 text-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                📲 How to Install on Your Smartphone (0 MB Download)
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-gold">Android (Chrome):</span>
                  <span>Open <code className="text-xs bg-slate-800 px-2 py-0.5 rounded text-white">frontend-mu-five-97.vercel.app/app</code>, tap the 3 dots (⋮), and select <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-gold">iOS (Safari):</span>
                  <span>Open in Safari, tap the Share icon (<code className="text-xs bg-slate-800 px-2 py-0.5 rounded text-white">⎋</code>), and tap <strong>"Add to Home Screen"</strong>.</span>
                </div>
              </div>
            </div>

            {/* Running with React Native / Expo Native Source */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                ⚡ Native React Native / Expo Developer Project
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                The complete native mobile source code is located in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-primary font-mono font-semibold">/mobile</code> directory of the repository.
              </p>
              <div className="bg-slate-900 text-gray-200 rounded-xl p-4 font-mono text-xs space-y-2 overflow-x-auto">
                <p className="text-emerald-400"># 1. Navigate to mobile directory</p>
                <p>cd mobile</p>
                <p className="text-emerald-400"># 2. Run with Expo Go (Scan QR code on iPhone or Android)</p>
                <p>npx expo start</p>
                <p className="text-emerald-400"># 3. Build standalone Android APK / iOS bundle</p>
                <p>npx eas build -p android --profile preview</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
