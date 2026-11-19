import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ApplyForm from '@/components/ApplyForm'
import { FaShieldAlt, FaClock, FaHeadset } from 'react-icons/fa'

export const metadata = {
  title: 'Apply Now | GlobalEdge Consultancy',
  description:
    'Start your study abroad journey today. Submit your application to GlobalEdge Consultancy and get expert guidance for university admissions, visa, and scholarships.',
}

export default function ApplyPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-primary py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-block bg-gold/20 text-gold border border-gold/30 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
              🚀 Start Your Journey Today
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-5">
              Apply for Expert Guidance
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Fill out the application below and our team will reach out within 24–48 hours to
              schedule your free consultation session.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Left: Trust Signals */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl shadow-card p-7">
                  <h3 className="text-xl font-bold text-primary font-heading mb-5">
                    What Happens Next?
                  </h3>
                  <ol className="space-y-5">
                    {[
                      { icon: '📋', title: 'Submit Your Application', desc: 'Fill out the form with your details and study goals.' },
                      { icon: '📞', title: 'We Call You Back', desc: 'An expert counselor contacts you within 24–48 hours.' },
                      { icon: '🗺️', title: 'Get Your Roadmap', desc: 'Receive a personalized study abroad plan at no cost.' },
                      { icon: '🎓', title: 'Start Your Journey', desc: 'Begin your application with full expert support.' },
                    ].map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="text-2xl flex-shrink-0">{step.icon}</span>
                        <div>
                          <p className="font-semibold text-primary text-sm">{step.title}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Trust badges */}
                <div className="space-y-3">
                  {[
                    { icon: FaShieldAlt, title: '100% Confidential', desc: 'Your data is never shared with third parties.' },
                    { icon: FaClock, title: '24–48hr Response', desc: 'Fast, guaranteed callback from our team.' },
                    { icon: FaHeadset, title: 'Free Consultation', desc: 'No fees, no obligations, just expert advice.' },
                  ].map(({ icon: Icon, title, desc }, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="text-primary text-lg" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary text-sm">{title}</p>
                        <p className="text-gray-500 text-xs">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats mini */}
                <div className="bg-gradient-primary rounded-2xl p-6 text-white">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    {[
                      { n: '10,000+', l: 'Students Placed' },
                      { n: '98%', l: 'Visa Success' },
                      { n: '$5M+', l: 'Scholarships Won' },
                      { n: '15+', l: 'Years Experience' },
                    ].map((s, i) => (
                      <div key={i}>
                        <div className="text-xl font-bold text-gold font-heading">{s.n}</div>
                        <div className="text-xs text-gray-300">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-2">
                <ApplyForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
