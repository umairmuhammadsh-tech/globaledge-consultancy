'use client'

import { useState } from 'react'
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const testimonials = [
  {
    name: 'Aisha Malik',
    country: '🇵🇰 Pakistan → 🇬🇧 UK',
    university: 'University of Edinburgh',
    course: 'MSc Data Science',
    text: 'GlobalEdge made my dream of studying in the UK a reality. From shortlisting universities to getting my visa approved, they guided me at every step. I even got a £8,000 scholarship thanks to their help!',
    rating: 5,
    avatar: 'AM',
    color: 'bg-blue-500',
  },
  {
    name: 'Carlos Rivera',
    country: '🇲🇽 Mexico → 🇺🇸 USA',
    university: 'University of Michigan',
    course: 'MBA',
    text: 'I was overwhelmed by the US application process, but the team at GlobalEdge made it manageable. Their counselors are incredibly knowledgeable and always available. Best decision I ever made!',
    rating: 5,
    avatar: 'CR',
    color: 'bg-red-500',
  },
  {
    name: 'Priya Sharma',
    country: '🇮🇳 India → 🇨🇦 Canada',
    university: 'University of Toronto',
    course: 'MEng Computer Engineering',
    text: 'GlobalEdge helped me secure admission to my top-choice university in Canada AND helped me apply for a scholarship that covered 40% of my tuition. Their scholarship database is incredible!',
    rating: 5,
    avatar: 'PS',
    color: 'bg-green-500',
  },
  {
    name: 'Ahmed Hassan',
    country: '🇪🇬 Egypt → 🇦🇺 Australia',
    university: 'University of Melbourne',
    course: 'PhD Biomedical Engineering',
    text: 'The team\'s expertise in Australian university applications is unmatched. They helped me navigate the complex research visa process and prepare for my PhD interviews. I\'m now fully funded!',
    rating: 5,
    avatar: 'AH',
    color: 'bg-yellow-500',
  },
  {
    name: 'Sophie Müller',
    country: '🇿🇦 South Africa → 🇩🇪 Germany',
    university: 'TU Munich',
    course: 'MSc Mechanical Engineering',
    text: 'Studying in Germany for free seemed impossible until I found GlobalEdge. They walked me through blocked account requirements, language certifications, and university applications. Now I\'m at TU Munich tuition-free!',
    rating: 5,
    avatar: 'SM',
    color: 'bg-gray-600',
  },
  {
    name: 'James Chen',
    country: '🇭🇰 Hong Kong → 🇳🇿 New Zealand',
    university: 'University of Auckland',
    course: 'BCom Finance',
    text: 'GlobalEdge\'s IELTS preparation program helped me score 8.0 on my first attempt! Combined with their admissions guidance, I got into my dream university with a partial scholarship.',
    rating: 5,
    avatar: 'JC',
    color: 'bg-emerald-500',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(null)

  const prev = () => {
    setDirection('left')
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }
  const next = () => {
    setDirection('right')
    setCurrent((c) => (c + 1) % testimonials.length)
  }

  const visible = [
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ]

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            Student Stories
          </span>
          <h2 className="section-title">What Our Students Say</h2>
          <p className="section-subtitle">
            Real stories from real students who achieved their dreams with GlobalEdge Consultancy.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {visible.map((testimonial, i) => (
            <div
              key={`${current}-${i}`}
              className={`bg-white rounded-2xl shadow-card p-7 border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                i === 0 ? 'md:scale-105 shadow-lg border-gold/20' : ''
              }`}
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-gold/30 text-4xl mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <FaStar key={j} className="text-gold" size={16} />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div
                  className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.country}</p>
                  <p className="text-xs text-gold font-medium">{testimonial.university} • {testimonial.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-6">
          <button
            onClick={prev}
            className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
            aria-label="Previous"
          >
            <FaChevronLeft size={16} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-8 h-2.5 bg-gold'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
            aria-label="Next"
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
