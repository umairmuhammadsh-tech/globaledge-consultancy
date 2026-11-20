'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBars, FaTimes, FaGraduationCap, FaPhone, FaEnvelope } from 'react-icons/fa'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Scholarships', href: '/scholarships' },
  { label: 'Destinations', href: '/countries' },
  { label: '📱 Mobile App', href: '/mobile' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="text-gray-300">🌍 Your Gateway to World-Class Education</span>
          <div className="flex items-center gap-6">
            <a href="tel:+923124718386" className="flex items-center gap-2 hover:text-gold transition-colors">
              <FaPhone size={12} /> +92 312 4718386
            </a>
            <a href="mailto:huzglobalsolutions@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
              <FaEnvelope size={12} /> huzglobalsolutions@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-lg border-b border-gray-100'
            : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-primary group-hover:shadow-lg transition-all">
                <FaGraduationCap className="text-gold text-xl" />
              </div>
              <div>
                <span className="text-xl font-bold text-primary font-heading">GlobalEdge</span>
                <span className="text-xl font-bold text-gold font-heading"> Consultancy</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-gold bg-primary/5 font-semibold'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link href="/apply" className="btn-primary text-sm py-2.5 px-5">
                Apply Now
              </Link>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-primary hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                  pathname === link.href
                    ? 'text-gold bg-primary/5 font-semibold'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100">
              <Link href="/apply" className="btn-primary w-full text-center block">
                Apply Now
              </Link>
            </div>
            <div className="pt-3 space-y-2 text-sm text-gray-500">
              <a href="tel:+923124718386" className="flex items-center gap-2 px-4">
                <FaPhone size={12} /> +92 312 4718386
              </a>
              <a href="mailto:huzglobalsolutions@gmail.com" className="flex items-center gap-2 px-4">
                <FaEnvelope size={12} /> huzglobalsolutions@gmail.com
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
