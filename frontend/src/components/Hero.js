'use client'

import Link from 'next/link'
import { FaArrowRight, FaPlay, FaStar } from 'react-icons/fa'
import { useState } from 'react'

const stats = [
  { number: '10,000+', label: 'Students Placed' },
  { number: '98%', label: 'Visa Success Rate' },
  { number: '50+', label: 'Partner Universities' },
  { number: '15+', label: 'Years Experience' },
]

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-40 w-48 h-48 bg-blue-400 rounded-full blur-2xl" />
      </div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/30 rounded-full blur-3xl" />

      {/* Floating dots pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm text-gray-200">Trusted by 10,000+ Students Worldwide</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold font-heading leading-tight mb-6">
              Your Gateway to{' '}
              <span className="text-gold">World-Class</span>{' '}
              Education
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
              GlobalEdge Consultancy is your trusted partner for studying abroad. We provide
              expert guidance on university admissions, visa support, scholarships, and test
              preparation to help you achieve your academic dreams.
            </p>

            {/* Star rating */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-gold" size={18} />
                ))}
              </div>
              <span className="text-gray-300 text-sm">
                <span className="text-white font-semibold">4.9/5</span> from 2,500+ reviews
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/apply" className="btn-primary text-center text-base py-4 px-8 flex items-center justify-center gap-2 group">
                Start Your Journey
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-3 text-white hover:text-gold transition-colors group"
              >
                <span className="w-12 h-12 bg-white/10 hover:bg-gold/20 border border-white/30 rounded-full flex items-center justify-center transition-all group-hover:scale-110">
                  <FaPlay size={14} className="ml-0.5" />
                </span>
                <span className="font-medium">Watch Our Story</span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
              {stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-2xl font-bold text-gold font-heading">{stat.number}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Visual Card Stack */}
          <div className="hidden lg:flex justify-center items-center relative">
            {/* Main card */}
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 w-80 float-animation">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm">Application Status</p>
                  <p className="text-xs text-gray-500">Harvard University</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { step: 'Documents Submitted', done: true },
                  { step: 'Visa Application', done: true },
                  { step: 'University Acceptance', done: true },
                  { step: 'Flight Booked', done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.done ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    >
                      {item.done && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span
                      className={`text-sm ${
                        item.done ? 'text-gray-700 line-through' : 'text-gray-400'
                      }`}
                    >
                      {item.step}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 rounded-xl p-3 flex items-center gap-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <p className="text-xs font-semibold text-green-700">Congratulations!</p>
                  <p className="text-xs text-green-600">Your visa has been approved!</p>
                </div>
              </div>
            </div>

            {/* Back card 1 */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-5 w-56 opacity-80 rotate-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🏆</span>
                <span className="text-xs font-semibold text-primary">Scholarship Won</span>
              </div>
              <p className="text-xs text-gray-500">$25,000 merit scholarship at University of Toronto</p>
            </div>

            {/* Back card 2 */}
            <div className="absolute -bottom-4 -left-6 bg-gold rounded-2xl shadow-lg p-5 w-52 opacity-90 -rotate-3">
              <p className="text-xs font-semibold text-primary mb-1">Free Consultation</p>
              <p className="text-xs text-primary/70">Book your slot with an expert counselor today!</p>
              <div className="mt-3 bg-primary/20 rounded-lg px-3 py-1 text-xs text-primary font-medium text-center">
                Book Now →
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full aspect-video flex items-center justify-center">
            <p className="text-gray-500 text-lg">Video coming soon!</p>
          </div>
        </div>
      )}

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80L48,69.3C96,59,192,37,288,37.3C384,37,480,59,576,64C672,69,768,59,864,53.3C960,48,1056,48,1152,53.3C1248,59,1344,69,1392,74.7L1440,80L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z" />
        </svg>
      </div>
    </section>
  )
}
