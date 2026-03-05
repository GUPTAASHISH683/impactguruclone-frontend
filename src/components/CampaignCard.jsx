// CampaignCard.jsx - SEO: article + schema.org DonateAction JSON-LD, proper heading hierarchy,
// aria-label on progress bar, descriptive button text

import { useState } from 'react'
import DonateModal from './DonateModal'

function formatINR(n) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(1) + ' Cr'
  if (n >= 100000)   return '₹' + (n / 100000).toFixed(1) + ' L'
  if (n >= 1000)     return '₹' + (n / 1000).toFixed(0) + 'K'
  return '₹' + n
}

export default function CampaignCard({ campaign, delay = 0, headingLevel = 3 }) {
  const [showModal, setShowModal] = useState(false)
  const pct = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100)
  const Heading = `h${headingLevel}`

  // Inline JSON-LD per card for rich result eligibility
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DonateAction',
    'name': `Donate to: ${campaign.title}`,
    'description': campaign.desc,
    'recipient': {
      '@type': 'Organization',
      'name': campaign.title,
      'description': campaign.desc,
    },
    'url': `https://www.impactguru.com/campaigns/${campaign.id}`,
    'potentialAction': {
      '@type': 'DonateAction',
      'name': 'Donate Now',
      'target': `https://www.impactguru.com/campaigns/${campaign.id}/donate`
    }
  }

  return (
    <>
      <article
        className="reveal bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover flex flex-col"
        style={{ transitionDelay: `${delay}s` }}
        itemScope
        itemType="https://schema.org/DonateAction"
        aria-label={`Campaign: ${campaign.title}`}
      >
        {/* Machine-readable JSON-LD for this campaign */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Thumbnail */}
        <div
          className="relative h-48 flex items-center justify-center text-6xl flex-shrink-0"
          style={{ background: campaign.bg }}
          aria-hidden="true"
        >
          <span role="img" aria-label={`${campaign.title} campaign image`}>{campaign.emoji}</span>
          <span className="absolute top-3 left-3 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            {campaign.label}
          </span>
          {campaign.urgent && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse-dot"
              aria-label="Urgent campaign">
              🔴 Urgent
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1">
          <Heading
            className="font-display font-bold text-brand-dark text-base mb-2 leading-snug line-clamp-2"
            itemProp="name"
          >
            {campaign.title}
          </Heading>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1" itemProp="description">
            {campaign.desc}
          </p>

          {/* Progress */}
          <div className="mb-4" aria-label={`Fundraising progress for ${campaign.title}`}>
            <div
              className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`${pct}% of goal reached`}
            >
              <div
                className="h-full bg-gradient-to-r from-brand-teal to-brand-teal-lt rounded-full progress-fill"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-brand-teal font-semibold" itemProp="price">
                {formatINR(campaign.raised)} raised
              </span>
              <span className="text-gray-400">Goal: {formatINR(campaign.goal)}</span>
            </div>
          </div>

          {/* Meta footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
            <div className="text-xs text-gray-500">
              <span className="font-semibold text-brand-dark">{campaign.donors.toLocaleString('en-IN')}</span>
              {' '}donors · <span className="font-semibold text-brand-dark">{campaign.daysLeft}d</span> left
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary text-xs py-2 px-4 rounded-lg"
              aria-label={`Donate to ${campaign.title}`}
            >
              💛 Donate Now
            </button>
          </div>
        </div>
      </article>

      {showModal && <DonateModal campaign={campaign} onClose={() => setShowModal(false)} />}
    </>
  )
}
