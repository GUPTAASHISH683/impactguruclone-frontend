// Footer.jsx - API-driven footer
import { useEffect, useState } from 'react'
import { endpoints } from '../api/client'
import Logo          from './Logo'

const FALLBACK = {
  columns: [
    { heading: 'Fundraise For', links: [
      { label: 'Medical Treatment Fundraising', href: '/campaigns/medical'   },
      { label: 'Cancer Care Crowdfunding',      href: '/campaigns/medical'   },
      { label: 'Child Education Fundraising',   href: '/campaigns/education' },
      { label: 'NGO Campaign Fundraising',      href: '/campaigns/ngo'       },
      { label: 'Disaster Relief Fund',          href: '/campaigns/disaster'  },
    ]},
    { heading: 'Company', links: [
      { label: 'About Funddoo',          href: '/about'        },
      { label: 'How Crowdfunding Works', href: '/how-it-works' },
      { label: 'Platform Pricing',       href: '/pricing'      },
    ]},
    { heading: 'Support', links: [
      { label: 'Help Centre',      href: '/help'    },
      { label: 'Contact Us',       href: '/contact' },
      { label: 'Privacy Policy',   href: '/privacy' },
    ]},
  ],
  socials: [
    { label: 'Facebook',  glyph: 'f',  href: 'https://facebook.com/funddoo'        },
    { label: 'Twitter/X', glyph: '𝕏', href: 'https://twitter.com/funddoo'         },
    { label: 'Instagram', glyph: '▲', href: 'https://instagram.com/funddoo'        },
    { label: 'LinkedIn',  glyph: 'in', href: 'https://linkedin.com/company/funddoo' },
  ],
  meta: {
    company_name:    'Funddoo',
    tagline:         'Together we save lives.',
    address_street:  '1601, One BKC, Bandra Kurla Complex',
    address_city:    'Mumbai',
    address_state:   'Maharashtra',
    address_pin:     '400051',
    address_country: 'India',
    copyright_text:  'Funddoo. All rights reserved.',
    disclaimer:      'Funddoo is a new crowdfunding platform. Payments are processed securely via RBI-compliant gateways.',
    legal_link1_label: 'Privacy Policy',   legal_link1_href: '#',
    legal_link2_label: 'Terms of Service', legal_link2_href: '#',
    legal_link3_label: 'Sitemap',          legal_link3_href: '#',
  },
}

export default function Footer() {
  const [footer, setFooter] = useState(FALLBACK)
  const year = new Date().getFullYear()

  useEffect(() => {
    endpoints.footer()
      .then((res) => { if (res.data) setFooter(res.data) })
      .catch(() => {})
  }, [])

  const { columns, socials, meta } = footer

  return (
    <footer
      className="bg-brand-dark pt-16 pb-0"
      role="contentinfo"
      aria-label="Funddoo site footer"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="max-w-7xl mx-auto px-6" itemScope itemType="https://schema.org/Organization">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand + address column */}
          <div>
            <a href="/" className="inline-block mb-4" aria-label="Funddoo home" itemProp="url">
              {/* Light variant renders wordmark in white for dark background */}
              <Logo variant="light" className="h-17 w-auto" />
              <span className="sr-only" itemProp="name">{meta.company_name}</span>
            </a>
            <p className="text-sm text-white/50 leading-relaxed mb-4 max-w-xs" itemProp="description">
              {meta.tagline}
            </p>
            <address
              className="text-sm text-white/30 not-italic mb-5 leading-relaxed"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span itemProp="streetAddress">{meta.address_street}</span>,{' '}
              <span itemProp="addressLocality">{meta.address_city}</span>,{' '}
              <span itemProp="addressRegion">{meta.address_state}</span>{' '}
              <span itemProp="postalCode">{meta.address_pin}</span>,{' '}
              <span itemProp="addressCountry">{meta.address_country}</span>
            </address>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label || s.platform}
                  href={s.href}
                  aria-label={s.label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 text-sm font-bold hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-150"
                >
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
                    <a href={item.href} className="text-sm text-white/40 hover:text-brand-primary transition-colors duration-150">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/30">© {year} {meta.copyright_text}</p>
            <nav aria-label="Legal links" className="flex gap-4">
              {[1, 2, 3].map((n) =>
                meta[`legal_link${n}_label`] ? (
                  <a
                    key={n}
                    href={meta[`legal_link${n}_href`] || '#'}
                    className="text-xs text-white/30 hover:text-white/60 transition-colors"
                  >
                    {meta[`legal_link${n}_label`]}
                  </a>
                ) : null
              )}
            </nav>
          </div>
          <p className="text-xs text-white/20 italic text-center mt-3">{meta.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
