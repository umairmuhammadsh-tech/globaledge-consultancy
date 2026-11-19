import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Countries from '@/components/Countries'
import Link from 'next/link'

export const metadata = {
  title: 'Study Destinations | GlobalEdge Consultancy',
  description:
    'Explore study destinations: UK, USA, Canada, Australia, Germany, New Zealand. Find the right country for your education goals with GlobalEdge.',
}

export default function CountriesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-block bg-gold/20 text-gold border border-gold/30 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
              🌍 6 Countries · 1 Expert Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-5">
              Study Destinations
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Whether you dream of studying at Oxford, MIT, or TU Munich — we have the expertise to get you there. Explore your options below.
            </p>
          </div>
        </section>

        {/* Countries */}
        <Countries preview={false} />

        {/* Quick Compare Table */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="section-title">Quick Comparison</h2>
              <p className="section-subtitle">
                Not sure which country is right for you? This quick table can help.
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl shadow-card">
              <table className="w-full text-sm text-left bg-white">
                <thead className="bg-primary text-white">
                  <tr>
                    {['Country', 'Post-Study Work', 'Avg. Cost/yr', 'PR Pathway', 'Part-time Work', 'Language'].map((h) => (
                      <th key={h} className="px-5 py-4 font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { country: '🇬🇧 UK', work: '2 years', cost: '£15–35k', pr: 'Skilled Worker', partTime: '20 hrs/wk', lang: 'English' },
                    { country: '🇺🇸 USA', work: '1–3 years (OPT)', cost: '$20–60k', pr: 'EB-2/EB-3', partTime: '20 hrs/wk', lang: 'English' },
                    { country: '🇨🇦 Canada', work: '1–3 years', cost: 'CAD $15–35k', pr: 'CEC / PNP', partTime: '20 hrs/wk', lang: 'EN/FR' },
                    { country: '🇦🇺 Australia', work: '2–4 years', cost: 'AUD $20–45k', pr: 'Skilled Ind.', partTime: 'Unlimited', lang: 'English' },
                    { country: '🇩🇪 Germany', work: '18 months', cost: '€0–3k (mostly free)', pr: 'Job Seeker', partTime: '20 hrs/wk', lang: 'German/EN' },
                    { country: '🇳🇿 New Zealand', work: 'Up to 3 years', cost: 'NZD $22–35k', pr: 'Skilled Migrant', partTime: '20 hrs/wk', lang: 'English' },
                  ].map((row, i) => (
                    <tr key={i} className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                      <td className="px-5 py-4 font-semibold text-primary">{row.country}</td>
                      <td className="px-5 py-4 text-gray-700">{row.work}</td>
                      <td className="px-5 py-4 text-gray-700">{row.cost}</td>
                      <td className="px-5 py-4 text-gray-700">{row.pr}</td>
                      <td className="px-5 py-4 text-gray-700">{row.partTime}</td>
                      <td className="px-5 py-4 text-gray-700">{row.lang}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary font-heading mb-5">
              Still Can't Decide? Let Our Experts Help!
            </h2>
            <p className="text-gray-600 mb-8">
              Our counselors will evaluate your profile, goals, and budget to recommend the perfect destination for you — completely free of charge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" className="btn-primary py-4 px-10 text-base">
                Apply Now
              </Link>
              <Link href="/contact" className="btn-secondary py-4 px-10 text-base">
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
