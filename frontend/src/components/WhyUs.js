import {
  FaShieldAlt,
  FaUsers,
  FaGlobe,
  FaClock,
  FaChartLine,
  FaHandshake,
} from 'react-icons/fa'

const reasons = [
  {
    icon: FaShieldAlt,
    title: '98% Visa Success Rate',
    description:
      'Our expert visa team has an industry-leading success rate. We know exactly what immigration officers look for and prepare your application accordingly.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: FaUsers,
    title: 'Expert Counselors',
    description:
      'All our counselors hold advanced degrees and have personally studied abroad. They bring first-hand knowledge of the international student experience.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: FaGlobe,
    title: '6 Countries Covered',
    description:
      'From the UK to New Zealand, we have specialized teams for every destination with deep knowledge of local university systems and visa requirements.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: FaClock,
    title: '15+ Years Experience',
    description:
      'Since 2009, we have helped over 10,000 students achieve their study abroad dreams. Our experience means fewer mistakes and faster results for you.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icon: FaChartLine,
    title: 'Scholarship Success',
    description:
      'Our students have collectively received over $5 million in scholarships. We identify every funding opportunity and help you submit winning applications.',
    color: 'text-gold',
    bg: 'bg-yellow-50',
  },
  {
    icon: FaHandshake,
    title: 'End-to-End Support',
    description:
      'We don\'t just help with applications — we support you from initial consultation through to arrival at your university and beyond, including pre-departure briefings.',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
]

export default function WhyUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
              Why Choose Us
            </span>
            <h2 className="section-title mb-6">
              Why 10,000+ Students Trust GlobalEdge
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We're not just consultants — we're your partners in achieving the future you've always
              dreamed of. Here's what sets us apart from every other consultancy.
            </p>

            {/* Process Steps */}
            <div className="space-y-5">
              {[
                { step: '01', title: 'Free Consultation', desc: 'Start with a no-obligation session with our expert counselors.' },
                { step: '02', title: 'Profile Evaluation', desc: 'We assess your profile and identify the best opportunities.' },
                { step: '03', title: 'Application Support', desc: 'Expert help with every document, essay, and form.' },
                { step: '04', title: 'Visa & Pre-Departure', desc: 'Full visa support and pre-departure orientation.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-12 h-12 bg-gradient-primary text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:bg-gold group-hover:text-primary transition-colors">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">{item.title}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Reasons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((reason, i) => {
              const Icon = reason.icon
              return (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-gray-100 group"
                >
                  <div className={`w-11 h-11 ${reason.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`${reason.color} text-xl`} />
                  </div>
                  <h4 className="font-bold text-primary text-sm font-heading mb-2">{reason.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{reason.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
