import Link from 'next/link'
import {
  FaUniversity,
  FaPassport,
  FaTrophy,
  FaBook,
  FaBriefcase,
  FaArrowRight,
} from 'react-icons/fa'

const services = [
  {
    icon: FaUniversity,
    title: 'University Admissions',
    description:
      'Expert guidance through the entire university application process. We help you identify the best universities, craft compelling personal statements, and navigate complex requirements.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    features: ['University shortlisting', 'Application review', 'SOP writing', 'Interview prep'],
  },
  {
    icon: FaPassport,
    title: 'Visa Guidance',
    description:
      'Navigate complex visa requirements with confidence. Our visa specialists have an industry-leading 98% success rate and guide you through every step of the application.',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    features: ['Document checklist', 'Application filing', 'Interview prep', 'Appeal support'],
  },
  {
    icon: FaTrophy,
    title: 'Scholarship Hunting',
    description:
      'Maximize your funding potential with our scholarship database. We identify opportunities worth thousands of dollars and help you create winning applications.',
    color: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-100',
    features: ['Scholarship matching', 'Essay writing', 'Award tracking', 'Financial planning'],
  },
  {
    icon: FaBook,
    title: 'Test Preparation',
    description:
      'Ace your IELTS, TOEFL, GRE, GMAT, and SAT exams with our structured prep programs. Expert tutors and comprehensive study materials included.',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    features: ['IELTS / TOEFL', 'GRE / GMAT / SAT', 'Mock tests', 'Score improvement'],
  },
  {
    icon: FaBriefcase,
    title: 'Career Counseling',
    description:
      'Plan your academic path with your career goals in mind. Our counselors help align your degree choice with industry demand and long-term career aspirations.',
    color: 'bg-red-50',
    iconColor: 'text-red-600',
    iconBg: 'bg-red-100',
    features: ['Career mapping', 'Industry insights', 'Resume building', 'Post-study work'],
  },
]

export default function Services({ preview = false }) {
  const displayedServices = preview ? services.slice(0, 4) : services

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            What We Offer
          </span>
          <h2 className="section-title">Our Expert Services</h2>
          <p className="section-subtitle">
            End-to-end support for your international education journey — from choosing the right
            university to landing your dream career abroad.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-card p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100"
              >
                <div className={`w-14 h-14 ${service.iconBg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`${service.iconColor} text-2xl`} />
                </div>
                <h3 className="text-xl font-bold text-primary font-heading mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="text-primary font-semibold text-sm flex items-center gap-2 hover:text-gold transition-colors group/link"
                >
                  Learn More
                  <FaArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            )
          })}

          {/* CTA Card (only in preview mode) */}
          {preview && (
            <div className="bg-gradient-primary rounded-2xl p-7 flex flex-col justify-between text-white">
              <div>
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-5 text-3xl">
                  🚀
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">
                  + More Services
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Explore our full suite of education consultancy services tailored to your needs.
                </p>
              </div>
              <Link
                href="/services"
                className="mt-8 inline-flex items-center gap-2 bg-gold text-primary font-semibold px-6 py-3 rounded-xl hover:bg-gold-dark transition-all"
              >
                All Services <FaArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        {!preview && (
          <div className="text-center mt-14">
            <p className="text-gray-600 mb-6">
              Not sure which service you need? Let our experts guide you.
            </p>
            <Link href="/contact" className="btn-primary py-4 px-10 text-base">
              Book a Free Consultation
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
