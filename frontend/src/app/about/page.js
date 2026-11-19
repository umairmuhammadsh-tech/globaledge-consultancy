import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { FaLinkedin, FaTwitter, FaAward, FaUsers, FaGlobe, FaHeart } from 'react-icons/fa'

export const metadata = {
  title: 'About Us | GlobalEdge Consultancy',
  description:
    'Learn about GlobalEdge Consultancy — our story, mission, values, and the expert team behind 10,000+ successful student placements worldwide.',
}

const team = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Founder & CEO',
    country: '🇬🇧 UK Specialist',
    bio: 'PhD from Oxford. 15+ years helping students access world-class education. Former international admissions officer.',
    avatar: 'SM',
    color: 'bg-blue-500',
  },
  {
    name: 'James Rodriguez',
    role: 'Director of Admissions',
    country: '🇺🇸 USA Specialist',
    bio: 'Harvard MBA graduate with 10 years in US college counseling. Expert in Ivy League applications.',
    avatar: 'JR',
    color: 'bg-red-500',
  },
  {
    name: 'Priyanka Nair',
    role: 'Head of Visa Services',
    country: '🇨🇦 Canada Specialist',
    bio: 'Former immigration consultant with a 98% visa approval record. Specialist in Canadian study permits and PR pathways.',
    avatar: 'PN',
    color: 'bg-green-500',
  },
  {
    name: 'Ahmed Al-Rashidi',
    role: 'Senior Education Counselor',
    country: '🇦🇺 Australia Specialist',
    bio: 'Masters from ANU, Canberra. 8 years guiding students to top Australian universities with scholarship success.',
    avatar: 'AA',
    color: 'bg-yellow-500',
  },
  {
    name: 'Dr. Klaus Weber',
    role: 'Europe Desk Lead',
    country: '🇩🇪 Germany Specialist',
    bio: 'PhD from TU Munich. Passionate about helping students access Europe\'s affordable, high-quality education system.',
    avatar: 'KW',
    color: 'bg-gray-600',
  },
  {
    name: 'Leilani Taufa',
    role: 'Test Prep Director',
    country: '🌏 IELTS / GRE Expert',
    bio: 'IELTS score of 9.0, GRE 335. Has coached 2,000+ students to their target scores through proven methodologies.',
    avatar: 'LT',
    color: 'bg-purple-500',
  },
]

const values = [
  { icon: FaHeart, title: 'Student-First', desc: 'Every decision we make centers on the wellbeing and success of our students. We celebrate your wins as our own.' },
  { icon: FaAward, title: 'Excellence', desc: 'We hold ourselves to the highest standards in every application, document, and piece of advice we provide.' },
  { icon: FaUsers, title: 'Inclusivity', desc: 'We believe every motivated student deserves access to world-class education, regardless of background.' },
  { icon: FaGlobe, title: 'Global Perspective', desc: 'With expertise across 6 countries and counting, we bring a truly global view to education planning.' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-primary py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-block bg-gold/20 text-gold border border-gold/30 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
              Est. 2009 • 15 Years of Excellence
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-5">
              About GlobalEdge Consultancy
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We started with a simple belief: every ambitious student deserves a fair shot at
              world-class education, wherever they come from.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
                  Our Story
                </span>
                <h2 className="section-title mb-6">
                  15 Years of Transforming Student Futures
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    GlobalEdge Consultancy was founded in 2009 by Dr. Sarah Mitchell after her own
                    challenging experience navigating the international admissions process for her
                    Oxford PhD. She saw how difficult — and unnecessarily opaque — the system was
                    for students from developing countries.
                  </p>
                  <p>
                    What started as a small advisory practice in New York has grown into a global
                    team of 50+ expert counselors, visa specialists, and test prep coaches, with
                    offices across four continents.
                  </p>
                  <p>
                    Today, GlobalEdge has helped more than{' '}
                    <strong className="text-primary">10,000 students</strong> from 85+ countries
                    secure placements at top universities worldwide, with over{' '}
                    <strong className="text-primary">$5 million in scholarships</strong> awarded to
                    our students in 2024 alone.
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                {[
                  { year: '2009', event: 'Founded in New York by Dr. Sarah Mitchell', icon: '🌱' },
                  { year: '2012', event: 'Expanded to UK, Canada, and Australia services', icon: '🌍' },
                  { year: '2015', event: 'Reached 1,000 successful student placements', icon: '🎓' },
                  { year: '2018', event: 'Added Germany and New Zealand destinations', icon: '✈️' },
                  { year: '2021', event: 'Launched online counseling platform', icon: '💻' },
                  { year: '2024', event: '10,000+ students placed, $5M+ in scholarships', icon: '🏆' },
                ].map((item, i) => (
                  <div key={i} className="relative flex gap-6 pb-8 pl-14">
                    <div className="absolute left-0 w-12 h-12 bg-white border-4 border-primary rounded-full flex items-center justify-center text-xl shadow-sm">
                      {item.icon}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 flex-1 border border-gray-100 hover:shadow-md transition-shadow">
                      <span className="text-xs font-bold text-gold bg-gold/10 rounded-full px-3 py-1 mb-2 inline-block">{item.year}</span>
                      <p className="text-gray-700 text-sm font-medium">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
                Our Core Values
              </span>
              <h2 className="section-title">What We Stand For</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, i) => {
                const Icon = val.icon
                return (
                  <div key={i} className="bg-white rounded-2xl p-7 shadow-card hover:shadow-xl transition-all hover:-translate-y-1 text-center">
                    <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      <Icon className="text-primary text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold text-primary font-heading mb-3">{val.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
                Expert Team
              </span>
              <h2 className="section-title">Meet Our Counselors</h2>
              <p className="section-subtitle">
                Our team brings personal study-abroad experience and deep regional expertise to guide every student.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:border-gold/20 transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-16 h-16 ${member.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-primary font-heading">{member.name}</h3>
                      <p className="text-sm text-gold font-medium">{member.role}</p>
                      <p className="text-xs text-gray-500">{member.country}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{member.bio}</p>
                  <div className="flex gap-3">
                    <a href="#" className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                      <FaLinkedin size={14} />
                    </a>
                    <a href="#" className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 hover:text-white transition-all">
                      <FaTwitter size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-primary">
          <div className="max-w-3xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold font-heading mb-5">
              Ready to Work with Our Expert Team?
            </h2>
            <p className="text-gray-300 mb-8">
              Book a free consultation and let us create your personalized study abroad roadmap.
            </p>
            <Link href="/apply" className="btn-primary py-4 px-12 text-base">
              Start Your Journey
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
