// Footer.jsx - API-driven footer
import { useEffect, useState } from 'react'
import { endpoints } from '../api/client'

const FALLBACK = {
  columns: [
    { heading: 'Fundraise For', links: [
      { label: 'Medical Treatment Fundraising', href: '/campaigns/medical' },
      { label: 'Cancer Care Crowdfunding',      href: '/campaigns/medical' },
      { label: 'Child Education Fundraising',   href: '/campaigns/education' },
      { label: 'NGO Campaign Fundraising',      href: '/campaigns/ngo' },
      { label: 'Disaster Relief Fund',          href: '/campaigns/disaster' },
    ]},
    { heading: 'Company', links: [
      { label: 'About FundDoo',       href: '/about' },
      { label: 'How Crowdfunding Works', href: '/how-it-works' },
      { label: 'Platform Pricing',       href: '/pricing' },
    ]},
    { heading: 'Support', links: [
      { label: 'Help Centre',      href: '/help' },
      { label: 'Contact Us',       href: '/contact' },
      { label: 'Privacy Policy',   href: '/privacy' },
    ]},
  ],
  socials: [
    { label: 'Facebook',  glyph: 'f',  href: 'https://facebook.com/FundDoo' },
    { label: 'Twitter/X', glyph: '𝕏', href: 'https://twitter.com/FundDoo'  },
    { label: 'Instagram', glyph: '▲', href: 'https://instagram.com/funddoo' },
    { label: 'LinkedIn',  glyph: 'in', href: 'https://linkedin.com/company/funddoo' },
  ],
  meta: {
    company_name:    'FundDoo',
    tagline:         'Together we save lives.',
    address_street:  '1601, One BKC, Bandra Kurla Complex',
    address_city:    'Mumbai',
    address_state:   'Maharashtra',
    address_pin:     '400051',
    address_country: 'India',
    copyright_text:  'FundDoo. All rights reserved.',
    disclaimer:      'PayPal integration uses sandbox mode — demo only, no real transactions processed.',
    legal_link1_label: 'Privacy Policy',  legal_link1_href: '#',
    legal_link2_label: 'Terms of Service', legal_link2_href: '#',
    legal_link3_label: 'Sitemap',         legal_link3_href: '#',
  },
}

export default function Footer() {
  const [footer, setFooter] = useState(FALLBACK)
  const year = new Date().getFullYear()
  const brandName = footer?.meta?.company_name || 'FundDoo'

  useEffect(() => {
    endpoints.footer()
      .then((res) => { if (res.data) setFooter(res.data) })
      .catch(() => {/* silently use fallback */})
  }, [])

  const { columns, socials, meta } = footer

  return (
    <footer className="bg-brand-dark pt-16 pb-0" role="contentinfo" aria-label="FundDoo - Together we save lives site footer"
      itemScope itemType="https://schema.org/WPFooter">
      <div className="max-w-7xl mx-auto px-6" itemScope itemType="https://schema.org/Organization">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand + address */}
          <div>
            <a href="/" className="font-display text-2xl font-black inline-block mb-4" aria-label="FundDoo - Together we save lives home" itemProp="url">
              <span className="text-white" aria-hidden="true">Fund</span>
              <span className="text-brand-orange" aria-hidden="true">Doo</span>
              <span className="sr-only" itemProp="name">{brandName}</span>
            </a>
            <p className="text-sm text-white/40 leading-relaxed mb-3 max-w-xs" itemProp="description">{meta.tagline}</p>
            <address className="text-sm text-white/30 not-italic mb-5 leading-relaxed" itemProp="address"
              itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">{meta.address_street}</span>,{' '}
              <span itemProp="addressLocality">{meta.address_city}</span>,{' '}
              <span itemProp="addressRegion">{meta.address_state}</span>{' '}
              <span itemProp="postalCode">{meta.address_pin}</span>,{' '}
              <span itemProp="addressCountry">{meta.address_country}</span>
            </address>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a key={s.label || s.platform} href={s.href} aria-label={s.label}
                  rel="noopener noreferrer" target="_blank"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 text-sm font-bold hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-150">
                  <span aria-hidden="true">{s.glyph}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.heading} aria-label={`${col.heading} links`}>
              <h3 className="font-display font-bold text-white text-sm mb-5 tracking-wide">{col.heading}</h3>
              <ul className="space-y-3">
                {col.links.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-white/40 hover:text-brand-orange transition-colors duration-150">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/25">© {year} {meta.copyright_text}</p>
            <nav aria-label="Legal links" className="flex gap-4">
              {[1, 2, 3].map((n) => (
                meta[`legal_link${n}_label`] && (
                  <a key={n} href={meta[`legal_link${n}_href`] || '#'}
                    className="text-xs text-white/25 hover:text-white/50 transition-colors">
                    {meta[`legal_link${n}_label`]}
                  </a>
                )
              ))}
            </nav>
          </div>
          <p className="text-xs text-white/15 italic text-center mt-2">{meta.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
