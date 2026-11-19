import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

const countries = [
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    emoji: '🏰',
    description:
      'Home to Oxford, Cambridge, and Imperial. World-renowned research institutions with post-study work opportunities.',
    universities: '130+',
    avgTuition: '£15,000–£35,000/yr',
    intakeMonths: 'Sept / Jan',
    visaType: 'Student Visa',
    highlights: ['Post-Study Work Visa (2 yrs)', 'Global recognition', 'Multicultural society'],
    color: 'from-blue-600 to-blue-800',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    emoji: '🗽',
    description:
      'The world\'s leading education destination with Ivy League universities and cutting-edge research facilities.',
    universities: '4,000+',
    avgTuition: '$20,000–$60,000/yr',
    intakeMonths: 'Aug / Jan',
    visaType: 'F-1 Visa',
    highlights: ['OPT for 1–3 years', 'Innovation hub', 'Diverse campuses'],
    color: 'from-red-600 to-red-800',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    emoji: '🍁',
    description:
      'Excellent quality of life and education with clear pathways to permanent residency for international students.',
    universities: '100+',
    avgTuition: 'CAD $15,000–$35,000/yr',
    intakeMonths: 'Sept / Jan / May',
    visaType: 'Study Permit',
    highlights: ['PR pathway (CEC)', 'Bilingual culture', 'Safe & welcoming'],
    color: 'from-red-500 to-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    emoji: '🦘',
    description:
      'High-quality education in a stunning environment. Australia offers excellent research opportunities and a great lifestyle.',
    universities: '43',
    avgTuition: 'AUD $20,000–$45,000/yr',
    intakeMonths: 'Feb / July',
    visaType: 'Student Visa (500)',
    highlights: ['Post-Study Work Rights', 'Quality lifestyle', 'Research excellence'],
    color: 'from-yellow-600 to-orange-700',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    emoji: '🏛️',
    description:
      'Tuition-free or low-cost education at world-class technical universities. A top destination for STEM students.',
    universities: '400+',
    avgTuition: '€0–€3,000/yr (many free)',
    intakeMonths: 'Oct / April',
    visaType: 'National Visa (Type D)',
    highlights: ['Largely tuition-free', 'Strong engineering', '18-month job seeker visa'],
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
  {
    id: 'newzealand',
    name: 'New Zealand',
    flag: '🇳🇿',
    emoji: '🌿',
    description:
      'An emerging study destination with world-class universities, stunning natural beauty, and a friendly, safe environment.',
    universities: '8',
    avgTuition: 'NZD $22,000–$35,000/yr',
    intakeMonths: 'Feb / July',
    visaType: 'Student Visa',
    highlights: ['Post-Study Work Visa (3 yrs)', 'Safe environment', 'Quality of life'],
    color: 'from-green-600 to-emerald-800',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
]

export default function Countries({ preview = false, highlighted = null }) {
  const displayedCountries = preview ? countries.slice(0, 6) : countries

  return (
    <section className="py-20 bg-white" id="destinations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            Study Destinations
          </span>
          <h2 className="section-title">Top Countries to Study Abroad</h2>
          <p className="section-subtitle">
            From world-renowned universities in the UK to affordable, high-quality education in
            Germany — we guide you to your perfect destination.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCountries.map((country) => (
            <div
              key={country.id}
              id={country.id}
              className={`group rounded-2xl border ${country.border} ${country.bg} overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                highlighted === country.id ? 'ring-2 ring-gold shadow-gold' : ''
              }`}
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${country.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-2 right-4 text-5xl opacity-20">{country.emoji}</div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{country.flag}</span>
                  <h3 className="text-xl font-bold font-heading">{country.name}</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{country.description}</p>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Universities</p>
                    <p className="font-semibold text-primary">{country.universities}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Avg. Tuition</p>
                    <p className="font-semibold text-primary text-xs">{country.avgTuition}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Intake</p>
                    <p className="font-semibold text-primary text-xs">{country.intakeMonths}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Visa Type</p>
                    <p className="font-semibold text-primary text-xs">{country.visaType}</p>
                  </div>
                </div>

                <ul className="space-y-1.5 mb-5">
                  {country.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-gold transition-colors group/link"
                >
                  Apply for {country.name}
                  <FaArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {preview && (
          <div className="text-center mt-12">
            <Link href="/countries" className="btn-primary py-4 px-10 text-base">
              Explore All Destinations
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
