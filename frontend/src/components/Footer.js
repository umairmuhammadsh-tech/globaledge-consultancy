import Link from 'next/link'
import {
  FaGraduationCap,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from 'react-icons/fa'

const services = [
  'University Admissions',
  'Visa Guidance',
  'Scholarship Hunting',
  'Test Prep (IELTS/TOEFL/GRE)',
  'Career Counseling',
]

const destinations = [
  { name: 'United Kingdom', href: '/countries#uk' },
  { name: 'United States', href: '/countries#usa' },
  { name: 'Canada', href: '/countries#canada' },
  { name: 'Australia', href: '/countries#australia' },
  { name: 'Germany', href: '/countries#germany' },
  { name: 'New Zealand', href: '/countries#newzealand' },
]

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Scholarships', href: '/scholarships' },
  { label: 'Destinations', href: '/countries' },
  { label: 'About Us', href: '/about' },
  { label: 'Apply Now', href: '/apply' },
  { label: 'Contact', href: '/contact' },
  { label: 'Admin Portal', href: '/admin' },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-gold to-gold-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-primary font-heading">
              Ready to Start Your Journey?
            </h3>
            <p className="text-primary/80 mt-1">
              Get a free consultation with our expert advisors today.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/apply"
              className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-dark transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                <FaGraduationCap className="text-primary text-xl" />
              </div>
              <div>
                <span className="text-xl font-bold font-heading">GlobalEdge</span>
                <span className="text-xl font-bold text-gold font-heading"> Consultancy</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted partner for international education. We help students
              achieve their dreams of studying at world-class universities across the globe.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaFacebook, href: '#' },
                { icon: FaTwitter, href: '#' },
                { icon: FaInstagram, href: '#' },
                { icon: FaLinkedin, href: '#' },
                { icon: FaYoutube, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-primary transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold font-heading mb-5 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group text-sm"
                  >
                    <FaArrowRight
                      size={10}
                      className="group-hover:translate-x-1 transition-transform text-gold/50 group-hover:text-gold"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-semibold font-heading mb-5 text-gold">Destinations</h4>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest.name}>
                  <Link
                    href={dest.href}
                    className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group text-sm"
                  >
                    <FaArrowRight
                      size={10}
                      className="group-hover:translate-x-1 transition-transform text-gold/50 group-hover:text-gold"
                    />
                    {dest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold font-heading mb-5 text-gold">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gold mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-400 text-sm">
                  123 Education Avenue, Suite 400
                  <br />
                  New York, NY 10001, USA
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-gold flex-shrink-0" size={14} />
                <a href="tel:+923124718386" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  +92 312 4718386
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-gold flex-shrink-0" size={14} />
                <a href="mailto:huzglobalsolutions@gmail.com" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  huzglobalsolutions@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-gray-400 mb-1 font-medium">Office Hours</p>
              <p className="text-sm text-gray-300">Mon – Fri: 9:00 AM – 6:00 PM</p>
              <p className="text-sm text-gray-300">Sat: 10:00 AM – 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} GlobalEdge Consultancy. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-xs">
            <a href="/LEGAL_STUDENT_CONTRACT.pdf" download className="hover:text-gold transition-colors underline">Legal Contract (PDF)</a>
            <a href="/LEGAL_STUDENT_CONTRACT.docx" download className="hover:text-gold transition-colors underline">Legal Contract (Word)</a>
            <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
