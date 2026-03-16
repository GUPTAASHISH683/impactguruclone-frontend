// CTASection.jsx - API-driven
import { useEffect, useState } from 'react'
import { endpoints }           from '../api/client'
import { useScrollReveal }     from '../hooks/useScrollReveal'

export default function CTASection() {
  const [section, setSection] = useState({
    heading:    'Start Your Free Crowdfunding Campaign Today',
    subheading: 'Funddoo is a platform that helps people raise funds for medical and personal causes. Together we save lives. Zero platform fee for medical campaigns.',
    blocks: {
      benefit1:            '✅ 100% Secure Payments',
      benefit2:            '✅ Zero Platform Fee',
      benefit3:            '✅ 24/7 Fundraising Support',
      cta_primary_label:   "Start Your Campaign - It's Free →",
      cta_secondary_label: 'Explore Campaigns',
    },
  })
  const ref = useScrollReveal()

  useEffect(() => {
    endpoints.section('home', 'cta')
      .then((res) => { if (res.data) setSection(res.data) })
      .catch(() => {})
  }, [])

  const b = section.blocks || {}

  return (
    <section id="start" aria-labelledby="cta-heading" className="py-20 bg-brand-cream" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal bg-cta-gradient rounded-3xl p-12 sm:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
          <div aria-hidden="true" className="absolute -right-20 -top-20 w-72 h-72 bg-brand-primary/10 rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-lg">
            <h2 id="cta-heading" className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">{section.heading}</h2>
            <p className="text-white/65 text-base mb-6 leading-relaxed">{section.subheading}</p>
            <ul className="flex gap-5 flex-wrap text-sm text-white/60 list-none" aria-label="Key benefits">
              {[b.benefit1, b.benefit2, b.benefit3].filter(Boolean).map((ben, i) => <li key={i}>{ben}</li>)}
            </ul>
          </div>
          <div className="relative z-10 flex flex-col gap-3 flex-shrink-0">
            <a href="#" className="bg-brand-primary text-white font-semibold text-base px-10 py-4 rounded-2xl text-center border-2 border-brand-primary hover:bg-brand-primary-dk hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-200"
              aria-label="Start your free fundraising campaign on Funddoo - Together we save lives">
              {b.cta_primary_label || "Start Your Campaign - It's Free →"}
            </a>
            <a href="#campaigns" onClick={(e) => { e.preventDefault(); document.querySelector('#campaigns')?.scrollIntoView({ behavior:'smooth', block:'start' }) }}
              className="bg-transparent border-2 border-gray-600 text-gray-300 font-semibold text-base px-10 py-4 rounded-2xl text-center hover:border-gray-400 hover:text-white transition-all duration-200"
              aria-label="Browse existing fundraising campaigns">
              {b.cta_secondary_label || 'Explore Campaigns'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
