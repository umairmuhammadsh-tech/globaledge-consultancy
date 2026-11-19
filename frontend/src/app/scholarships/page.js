import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { FaExternalLinkAlt, FaCalendarAlt, FaMoneyBillWave, FaGraduationCap, FaGlobe, FaSearch } from 'react-icons/fa'

export const metadata = {
  title: 'Fully Funded Scholarships 2025 | GlobalEdge Consultancy',
  description:
    'Explore top fully funded scholarships for international students — ANSO, CSC China, MEXT Japan, Erasmus+ Europe, DAAD Germany, Türkiye Bursları, GKS Korea, and more.',
}

const scholarships = [
  {
    id: 'csc',
    country: 'China 🇨🇳',
    flag: '🇨🇳',
    name: 'CSC – Chinese Government Scholarship',
    fullName: 'Chinese Scholarship Council (CSC)',
    description:
      'One of the world\'s largest scholarship programmes, fully funded by the Chinese Government. Covers tuition, accommodation, monthly stipend, and medical insurance for undergraduate, master\'s, and PhD students.',
    funding: 'Full Tuition + Accommodation + Monthly Stipend (¥2,500–¥3,500)',
    deadline: 'March – April (annually)',
    duration: '2–6 years',
    level: ['Bachelors', 'Masters', 'PhD'],
    eligibility: 'Non-Chinese citizens under 35 (Masters) / 45 (PhD), good academic record',
    subjects: 'All disciplines — STEM, Medicine, Business, Arts, Social Sciences',
    link: 'https://www.campuschina.org/',
    color: 'from-red-600 to-red-800',
    badge: '🏆 Most Popular',
  },
  {
    id: 'anso',
    country: 'China 🇨🇳',
    flag: '🇨🇳',
    name: 'ANSO Scholarship',
    fullName: 'Alliance of International Science Organizations',
    description:
      'ANSO Scholarship is offered by the Alliance of International Science Organizations for students from developing countries to study at top Chinese institutions including UCAS, CAS institutes, and partner universities.',
    funding: 'Full Tuition + Monthly Stipend (¥3,000) + Accommodation',
    deadline: 'March 15 (annually)',
    duration: '1–4 years',
    level: ['Masters', 'PhD'],
    eligibility: 'Citizens of ANSO member countries, under 45 for PhD',
    subjects: 'Science, Technology, Engineering, Agriculture, Medicine',
    link: 'https://www.anso.org.cn/',
    color: 'from-orange-500 to-red-600',
    badge: '🔬 Research Focus',
  },
  {
    id: 'mext',
    country: 'Japan 🇯🇵',
    flag: '🇯🇵',
    name: 'MEXT Scholarship',
    fullName: 'Japanese Government (MEXT) Scholarship',
    description:
      'Offered by Japan\'s Ministry of Education, Culture, Sports, Science and Technology. Covers full tuition, monthly allowance, airfare, and housing. One of the most prestigious scholarships in Asia.',
    funding: 'Full Tuition + ¥117,000–¥145,000/month + Round Airfare',
    deadline: 'May – June (Embassy route) / varies by university',
    duration: '2–5 years',
    level: ['Bachelors', 'Masters', 'PhD', 'Research'],
    eligibility: 'Age under 35 (graduate), healthy, good academic standing',
    subjects: 'All fields — Engineering, Medicine, Humanities, Social Sciences',
    link: 'https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm',
    color: 'from-red-500 to-pink-600',
    badge: '🌸 Prestigious',
  },
  {
    id: 'erasmus',
    country: 'Europe 🇪🇺',
    flag: '🇪🇺',
    name: 'Erasmus Mundus Joint Masters',
    fullName: 'Erasmus+ Mundus Scholarship Programme',
    description:
      'The European Union\'s flagship scholarship programme. Study at multiple European universities in a joint master\'s degree programme. Fully funded with generous monthly allowance.',
    funding: '€1,400/month allowance + Full Tuition + Travel & Installation Allowances',
    deadline: 'November – January (per programme)',
    duration: '1–2 years (Masters)',
    level: ['Masters'],
    eligibility: 'Open to all nationalities, strong academic background',
    subjects: 'Wide range — Sciences, Engineering, Humanities, Social Sciences, Business',
    link: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en',
    color: 'from-blue-500 to-indigo-700',
    badge: '🌍 Multi-Country',
  },
  {
    id: 'daad',
    country: 'Germany 🇩🇪',
    flag: '🇩🇪',
    name: 'DAAD Scholarship',
    fullName: 'German Academic Exchange Service (DAAD)',
    description:
      'Germany\'s most prestigious scholarship for international students and researchers. DAAD offers hundreds of programmes covering graduate studies, research stays, and language courses at German universities.',
    funding: '€861/month (Masters) + €1,200/month (PhD) + Health Insurance + Travel',
    deadline: 'October – November (for following year)',
    duration: '1–4 years',
    level: ['Masters', 'PhD', 'Research'],
    eligibility: 'Varies by programme, usually 2+ years work experience for some tracks',
    subjects: 'All disciplines, special emphasis on Development-related fields',
    link: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    color: 'from-gray-700 to-gray-900',
    badge: '🏛️ Research & Study',
  },
  {
    id: 'turkiye',
    country: 'Turkey 🇹🇷',
    flag: '🇹🇷',
    name: 'Türkiye Bursları (YTB)',
    fullName: 'Turkey Government Scholarship (Türkiye Scholarships)',
    description:
      'Offered by the Presidency for Turks Abroad and Related Communities (YTB). One of the most generous scholarships in the world — covers all expenses including flights, accommodation, Turkish language course, and healthcare.',
    funding: '₺800–₺1,200/month + Full Tuition + Flight + Accommodation + Health Insurance',
    deadline: 'February – March (annually)',
    duration: '1–5 years',
    level: ['Bachelors', 'Masters', 'PhD', 'Short Programmes'],
    eligibility: 'Non-Turkish citizens under 21 (UG) / 30 (Masters) / 35 (PhD)',
    subjects: 'All fields available across Turkish universities',
    link: 'https://www.turkiyeburslari.gov.tr/',
    color: 'from-red-600 to-red-900',
    badge: '✈️ All-Inclusive',
  },
  {
    id: 'gks',
    country: 'South Korea 🇰🇷',
    flag: '🇰🇷',
    name: 'GKS – Global Korea Scholarship',
    fullName: 'Global Korea Scholarship (NIIED)',
    description:
      'Offered by the National Institute for International Education (NIIED). Covers full tuition, monthly allowance, Korean language training, settlement allowance, and round-trip airfare.',
    funding: 'Full Tuition + ₩1,000,000/month + Korean Language Training + Airfare',
    deadline: 'February – March (Embassy) / September (University route)',
    duration: '3–5 years (including language training)',
    level: ['Bachelors', 'Masters', 'PhD'],
    eligibility: 'Under 25 (UG) / 40 (Graduate), GPA 2.64/4.0 or higher',
    subjects: 'All disciplines at Korean universities',
    link: 'https://www.studyinkorea.go.kr/en/sub/gks/allnew_invite.do',
    color: 'from-blue-600 to-cyan-700',
    badge: '🎌 K-Culture Bonus',
  },
  {
    id: 'fulbright',
    country: 'USA 🇺🇸',
    flag: '🇺🇸',
    name: 'Fulbright Foreign Student Program',
    fullName: 'U.S. Department of State – Fulbright Program',
    description:
      'The most prestigious U.S. Government scholarship. Fully funded graduate study, research, and teaching assistantship in the United States for outstanding international students.',
    funding: 'Full Tuition + Monthly Stipend + Health Insurance + Airfare',
    deadline: 'Varies by country (usually May – October)',
    duration: '1–2 years',
    level: ['Masters', 'PhD', 'Research'],
    eligibility: 'Citizens of participating countries, strong academic and leadership record',
    subjects: 'All academic disciplines',
    link: 'https://foreign.fulbrightonline.org/',
    color: 'from-blue-700 to-blue-900',
    badge: '⭐ Most Prestigious',
  },
  {
    id: 'commonwealth',
    country: 'UK 🇬🇧',
    flag: '🇬🇧',
    name: 'Commonwealth Scholarship',
    fullName: 'Commonwealth Scholarship Commission (CSC-UK)',
    description:
      'Funded by the UK Government for students from Commonwealth countries. Covers full tuition, airfare, monthly stipend, thesis grant, and study travel grant.',
    funding: 'Full Tuition + Monthly Stipend (£1,236) + Airfare + Thesis Grant',
    deadline: 'December – January (annually)',
    duration: '1–3 years',
    level: ['Masters', 'PhD'],
    eligibility: 'Citizens of Commonwealth countries, strong academic record',
    subjects: 'All disciplines, with priority for development-focused subjects',
    link: 'https://cscuk.fcdo.gov.uk/scholarships/',
    color: 'from-indigo-600 to-purple-700',
    badge: '👑 Commonwealth',
  },
  {
    id: 'australia-awards',
    country: 'Australia 🇦🇺',
    flag: '🇦🇺',
    name: 'Australia Awards Scholarships',
    fullName: 'Australian Government – Australia Awards',
    description:
      'Long-term development awards offered by the Australian Government. Covers full tuition, return airfare, establishment allowance, Overseas Student Health Cover, and living expenses.',
    funding: 'Full Tuition + AUD $30,000+/year Living Expenses + Airfare + Health Cover',
    deadline: 'April – June (varies by country)',
    duration: '2–4 years',
    level: ['Masters', 'PhD'],
    eligibility: 'Citizens of eligible countries, usually from Asia-Pacific and Africa',
    subjects: 'Focus on development-related priorities of recipient countries',
    link: 'https://www.dfat.gov.au/people-to-people/australia-awards/Pages/australia-awards-scholarships',
    color: 'from-green-600 to-teal-700',
    badge: '🦘 Down Under',
  },
  {
    id: 'swiss-excellence',
    country: 'Switzerland 🇨🇭',
    flag: '🇨🇭',
    name: 'Swiss Government Excellence Scholarships',
    fullName: 'Swiss Government Excellence Scholarships (ESKAS)',
    description:
      'Offered by the Swiss Confederation for foreign scholars and artists. Covers tuition, monthly stipend, accommodation, and health insurance at world-renowned Swiss universities.',
    funding: 'CHF 1,920/month + Full Tuition + Health Insurance + Housing Allowance',
    deadline: 'November – December (varies by country)',
    duration: '1–3 years',
    level: ['Masters', 'PhD', 'Postdoc', 'Research'],
    eligibility: 'Citizens of ESKAS partner countries, strong academic record',
    subjects: 'All disciplines',
    link: 'https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html',
    color: 'from-red-500 to-red-700',
    badge: '🏔️ Swiss Quality',
  },
  {
    id: 'hungary',
    country: 'Hungary 🇭🇺',
    flag: '🇭🇺',
    name: 'Stipendium Hungaricum',
    fullName: 'Stipendium Hungaricum Scholarship Programme',
    description:
      'Hungary\'s premier scholarship for international students. Fully covers tuition fees and provides accommodation allowance or free dormitory placement for study in Hungarian universities.',
    funding: 'Full Tuition + HUF 43,700/month + Accommodation (Dorm)',
    deadline: 'January 15 (annually)',
    duration: '2–5 years',
    level: ['Bachelors', 'Masters', 'PhD', 'One-tier Masters'],
    eligibility: 'Citizens of sending countries, age and GPA requirements vary',
    subjects: 'All disciplines available at Hungarian universities',
    link: 'https://stipendiumhungaricum.hu/',
    color: 'from-green-600 to-green-800',
    badge: '🏰 Eastern Europe',
  },
]

const stats = [
  { label: 'Scholarships Listed', value: `${scholarships.length}+`, icon: '🎓' },
  { label: 'Countries Covered', value: '12+', icon: '🌍' },
  { label: 'Students Helped', value: '5,000+', icon: '👨‍🎓' },
  { label: 'Success Rate', value: '89%', icon: '✅' },
]

export default function ScholarshipsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-light to-[#1a4a7a] text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-5 py-2 mb-6">
              <span className="text-gold font-semibold text-sm">🏆 Fully Funded Opportunities</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight">
              Global Scholarship
              <span className="block text-gold">Opportunities 2025</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover fully funded scholarships from top governments around the world. 
              We guide you through every application step — from eligibility to acceptance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply" className="btn-primary text-lg px-8 py-4">
                Apply Now — It&apos;s Free
              </Link>
              <a href="#scholarships" className="btn-secondary text-lg px-8 py-4">
                Browse Scholarships
              </a>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-white border-b border-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-bold text-primary font-heading">{s.value}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter bar */}
        <section className="bg-gray-50 py-8 border-b border-gray-200" id="scholarships">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <h2 className="text-2xl font-bold text-primary font-heading">
                {scholarships.length} Fully Funded Scholarships
              </h2>
              <div className="flex flex-wrap gap-2">
                {['All', 'Asia', 'Europe', 'America', 'Masters', 'PhD', 'Bachelors'].map((f) => (
                  <span
                    key={f}
                    className="px-4 py-1.5 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scholarship Cards */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {scholarships.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Card Header */}
                  <div className={`bg-gradient-to-r ${s.color} p-5 text-white relative`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-3xl mb-1">{s.flag}</div>
                        <div className="text-xs font-medium opacity-80 uppercase tracking-wider">{s.country}</div>
                      </div>
                      <span className="text-xs bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 font-semibold">
                        {s.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mt-3 font-heading leading-tight">{s.name}</h3>
                    <p className="text-xs opacity-70 mt-1">{s.fullName}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2 text-sm">
                        <FaMoneyBillWave className="text-green-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-700">Funding: </span>
                          <span className="text-gray-600">{s.funding}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <FaCalendarAlt className="text-gold mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-700">Deadline: </span>
                          <span className="text-gray-600">{s.deadline}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <FaGraduationCap className="text-primary mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-700">Level: </span>
                          <span className="text-gray-600">{s.level.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <FaGlobe className="text-blue-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-700">Fields: </span>
                          <span className="text-gray-600">{s.subjects}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3 mb-4 text-sm">
                      <span className="font-semibold text-primary">Eligibility: </span>
                      <span className="text-gray-600">{s.eligibility}</span>
                    </div>

                    <div className="mt-auto flex gap-3">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 border border-primary text-primary font-semibold py-2.5 rounded-lg hover:bg-primary hover:text-white transition-all text-sm"
                      >
                        Official Site <FaExternalLinkAlt size={11} />
                      </a>
                      <Link
                        href="/apply"
                        className="flex-1 flex items-center justify-center gap-2 bg-gold text-primary font-semibold py-2.5 rounded-lg hover:bg-gold-dark transition-all text-sm"
                      >
                        Apply With Us
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Help Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="section-title mb-4">How GlobalEdge Helps You Win</h2>
            <p className="section-subtitle mb-14">
              We don&apos;t just list scholarships — we walk with you from application to acceptance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: '01', icon: '🔍', title: 'Eligibility Check', desc: 'We match you to scholarships that fit your profile, country, and field of study.' },
                { step: '02', icon: '📄', title: 'Document Prep', desc: 'SOP writing, recommendation letters, CV polishing — we handle everything.' },
                { step: '03', icon: '📝', title: 'Application Filing', desc: 'We fill and submit your application correctly with zero errors.' },
                { step: '04', icon: '🎓', title: 'Interview Coaching', desc: 'Mock interviews and preparation specific to your scholarship board.' },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-xs font-bold text-primary shadow-gold">
                    {item.step}
                  </div>
                  <div className="card text-center pt-8">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-primary text-lg mb-2 font-heading">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="text-5xl mb-6">🎓</div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
              Ready to Apply for Your <span className="text-gold">Dream Scholarship?</span>
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Our experts have helped thousands of students secure fully funded scholarships. 
              Book a free consultation today and start your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" className="btn-primary text-lg px-10 py-4">
                Start Your Application
              </Link>
              <Link href="/contact" className="btn-secondary text-lg px-10 py-4">
                Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
