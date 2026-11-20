import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import Countries from '@/components/Countries'
import Testimonials from '@/components/Testimonials'
import WhyUs from '@/components/WhyUs'
import Link from 'next/link'
import { FaArrowRight, FaCalendarAlt, FaPhone } from 'react-icons/fa'

export const metadata = {
  title: 'GlobalEdge Consultancy | Your Gateway to World-Class Education',
  description:
    'Expert guidance on university admissions, visa support, scholarships, and test prep. Helping students study in UK, USA, Canada, Australia, Germany & New Zealand.',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <Hero />

        {/* Stats */}
        <Stats />

        {/* Services Preview */}
        <Services preview={true} />

        {/* WhyUs */}
        <WhyUs />

        {/* Countries Preview */}
        <Countries preview={true} />

        {/* Testimonials */}
        <Testimonials />

        {/* Scholarships Preview Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block bg-gold/10 text-gold border border-gold/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                🏆 Fully Funded
              </span>
              <h2 className="section-title">Top Global Scholarships</h2>
              <p className="section-subtitle">
                We help students secure fully funded scholarships from the world's top governments.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
              {[
                { flag: '🇨🇳', name: 'CSC / ANSO China', color: 'bg-red-50 border-red-200' },
                { flag: '🇯🇵', name: 'MEXT Japan', color: 'bg-pink-50 border-pink-200' },
                { flag: '🇪🇺', name: 'Erasmus+ Europe', color: 'bg-blue-50 border-blue-200' },
                { flag: '🇩🇪', name: 'DAAD Germany', color: 'bg-gray-50 border-gray-300' },
                { flag: '🇹🇷', name: 'Türkiye Bursları', color: 'bg-red-50 border-red-200' },
                { flag: '🇰🇷', name: 'GKS South Korea', color: 'bg-cyan-50 border-cyan-200' },
                { flag: '🇷🇺', name: 'Open Doors Russia', color: 'bg-indigo-50 border-indigo-200' },
                { flag: '🇷🇺', name: 'Study In Russia', color: 'bg-blue-50 border-blue-300' },
                { flag: '🇸🇦', name: 'Saudi Scholarship', color: 'bg-emerald-50 border-emerald-200' },
                { flag: '🇮🇩', name: 'KNB Indonesia', color: 'bg-rose-50 border-rose-200' },
                { flag: '🇺🇸', name: 'SUSI Leaders USA', color: 'bg-blue-50 border-red-200' },
                { flag: '🇫🇷', name: 'Eiffel France', color: 'bg-indigo-50 border-indigo-200' },
                { flag: '🇧🇪', name: 'Master Mind Belgium', color: 'bg-amber-50 border-amber-200' },
                { flag: '🇭🇺', name: 'Stipendium Hungary', color: 'bg-green-50 border-green-200' },
              ].map((s) => (
                <Link
                  key={s.name}
                  href="/scholarships"
                  className={`flex flex-col items-center p-4 rounded-xl border-2 ${s.color} hover:scale-105 hover:shadow-md transition-all duration-200 text-center`}
                >
                  <span className="text-3xl mb-2">{s.flag}</span>
                  <span className="text-xs font-semibold text-gray-700 leading-tight">{s.name}</span>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link href="/scholarships" className="btn-primary px-10 py-4 text-base">
                View All 19+ Scholarships & Apply →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-gold rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-gold/20 text-gold border border-gold/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              🎓 Limited Slots Available for 2025 Intake
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6 leading-tight">
              Ready to Begin Your{' '}
              <span className="text-gold">International Education</span> Journey?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Join over 10,000 students who have already achieved their dreams with GlobalEdge
              Consultancy. Book your free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" className="btn-primary py-4 px-10 text-base flex items-center justify-center gap-2 group">
                Apply Now
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn-secondary py-4 px-10 text-base flex items-center justify-center gap-2 border-white text-white hover:bg-white hover:text-primary">
                <FaCalendarAlt />
                Book Free Consultation
              </Link>
            </div>

            {/* Contact Option */}
            <div className="mt-10 flex items-center justify-center gap-3 text-gray-400">
              <FaPhone size={14} />
              <span className="text-sm">
                Prefer to call? Reach us at{' '}
                <a href="tel:+923124718386" className="text-gold hover:underline font-medium">
                  +92 312 4718386
                </a>
              </span>
            </div>
          </div>
        </section>

        {/* Partners / Accreditations Strip */}
        <section className="py-10 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-400 text-sm font-medium mb-6">
              TRUSTED PARTNER OF LEADING UNIVERSITIES WORLDWIDE
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
              {[
                'Oxford University',
                'MIT',
                'University of Toronto',
                'University of Melbourne',
                'TU Munich',
                'University of Auckland',
                'Harvard University',
                'Stanford University',
              ].map((uni) => (
                <span key={uni} className="text-gray-500 font-semibold text-sm whitespace-nowrap">
                  {uni}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
