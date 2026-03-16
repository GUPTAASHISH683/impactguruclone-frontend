// HowItWorks.jsx - API-driven
import { useEffect, useState } from 'react'
import { endpoints }           from '../api/client'
import { useScrollReveal }     from '../hooks/useScrollReveal'

const FALLBACK_STEPS = [
  { num:'01', icon:'✍️', title:'Start Your Campaign',        desc:'Fill in your story, set a fundraising goal, and launch your campaign in under 10 minutes — completely free.' },
  { num:'02', icon:'📣', title:'Share With Your Network',    desc:'Share across WhatsApp, Facebook, and email. Our team helps promote your medical or social campaign to millions.' },
  { num:'03', icon:'💸', title:'Receive Donations Securely', desc:'Donors contribute via UPI, cards, or net banking. Funds are transferred directly and quickly to your account.' },
  { num:'04', icon:'🎉', title:'Make a Lasting Impact',      desc:'Use the funds for your cause, update your donors with progress reports, and inspire more giving.' },
]

export default function HowItWorks() {
  const [steps, setSteps]     = useState(FALLBACK_STEPS)
  const [section, setSection] = useState({ heading: 'How to Start a Crowdfunding Campaign', subheading: 'From launch to impact in 4 easy steps on Funddoo — no technical skills needed.', tag: 'Simple Process' })
  const ref = useScrollReveal()

  useEffect(() => {
    endpoints.section('home', 'how-it-works')
      .then((res) => {
        if (!res.data) return
        setSection(res.data)
        const b = res.data.blocks || {}
        const built = [1,2,3,4].map((n) => ({
          num:   b[`step${n}_num`]   || FALLBACK_STEPS[n-1].num,
          icon:  b[`step${n}_icon`]  || FALLBACK_STEPS[n-1].icon,
          title: b[`step${n}_title`] || FALLBACK_STEPS[n-1].title,
          desc:  b[`step${n}_desc`]  || FALLBACK_STEPS[n-1].desc,
        }))
        setSteps(built)
      })
      .catch(() => {})
  }, [])

  return (
    <section id="how" aria-labelledby="how-heading" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-14 reveal">
          <span className="section-tag" aria-hidden="true">{section.tag}</span>
          <h2 id="how-heading" className="section-title">{section.heading}</h2>
          <p className="text-gray-500 max-w-md mx-auto">{section.subheading}</p>
        </header>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Fundraising steps">
          {steps.map((s, i) => (
            <li key={s.num} className="reveal bg-white rounded-2xl p-7 border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 list-none"
              style={{ transitionDelay: `${i * 0.1}s` }}>
              <span aria-hidden="true" className="font-display text-5xl font-black text-gray-100 leading-none mb-2 block">{s.num}</span>
              <span aria-hidden="true" className="text-3xl mb-4 block">{s.icon}</span>
              <h3 className="font-display font-bold text-brand-dark text-lg mb-3">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
