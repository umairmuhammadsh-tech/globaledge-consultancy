'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { number: 10000, suffix: '+', label: 'Students Placed', description: 'Successful placements worldwide', icon: '🎓' },
  { number: 98, suffix: '%', label: 'Visa Success Rate', description: 'Industry-leading approval rate', icon: '✈️' },
  { number: 50, suffix: '+', label: 'Partner Universities', description: 'Top-ranked global institutions', icon: '🏛️' },
  { number: 15, suffix: '+', label: 'Years Experience', description: 'Proven track record', icon: '⭐' },
  { number: 6, suffix: '', label: 'Countries Covered', description: 'UK, USA, Canada, AUS, GER, NZ', icon: '🌍' },
  { number: 95, suffix: '%', label: 'Satisfaction Rate', description: 'From our student surveys', icon: '💯' },
]

function CountUp({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-heading">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-300 mt-4 text-lg">
            Transforming student futures with proven expertise and dedication
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gold font-heading">
                <CountUp target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-white font-semibold text-sm mt-1">{stat.label}</div>
              <div className="text-gray-400 text-xs mt-1 leading-tight">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
