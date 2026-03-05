// Categories.jsx - API-driven
import { useEffect, useState } from 'react'
import { endpoints }           from '../api/client'
import { useScrollReveal }     from '../hooks/useScrollReveal'

const FALLBACK = [
  { id:1, slug:'medical',     label:'Medical',        emoji:'🏥', count:'2,34,000+', bgClass:'bg-orange-50',  borderClass:'border-orange-200'  },
  { id:2, slug:'education',   label:'Education',       emoji:'📚', count:'89,000+',  bgClass:'bg-green-50',   borderClass:'border-green-200'   },
  { id:3, slug:'disaster',    label:'Disaster Relief', emoji:'🌊', count:'12,000+',  bgClass:'bg-blue-50',    borderClass:'border-blue-200'    },
  { id:4, slug:'animals',     label:'Animal Welfare',  emoji:'🐾', count:'34,000+',  bgClass:'bg-yellow-50',  borderClass:'border-yellow-200'  },
  { id:5, slug:'women',       label:'Women & Girls',   emoji:'👩', count:'56,000+',  bgClass:'bg-pink-50',    borderClass:'border-pink-200'    },
  { id:6, slug:'environment', label:'Environment',     emoji:'🌿', count:'18,000+',  bgClass:'bg-emerald-50', borderClass:'border-emerald-200' },
]

export default function Categories() {
  const [categories, setCategories] = useState(FALLBACK)
  const [section, setSection] = useState({ heading: 'Crowdfunding Categories', subheading: 'From medical fundraising to disaster relief — find campaigns that match your values.', tag: 'Browse by Cause' })
  const ref = useScrollReveal()

  useEffect(() => {
    endpoints.categories()
      .then((res) => { if (res.data?.length) setCategories(res.data) })
      .catch(() => {})
    endpoints.section('home', 'categories')
      .then((res) => { if (res.data) setSection(res.data) })
      .catch(() => {})
  }, [])

  return (
    <section id="categories" aria-labelledby="categories-heading" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-14 reveal">
          <span className="section-tag" aria-hidden="true">{section.tag}</span>
          <h2 id="categories-heading" className="section-title">{section.heading}</h2>
          <p className="text-gray-500 max-w-md mx-auto">{section.subheading}</p>
        </header>
        <nav aria-label="Fundraising campaign categories">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" role="list">
            {categories.map((cat, i) => (
              <li key={cat.slug} className="reveal list-none" style={{ transitionDelay: `${i * 0.07}s` }}>
                <a href={`/campaigns/${cat.slug}`}
                  className={`${cat.bgClass} border-2 ${cat.borderClass} rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-1.5 hover:shadow-lg transition-all duration-200 group block`}
                  aria-label={`Browse ${cat.label} crowdfunding campaigns - ${cat.count} campaigns`}>
                  <span aria-hidden="true" className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200 block">{cat.emoji}</span>
                  <span className="font-display font-bold text-brand-dark text-sm mb-1 block">{cat.label}</span>
                  <span className="text-xs text-gray-500">{cat.count} campaigns</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
