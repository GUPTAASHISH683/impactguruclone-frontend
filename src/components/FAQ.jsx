// FAQ.jsx - API-driven
import { useState, useEffect }  from 'react'
import { endpoints }            from '../api/client'
import { useScrollReveal }      from '../hooks/useScrollReveal'

const FALLBACK_FAQS = [
  { id:1, question:'How do I start a fundraiser on FundDoo?',       answer:'Starting a fundraiser is free and takes under 10 minutes. Fill in your story, upload a photo, set your goal amount, and launch.' },
  { id:2, question:'Is there a platform fee for medical crowdfunding?', answer:'FundDoo charges zero platform fee for medical campaigns. A small payment processing fee (2-3%) applies.' },
  { id:3, question:'How quickly will I receive the donated funds?',     answer:'Funds are transferred to your verified bank account within 5-7 working days.' },
  { id:4, question:'Is donating on FundDoo safe and secure?',       answer:'Yes. We use 256-bit SSL encryption and partner with RBI-compliant payment gateways.' },
]

function AccordionItem({ faq, index, isOpen, onToggle }) {
  const id = `faq-${index}`
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
      <button id={`${id}-btn`} aria-expanded={isOpen} aria-controls={`${id}-panel`} onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-150 gap-4">
        <h3 className="font-semibold text-brand-dark text-sm sm:text-base leading-snug" itemProp="name">{faq.question}</h3>
        <span aria-hidden="true" className={`text-brand-orange text-xl flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`}
        itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
        <p className="px-6 pb-5 pt-1 text-sm text-gray-500 leading-relaxed" itemProp="text">{faq.answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [faqs,      setFaqs]      = useState(FALLBACK_FAQS)
  const [section,   setSection]   = useState({ heading: 'Frequently Asked Questions', subheading: 'Everything you need to know about crowdfunding on FundDoo. Together we save lives.', tag: 'Got Questions?' })
  const [openIndex, setOpenIndex] = useState(0)
  const ref = useScrollReveal()

  useEffect(() => {
    endpoints.faqs()
      .then((res) => { if (res.data?.length) setFaqs(res.data) })
      .catch(() => {})
    endpoints.section('home', 'faq')
      .then((res) => { if (res.data) setSection(res.data) })
      .catch(() => {})
  }, [])

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 bg-gray-50" ref={ref} itemScope itemType="https://schema.org/FAQPage">
      <div className="max-w-3xl mx-auto px-6">
        <header className="text-center mb-12 reveal">
          <span className="section-tag" aria-hidden="true">{section.tag}</span>
          <h2 id="faq-heading" className="section-title">{section.heading}</h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">{section.subheading}</p>
        </header>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq.id || i} className="reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
              <AccordionItem faq={faq} index={i} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
