// Testimonials.jsx - API-driven
import { useEffect, useState } from 'react'
import { endpoints }           from '../api/client'
import { useScrollReveal }     from '../hooks/useScrollReveal'

const FALLBACK = [
  { id:1, quote:"Funddoo made it incredibly easy to share our story. Within days, people from across India were contributing to my father's treatment.", name:'Priya Sharma',  location:'Mumbai, Maharashtra',  initials:'PS', colorClass:'bg-green-500' },
  { id:2, quote:"I started a campaign for my village school on Funddoo. Donors from everywhere helped us build a library the children had always dreamed of.",  name:'Ramesh Nair',  location:'Kozhikode, Kerala',    initials:'RN', colorClass:'bg-teal-600'   },
  { id:3, quote:"The platform is transparent and simple. I could see exactly how funds were being used throughout my campaign. That trust matters enormously.", name:'Anjali Das', location:'Guwahati, Assam', initials:'AD', colorClass:'bg-indigo-600' },
  { id:4, quote:"Funddoo connected my campaign with donors I would never have reached on my own. Their support team guided me every step of the way.", name:'Vikram Patel', location:'Ahmedabad, Gujarat', initials:'VP', colorClass:'bg-purple-600' },
]

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(FALLBACK)
  const [sectionData,  setSectionData]  = useState({ heading: 'What Our Donors & Campaigners Say', subheading: 'Real stories from the Funddoo community' })
  const ref = useScrollReveal()

  useEffect(() => {
    endpoints.testimonials()
      .then((res) => { if (res.data?.length) setTestimonials(res.data) })
      .catch(() => {})
    endpoints.section('home', 'testimonials')
      .then((res) => { if (res.data) setSectionData(res.data) })
      .catch(() => {})
  }, [])

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-20 bg-hero-gradient" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-14 reveal">
          <span className="inline-block bg-green-500/10 border border-green-400/30 text-green-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3" aria-hidden="true">Real Stories</span>
          <h2 id="testimonials-heading" className="font-display text-3xl md:text-4xl font-bold text-white mb-3">{sectionData.heading}</h2>
          <p className="text-white/60 text-sm">{sectionData.subheading}</p>
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" role="list" aria-label="User reviews and testimonials">
          {testimonials.map((t, i) => (
            <li key={t.id} className="reveal bg-white/6 border border-white/10 rounded-2xl p-7 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300 list-none"
              style={{ transitionDelay: `${i * 0.1}s` }} itemScope itemType="https://schema.org/Review">
              <blockquote itemProp="reviewBody">
                <p aria-hidden="true" className="font-display text-5xl text-brand-primary leading-none mb-4">"</p>
                <p className="text-sm text-white/80 leading-relaxed mb-6">{t.quote}</p>
              </blockquote>
              <footer>
                <cite className="flex items-center gap-3 not-italic" itemScope itemType="https://schema.org/Person" itemProp="author">
                  <div className={`w-10 h-10 rounded-full ${t.colorClass} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`} aria-hidden="true">{t.initials}</div>
                  <div>
                    <span className="text-sm font-semibold text-white block" itemProp="name">{t.name}</span>
                    <span className="text-xs text-white/40" itemProp="address">{t.location}</span>
                  </div>
                </cite>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
