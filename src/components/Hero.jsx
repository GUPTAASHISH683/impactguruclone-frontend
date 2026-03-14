// Hero.jsx - API-driven hero section
import { useEffect, useState } from 'react'
import { endpoints }           from '../api/client'

const FALLBACK_BLOCKS = {
  trust_badge:         '🌟 Trusted by 2M+ donors across India',
  heading_line1:       "India's #1",
  heading_line2:       'Crowdfunding Platform',
  subheading:          'Raise funds for medical emergencies, education, and social causes. Over ₹1,200 Cr raised. Start your campaign free in minutes.',
  cta_primary_label:   'Donate Now',
  cta_primary_href:    '#campaigns',
  cta_secondary_label: 'Start Fundraising →',
  cta_secondary_href:  '#start',
  stat1_num:           '₹1,200 Cr+', stat1_label: 'Total Raised',
  stat2_num:           '5,00,000+',  stat2_label: 'Active Campaigns',
  stat3_num:           '20M+',       stat3_label: 'Lives Impacted',
  float_card1_title:   "Rohan's Cancer Treatment", float_card1_emoji: '👦', float_card1_pct: '72',
  float_card1_bg:      'linear-gradient(135deg,#FF6B6B,#FF8E53)',
  float_card2_title:   'Education for Tribal Kids', float_card2_emoji: '📚', float_card2_pct: '89',
  float_card2_bg:      'linear-gradient(135deg,#4facfe,#00c6ff)',
}

function FloatCard({ title, emoji, pct, bg }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden w-56 shadow-2xl animate-float-slow" aria-hidden="true">
      <div className="h-28 flex items-center justify-center text-5xl" style={{ background: bg }}>
        <span role="img" aria-label={title}>{emoji}</span>
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold text-brand-dark mb-2 leading-tight">{title}</p>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1" role="progressbar"
          aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100" aria-label={`${pct}% funded`}>
          <div className="h-full bg-gradient-to-r from-brand-teal to-brand-teal-lt rounded-full"
            style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs text-brand-teal font-semibold">{pct}% funded</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const [blocks, setBlocks] = useState(FALLBACK_BLOCKS)

  useEffect(() => {
    endpoints.section('home', 'hero')
      .then((res) => { if (res.data?.blocks) setBlocks({ ...FALLBACK_BLOCKS, ...res.data.blocks }) })
      .catch(() => {})
  }, [])

  const handleScroll = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' })
  }

  const stats = [
    { num: blocks.stat1_num, label: blocks.stat1_label },
    { num: blocks.stat2_num, label: blocks.stat2_label },
    { num: blocks.stat3_num, label: blocks.stat3_label },
  ]

  return (
    <section id="home" aria-label="FundDoo - Together we save lives"
      className="relative min-h-screen bg-hero-gradient flex items-center overflow-hidden pt-16">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 25% 55%, rgba(255,87,34,.13) 0%, transparent 55%)' }} />

      <div className="max-w-7xl mx-auto px-6 w-full flex items-center gap-16 py-20">
        <div className="flex-1 animate-fade-up">
          <p className="inline-block bg-orange-500/15 border border-orange-400/40 text-orange-300 text-sm font-medium px-5 py-2 rounded-full mb-6 tracking-wide">
            {blocks.trust_badge}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-5">
            {blocks.heading_line1}<br />
            <span className="text-brand-orange">{blocks.heading_line2}</span>
          </h1>
          <p className="text-lg text-white/70 mb-10 max-w-md leading-relaxed">
            {blocks.subheading}
          </p>
          <div className="flex gap-4 flex-wrap mb-14">
            <a href={blocks.cta_primary_href} onClick={(e) => handleScroll(e, blocks.cta_primary_href)}
              className="bg-white text-brand-orange font-semibold text-base px-8 py-3.5 rounded-xl border-2 border-white transition-all duration-200 hover:bg-brand-cream hover:-translate-y-0.5 hover:shadow-lg"
              aria-label="Donate to a campaign now">
              {blocks.cta_primary_label}
            </a>
            <a href={blocks.cta_secondary_href} onClick={(e) => handleScroll(e, blocks.cta_secondary_href)}
              className="btn-ghost text-base px-8 py-3.5 rounded-xl" aria-label="Start your free fundraising campaign">
              {blocks.cta_secondary_label}
            </a>
          </div>
          <dl className="flex items-center gap-8 flex-wrap">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-8">
                {i > 0 && <div aria-hidden="true" className="w-px h-9 bg-white/20" />}
                <div>
                  <dt className="text-xs text-white/50 uppercase tracking-widest order-2">{s.label}</dt>
                  <dd className="font-display text-2xl font-bold text-white order-1">{s.num}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="hidden xl:flex flex-col gap-5 flex-shrink-0" aria-hidden="true">
          <FloatCard
            title={blocks.float_card1_title} emoji={blocks.float_card1_emoji}
            pct={blocks.float_card1_pct}    bg={blocks.float_card1_bg}
          />
          <FloatCard
            title={blocks.float_card2_title} emoji={blocks.float_card2_emoji}
            pct={blocks.float_card2_pct}    bg={blocks.float_card2_bg}
          />
        </div>
      </div>
    </section>
  )
}
