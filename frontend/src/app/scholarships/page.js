import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { FaExternalLinkAlt, FaCalendarAlt, FaMoneyBillWave, FaGraduationCap, FaGlobe } from 'react-icons/fa'

export const metadata = {
  title: 'Fully Funded Global Scholarships 2025-2026 | GlobalEdge Consultancy',
  description:
    'Explore prestigious fully funded scholarships worldwide: CSC & ANSO China, MEXT Japan, Erasmus+ Europe, DAAD Germany, Türkiye Bursları, GKS Korea, Open Doors Russia, Study in Russia, Study in Saudi, KNB Indonesia, SUSI USA, Eiffel France, and Master Mind Belgium.',
}

const scholarships = [
  {
    id: 'csc',
    country: 'China 🇨🇳',
    flag: '🇨🇳',
    name: 'CSC – Chinese Government Scholarship',
    fullName: 'China Scholarship Council (CSC)',
    description:
      'One of the world\'s largest government scholarship programs. Covers 100% tuition, campus accommodation, full medical insurance, and monthly living allowances.',
    funding: 'Full Tuition + Accommodation + Monthly Allowance (¥2,500 – ¥3,500)',
    deadline: 'January – April (annually)',
    duration: '2–6 years',
    level: ['Bachelors', 'Masters', 'PhD'],
    eligibility: 'Non-Chinese citizens, high academic merit; age limits apply per degree level.',
    subjects: 'All fields: Engineering, Medicine, Business, Sciences, Arts',
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
      'Comprehensive research scholarship supporting top postgraduate candidates to study at University of Chinese Academy of Sciences (UCAS) and USTC.',
    funding: 'Full Tuition + Monthly Stipend (¥3,000 – ¥6,000) + Health Insurance',
    deadline: 'February 15 (annually)',
    duration: '2–4 years',
    level: ['Masters', 'PhD'],
    eligibility: 'Open to citizens of developing countries with a strong research background.',
    subjects: 'STEM: Science, Technology, Engineering, Agriculture, Medicine',
    link: 'https://www.anso.org.cn/',
    color: 'from-orange-500 to-red-600',
    badge: '🔬 Research Focus',
  },
  {
    id: 'mext',
    country: 'Japan 🇯🇵',
    flag: '🇯🇵',
    name: 'MEXT Scholarship',
    fullName: 'Japanese Government Ministry of Education (MEXT)',
    description:
      'Prestigious Japanese government scholarship covering round-trip international airfare, complete tuition exemption, and monthly stipends.',
    funding: 'Full Tuition + Round Airfare + Monthly Stipend (¥117,000 – ¥145,000)',
    deadline: 'May – June (Embassy Track) / University dependent',
    duration: '2–5 years',
    level: ['Bachelors', 'Masters', 'PhD', 'Research'],
    eligibility: 'Under 35 years old for postgraduates, excellent academic standing.',
    subjects: 'All fields: Technology, Robotics, Humanities, Medicine, Social Sciences',
    link: 'https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm',
    color: 'from-red-500 to-pink-600',
    badge: '🌸 Top Tier Japan',
  },
  {
    id: 'erasmus',
    country: 'Europe 🇪🇺',
    flag: '🇪🇺',
    name: 'Erasmus Mundus Joint Masters',
    fullName: 'European Union Erasmus+ Program',
    description:
      'Flagship EU scholarship allowing students to complete high-level joint master’s degrees across 2 to 4 different European countries with total funding.',
    funding: '€1,400/month stipend + Full Tuition + Installation & Travel allowance',
    deadline: 'October – January (annually)',
    duration: '1–2 years (Joint Masters)',
    level: ['Masters'],
    eligibility: 'Open to all nationalities worldwide with a recognized bachelor degree.',
    subjects: 'Wide catalog of 150+ joint master degrees in all disciplines',
    link: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en',
    color: 'from-blue-500 to-indigo-700',
    badge: '🌍 Multi-Country EU',
  },
  {
    id: 'daad',
    country: 'Germany 🇩🇪',
    flag: '🇩🇪',
    name: 'DAAD Scholarship',
    fullName: 'German Academic Exchange Service (Deutscher Akademischer Austauschdienst)',
    description:
      'Germany\'s premier government funding for international postgraduates and researchers at top public universities with zero tuition and living grants.',
    funding: '€934/month (Masters) – €1,300/month (PhD) + Health Insurance + Travel Subsidy',
    deadline: 'August – November (annually by program)',
    duration: '1–4 years',
    level: ['Masters', 'PhD', 'Research'],
    eligibility: 'Bachelor degree holder with high academic standing; 2 yrs experience for EPOS.',
    subjects: 'Engineering, Environmental Sciences, Public Policy, Economics, Development',
    link: 'https://www.funding-guide.de/',
    color: 'from-gray-700 to-gray-900',
    badge: '🏛️ German Excellence',
  },
  {
    id: 'turkiye',
    country: 'Turkey 🇹🇷',
    flag: '🇹🇷',
    name: 'Türkiye Bursları',
    fullName: 'Turkic Republic Government Scholarship (YTB)',
    description:
      'One of the world\'s most comprehensive packages: round-trip flights, university placement, dormitory accommodation, 1-year Turkish language course, and monthly stipends.',
    funding: 'Full Tuition + Round Airfare + Free Dormitory + Monthly Stipend + Health Insurance',
    deadline: 'January 10 – February 20 (annually)',
    duration: '1–5 years',
    level: ['Bachelors', 'Masters', 'PhD'],
    eligibility: 'Under 21 (UG), Under 30 (Masters), Under 35 (PhD); min 70-75% grade score.',
    subjects: 'Medicine, Engineering, Architecture, Social Sciences, Islamic Studies',
    link: 'https://www.turkiyeburslari.gov.tr/',
    color: 'from-red-600 to-red-900',
    badge: '✈️ All-Inclusive',
  },
  {
    id: 'gks',
    country: 'South Korea 🇰🇷',
    flag: '🇰🇷',
    name: 'GKS – Global Korea Scholarship',
    fullName: 'National Institute for International Education (NIIED Korea)',
    description:
      'Official Korean government grant providing tuition waivers, round-trip airfare, 1-year Korean language academy, settlement allowance, and monthly stipends.',
    funding: 'Full Tuition + Round Airfare + ₩1,000,000 – ₩1,500,000/mo + Settlement Grant',
    deadline: 'Feb – March (Graduate) / Sept – Oct (Undergraduate)',
    duration: '3–5 years (including language year)',
    level: ['Bachelors', 'Masters', 'PhD'],
    eligibility: 'Under 25 (UG), Under 40 (Graduates); minimum 80% GPA or top 20% ranking.',
    subjects: 'All majors across accredited universities in South Korea',
    link: 'https://www.studyinkorea.go.kr/',
    color: 'from-blue-600 to-cyan-700',
    badge: '🎌 K-Culture & Tech',
  },
  {
    id: 'opendoors',
    country: 'Russia 🇷🇺',
    flag: '🇷🇺',
    name: 'Open Doors Russian Scholarship',
    fullName: 'Open Doors: Russian Scholarship Project (Global Universities)',
    description:
      'International olympiad organized by the Association of Global Universities. Winners obtain 100% tuition-free education at top Russian universities in English or Russian.',
    funding: '100% Tuition Waiver at Top Russian Universities + Monthly Government Stipend',
    deadline: 'September – December (annually)',
    duration: '2–4 years',
    level: ['Bachelors', 'Masters', 'PhD', 'Postdoc'],
    eligibility: 'Open to all international students winning the online portfolio and exam olympiad.',
    subjects: 'AI & Data Science, Mathematics, Physics, Engineering, Economics, Medicine',
    link: 'https://od.globaluni.ru/',
    color: 'from-blue-700 to-red-600',
    badge: '🇷🇺 Exam Olympiad',
  },
  {
    id: 'study-in-russia',
    country: 'Russia 🇷🇺',
    flag: '🇷🇺',
    name: 'Study In Russia (State Quota)',
    fullName: 'Russian Federation Ministry of Science & Higher Education',
    description:
      'State-funded quota scholarship for foreign citizens providing 100% free tuition and a monthly stipend, plus a preparatory Russian language foundation year.',
    funding: '100% Free Tuition + Monthly State Stipend + Dormitory Subsidy',
    deadline: 'October – February (annually via Russian Houses/Embassies)',
    duration: '2–6 years (including preparatory year)',
    level: ['Bachelors', 'Specialist', 'Masters', 'PhD'],
    eligibility: 'High school graduation certificate or bachelor degree; open to all nationalities.',
    subjects: 'Nuclear Physics, Aerospace, Medicine, Civil Engineering, International Relations',
    link: 'https://education-in-russia.com/',
    color: 'from-blue-800 to-indigo-900',
    badge: '🏛️ State Quota',
  },
  {
    id: 'saudi-scholarship',
    country: 'Saudi Arabia 🇸🇦',
    flag: '🇸🇦',
    name: 'Saudi Government Scholarship',
    fullName: 'Study in Saudi Portal (Ministry of Education)',
    description:
      'Fully funded government scholarship allowing foreign students to study at top Saudi institutions (such as King Saud, KAU, KFUPM, and KAUST) with VIP benefits.',
    funding: 'Full Tuition + Monthly Allowance (850–1,000 SAR) + Housing + Annual Flights + Medical',
    deadline: 'Rolling admissions via the unified Study in Saudi portal',
    duration: '2–5 years',
    level: ['Diploma', 'Bachelors', 'Masters', 'PhD'],
    eligibility: 'Good conduct, medically fit, high school or university transcripts verified.',
    subjects: 'Petroleum Engineering, Computer Science, Islamic Studies, Business, Medicine',
    link: 'https://studyinsaudi.moe.gov.sa/',
    color: 'from-emerald-700 to-green-900',
    badge: '🇸🇦 100% Funded + VIP',
  },
  {
    id: 'knb-indonesia',
    country: 'Indonesia 🇮🇩',
    flag: '🇮🇩',
    name: 'Indonesian Government Scholarship (KNB)',
    fullName: 'Kemitraan Negara Berkembang (KNB) Scholarship',
    description:
      'Offered by the Ministry of Higher Education, Science, and Technology of Indonesia to international students from developing countries across top Indonesian universities.',
    funding: 'Full Tuition + Living Allowance + Health Insurance + Round Airfare + Language Year',
    deadline: 'January – February (annually)',
    duration: '1–4 years (BIPA Indonesian language included)',
    level: ['Bachelors', 'Masters', 'PhD'],
    eligibility: 'Citizens of developing countries; age limits and GPA minimums apply.',
    subjects: 'Social Sciences, Tropical Agriculture, Engineering, Natural Sciences, Arts',
    link: 'https://knb.kemdiktisaintek.go.id/',
    color: 'from-red-600 to-rose-700',
    badge: '🌴 Emerging Leader',
  },
  {
    id: 'susi-usa',
    country: 'United States 🇺🇸',
    flag: '🇺🇸',
    name: 'SUSI Student Leaders Program',
    fullName: 'Study of the U.S. Institutes (U.S. Department of State)',
    description:
      'Prestigious fully funded 5 to 6-week academic and leadership exchange program hosted at top American universities, designed to foster leadership and cultural exchange.',
    funding: '100% Covered: Round-Trip USA Flights, Campus Housing, Meals, Stipend, Health Insurance',
    deadline: 'October – November (annually via U.S. Embassies)',
    duration: '5–6 Weeks (Summer/Winter)',
    level: ['Undergraduate Students'],
    eligibility: 'Enrolled undergraduate students (1st, 2nd, or 3rd year) with strong leadership qualities.',
    subjects: 'Global Environmental Issues, Public Policymaking, Civic Engagement, Leadership',
    link: 'https://exchanges.state.gov/',
    color: 'from-blue-700 to-red-700',
    badge: '🇺🇸 US State Dept',
  },
  {
    id: 'eiffel-france',
    country: 'France 🇫🇷',
    flag: '🇫🇷',
    name: 'Eiffel France Excellence Scholarship',
    fullName: 'Eiffel Scholarship Program of Excellence (Campus France)',
    description:
      'Developed by the French Ministry for Europe and Foreign Affairs to enable French higher education institutions to attract top foreign students for master’s and PhD programs.',
    funding: 'Monthly Allowance (€1,181 for Master / €1,700 for PhD) + International Transport + Insurance',
    deadline: 'October – January (institutional application)',
    duration: '12–36 months (Master) / up to 12 months (PhD)',
    level: ['Masters', 'PhD'],
    eligibility: 'Non-French candidates under 27 (Masters) or under 32 (PhD), applied via French universities.',
    subjects: 'Biology & Health, Ecological Transition, Mathematics, Digital, Engineering, Law, Economics',
    link: 'https://www.campusfrance.org/en/france-excellence-eiffel-scholarship-program',
    color: 'from-blue-600 to-red-600',
    badge: '🗼 French Elite',
  },
  {
    id: 'mastermind-belgium',
    country: 'Belgium 🇧🇪',
    flag: '🇧🇪',
    name: 'Master Mind Scholarships Belgium',
    fullName: 'Flemish Ministry of Education and Training (Flanders, Belgium)',
    description:
      'Generous grant for outstanding international master students to study at universities in Flanders and Brussels (KU Leuven, Ghent University, University of Antwerp, etc.).',
    funding: '€10,000 Grant per academic year + Full or Near-Full Tuition Fee Waiver',
    deadline: 'February – April (annually by participating university)',
    duration: '1–2 academic years (Masters)',
    level: ['Masters'],
    eligibility: 'High academic performance (minimum GPA 3.5/4.0), applied via host Flemish university.',
    subjects: 'All master disciplines offered at Flemish universities',
    link: 'https://www.studyinflanders.be/',
    color: 'from-amber-600 to-yellow-700',
    badge: '🍫 Heart of Europe',
  },
  {
    id: 'fulbright',
    country: 'United States 🇺🇸',
    flag: '🇺🇸',
    name: 'Fulbright Foreign Student Program',
    fullName: 'U.S. Department of State – Fulbright Program',
    description:
      'The most globally renowned government scholarship. Covers full tuition, text books, monthly living stipend, health insurance, and round-trip airfare to top American universities.',
    funding: '100% Full Tuition + Monthly Stipend + Health Insurance + Round Airfare',
    deadline: 'April – May (varies by local commission/USEFP)',
    duration: '1–2 years (Masters) / 4–5 years (PhD)',
    level: ['Masters', 'PhD'],
    eligibility: 'Citizens of partner countries, strong academic transcripts and demonstrated community impact.',
    subjects: 'All disciplines (excluding clinical patient medicine)',
    link: 'https://foreign.fulbrightonline.org/',
    color: 'from-blue-700 to-blue-950',
    badge: '⭐ World Renowned',
  },
  {
    id: 'commonwealth',
    country: 'United Kingdom 🇬🇧',
    flag: '🇬🇧',
    name: 'Commonwealth Scholarship UK',
    fullName: 'Commonwealth Scholarship Commission in the UK (FCDO)',
    description:
      'Fully funded by the UK Foreign, Commonwealth & Development Office for students from developing Commonwealth nations to study at leading British universities.',
    funding: 'Full Tuition + Monthly Stipend (£1,347–£1,652) + Airfare + Study Travel Grant',
    deadline: 'September – December (annually)',
    duration: '1 year (Masters) / 3 years (PhD)',
    level: ['Masters', 'PhD'],
    eligibility: 'Citizens of eligible Commonwealth countries unable to afford self-funded UK study.',
    subjects: 'Science and Technology, Health Systems, Global Prosperity, Governance, Resilience',
    link: 'https://cscuk.fcdo.gov.uk/scholarships/',
    color: 'from-indigo-600 to-purple-800',
    badge: '👑 British Royal',
  },
  {
    id: 'australia-awards',
    country: 'Australia 🇦🇺',
    flag: '🇦🇺',
    name: 'Australia Awards Scholarships',
    fullName: 'Australian Department of Foreign Affairs and Trade (DFAT)',
    description:
      'Long-term development awards administered by the Australian Government for students from the Indo-Pacific, South Asia, and Africa at top Australian universities.',
    funding: 'Full Tuition + Return Airfare + AUD $30,000+/yr Living Allowance + Overseas Health Cover (OSHC)',
    deadline: 'February – April (annually)',
    duration: '2–4 years',
    level: ['Masters', 'PhD'],
    eligibility: 'Citizens of participating countries; minimum work experience and commitment to return home.',
    subjects: 'Priority development sectors, Renewable Energy, Public Health, Infrastructure, Agriculture',
    link: 'https://www.dfat.gov.au/people-to-people/australia-awards/Pages/australia-awards-scholarships',
    color: 'from-emerald-600 to-teal-800',
    badge: '🦘 Down Under',
  },
  {
    id: 'swiss-excellence',
    country: 'Switzerland 🇨🇭',
    flag: '🇨🇭',
    name: 'Swiss Government Excellence Scholarships',
    fullName: 'Federal Commission for Scholarships for Foreign Students (FCS / ESKAS)',
    description:
      'Excellence awards for foreign scholars and researchers to study or conduct scientific research at top Swiss universities and Federal Institutes (ETH Zurich, EPFL).',
    funding: 'CHF 1,920/month Stipend + Full Tuition Exemption + Health Insurance + Housing Allowance',
    deadline: 'August – December (annually by embassy)',
    duration: '1–3 years',
    level: ['PhD', 'Postdoc', 'Research Fellowships'],
    eligibility: 'Exceptional academic profile and master degree with confirmed Swiss university supervisor.',
    subjects: 'All fields: Engineering, Quantum Tech, Life Sciences, Economics, Humanities',
    link: 'https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html',
    color: 'from-red-600 to-rose-800',
    badge: '🏔️ Swiss Precision',
  },
  {
    id: 'hungary',
    country: 'Hungary 🇭🇺',
    flag: '🇭🇺',
    name: 'Stipendium Hungaricum',
    fullName: 'Tempus Public Foundation (Government of Hungary)',
    description:
      'Hungary\'s state scholarship welcoming thousands of international students each year to study in English across prestigious European universities.',
    funding: '100% Free Tuition + Monthly Stipend + Free Dormitory or Housing Allowance + Medical Insurance',
    deadline: 'November – January 15 (annually)',
    duration: '2–4 years',
    level: ['Bachelors', 'Masters', 'PhD'],
    eligibility: 'Nominations via the sending partner ministry in applicant’s home country.',
    subjects: 'Medicine, Dentistry, IT, Mechanical Engineering, International Business, Agriculture',
    link: 'https://stipendiumhungaricum.hu/',
    color: 'from-green-600 to-emerald-800',
    badge: '🏰 EU Degree',
  },
]

const stats = [
  { label: 'Verified Global Scholarships', value: `${scholarships.length}+`, icon: '🎓' },
  { label: 'Destination Countries', value: '18+', icon: '🌍' },
  { label: 'Students Guided Worldwide', value: '5,000+', icon: '👨‍🎓' },
  { label: 'Admissions & Visa Rate', value: '92%', icon: '✅' },
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
              <span className="text-gold font-semibold text-sm">🏆 Fully Funded Opportunities 2025–2026</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight">
              Study Abroad with Zero Tuition
              <span className="block text-gold">Top Global Scholarships</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Explore verified official government scholarship programs across Europe, Asia, Russia, the Middle East, and the Americas. 
              Get expert consultation for profile evaluation, SOP drafting, and official submission.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply" className="btn-primary text-lg px-8 py-4">
                Apply for Scholarships Now
              </Link>
              <a href="#scholarships" className="btn-secondary text-lg px-8 py-4">
                Explore All {scholarships.length} Scholarships
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

        {/* Scholarships List Header */}
        <section className="bg-gray-50 py-8 border-b border-gray-200" id="scholarships">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-primary font-heading">
                  All {scholarships.length} Verified Scholarships
                </h2>
                <p className="text-gray-500 text-sm">
                  Official direct application links, benefits, deadlines, and requirements
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {['All', 'Europe', 'Asia', 'Middle East', 'Russia', 'Americas'].map((region) => (
                  <span
                    key={region}
                    className="px-3.5 py-1.5 rounded-full font-medium bg-white border border-gray-200 text-gray-700 shadow-sm"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scholarship Cards Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {scholarships.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-100"
                >
                  {/* Card Header */}
                  <div className={`bg-gradient-to-r ${s.color} p-5 text-white relative`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-3xl mb-1">{s.flag}</div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-white/90">{s.country}</div>
                      </div>
                      <span className="text-xs bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 font-semibold">
                        {s.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mt-3 font-heading leading-tight">{s.name}</h3>
                    <p className="text-xs opacity-80 mt-1 font-light">{s.fullName}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.description}</p>

                    <div className="space-y-3 mb-4 text-sm">
                      <div className="flex items-start gap-2.5">
                        <FaMoneyBillWave className="text-green-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-700">Coverage: </span>
                          <span className="text-gray-600">{s.funding}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <FaCalendarAlt className="text-gold mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-700">Deadline: </span>
                          <span className="text-gray-600">{s.deadline}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <FaGraduationCap className="text-primary mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-700">Degree Level: </span>
                          <span className="text-gray-600">{s.level.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <FaGlobe className="text-blue-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-700">Fields of Study: </span>
                          <span className="text-gray-600">{s.subjects}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-3 mb-5 text-xs text-gray-700">
                      <span className="font-bold text-primary">Eligibility Overview: </span>
                      <span>{s.eligibility}</span>
                    </div>

                    <div className="mt-auto flex gap-3 pt-2 border-t border-gray-100">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 border border-primary text-primary font-semibold py-2.5 rounded-lg hover:bg-primary hover:text-white transition-all text-xs"
                      >
                        Official Portal <FaExternalLinkAlt size={10} />
                      </a>
                      <Link
                        href="/apply"
                        className="flex-1 flex items-center justify-center gap-2 bg-gold text-primary font-bold py-2.5 rounded-lg hover:bg-gold-dark transition-all text-xs shadow-sm"
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
            <h2 className="section-title mb-4">How GlobalEdge Guides Your Scholarship Journey</h2>
            <p className="section-subtitle mb-14">
              Securing high-competition scholarships requires pristine documentation and proven strategy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: '01', icon: '🎯', title: 'Target Selection', desc: 'We match your academic profile, publications, and background with scholarships offering the highest acceptance probability.' },
                { step: '02', icon: '✍️', title: 'SOP & Research Proposal', desc: 'Custom crafted Statements of Purpose, motivation letters, and academic proposals tailored to each country’s standards.' },
                { step: '03', icon: '📁', title: 'Flawless Application', desc: 'Notarization checks, degree attestation guidance, and complete official portal registration without errors.' },
                { step: '04', icon: '🎙️', title: 'Interview & Embassy Prep', desc: 'Mock interviews simulating official scholarship panels (MEXT, Fulbright, DAAD, Türkiye Bursları) to ensure confidence.' },
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

        {/* Bottom CTA */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
              Start Your Scholarship Journey <span className="text-gold">Today</span>
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Don’t miss upcoming deadlines. Submit your details for a complete profile review with our international scholarship advisors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" className="btn-primary text-lg px-10 py-4">
                Submit Your Profile
              </Link>
              <Link href="/contact" className="btn-secondary text-lg px-10 py-4 border-white text-white hover:bg-white hover:text-primary">
                Book 1-on-1 Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
