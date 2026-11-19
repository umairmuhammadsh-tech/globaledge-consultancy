import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Services from '@/components/Services'
import Link from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'

export const metadata = {
  title: 'Our Services | GlobalEdge Consultancy',
  description:
    'Explore our full range of study abroad services: University Admissions, Visa Guidance, Scholarship Hunting, Test Prep, and Career Counseling.',
}

const process = [
  { step: '01', title: 'Free Initial Consultation', desc: 'Begin with a 60-minute session with an expert counselor who will evaluate your profile and discuss your options.' },
  { step: '02', title: 'Profile & Goal Assessment', desc: 'We analyze your academic background, career goals, and financial situation to create a personalized plan.' },
  { step: '03', title: 'University Shortlisting', desc: 'Based on your profile, we shortlist 5–10 universities across your target destination that best match your aspirations.' },
  { step: '04', title: 'Application Preparation', desc: 'We guide you through every document — SOP, LOR, transcripts, CV — to craft the strongest possible application.' },
  { step: '05', title: 'Visa Application', desc: 'Once you receive an offer, our visa specialists prepare and file your visa application with a 98% success rate.' },
  { step: '06', title: 'Pre-Departure & Beyond', desc: 'From accommodation and flights to airport reception, we ensure your transition is smooth and stress-free.' },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page Header */}
        <section className="bg-gradient-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-block bg-gold/20 text-gold border border-gold/30 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
              What We Offer
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-5">
              Our Comprehensive Services
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              End-to-end support for every stage of your international education journey.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <Services preview={false} />

        {/* Our Process */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
                How It Works
              </span>
              <h2 className="section-title">Our Proven 6-Step Process</h2>
              <p className="section-subtitle">
                A structured, transparent approach that maximizes your chances of success at every stage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((item, i) => (
                <div
                  key={i}
                  className="relative bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="text-5xl font-bold text-primary/5 group-hover:text-gold/10 transition-colors font-heading absolute top-5 right-5">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-gradient-primary text-gold rounded-xl flex items-center justify-center text-lg font-bold font-heading mb-5">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-primary font-heading mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="section-title">Everything Included in Our Package</h2>
              <p className="section-subtitle">
                No hidden fees, no surprises. Here's exactly what you get when you work with us.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                'Unlimited counselor consultations',
                'University shortlisting (5–10 options)',
                'SOP / personal statement writing & review',
                'Letter of recommendation guidance',
                'Application form filling & submission',
                'Scholarship identification & application',
                'Visa documentation preparation',
                'Visa interview coaching',
                'IELTS / TOEFL score improvement plan',
                'Pre-departure orientation briefing',
                'Airport pickup coordination',
                'Post-arrival support (3 months)',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <FaCheckCircle className="text-green-500 flex-shrink-0 text-lg" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/apply" className="btn-primary py-4 px-12 text-base">
                Get Started Today
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
