import { useState, useEffect, useRef } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

const AMOUNTS = [100, 500, 1000, 2000, 5000, 10000]

function formatINR(n) {
  if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + ' L'
  if (n >= 1000)   return '₹' + n.toLocaleString('en-IN')
  return '₹' + n
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] max-w-sm w-full bg-white rounded-2xl shadow-2xl p-5 animate-slide-in border-l-4 ${
        type === 'success' ? 'border-brand-teal' : 'border-red-500'
      }`}
    >
      <div className="font-semibold text-brand-dark mb-1">{type === 'success' ? '🎉 Thank you!' : '⚠️ Payment issue'}</div>
      <p className="text-sm text-gray-500 leading-snug">{message}</p>
    </div>
  )
}

export default function DonateModal({ campaign, onClose }) {
  const [selected, setSelected] = useState(1000)
  const [custom, setCustom]     = useState('')
  const [toast, setToast]       = useState(null)
  const overlayRef = useRef(null)

  const amount = custom && Number(custom) >= 10 ? Number(custom) : selected
  const usd    = (amount / 83).toFixed(2)

  // ESC to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleBackdrop = (e) => { if (e.target === overlayRef.current) onClose() }

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleBackdrop}
        className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
        style={{ backdropFilter: 'blur(4px)' }}
      >
        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-slide-in overflow-hidden">
          {/* Header */}
          <div className="bg-hero-gradient p-6 pb-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-orange-300 text-xs font-semibold uppercase tracking-widest mb-1">Donate to campaign</p>
                <h3 className="font-display text-xl font-bold text-white leading-snug">{campaign.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-lg flex-shrink-0 ml-4"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Amount grid */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Select Amount</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  onClick={() => { setSelected(a); setCustom('') }}
                  className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-150 ${
                    selected === a && !custom
                      ? 'border-brand-orange bg-orange-50 text-brand-orange'
                      : 'border-gray-200 text-gray-700 hover:border-brand-orange hover:text-brand-orange'
                  }`}
                >
                  {formatINR(a)}
                </button>
              ))}
            </div>

            {/* Custom */}
            <div className="mb-4">
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Or enter custom amount (₹)</label>
              <input
                type="number"
                min="10"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-orange transition-colors"
              />
            </div>

            {/* Selected display */}
            <div className="bg-brand-cream rounded-xl p-3 text-center mb-5 border border-orange-100">
              <span className="text-sm text-gray-600">Donating: </span>
              <span className="text-lg font-bold text-brand-orange">{formatINR(amount)}</span>
              <span className="text-xs text-gray-400 ml-2">(≈ ${usd} USD)</span>
            </div>

            {/* PayPal */}
            <PayPalScriptProvider
              options={{ 'client-id': 'sb', currency: 'USD', intent: 'capture' }}
              deferLoading={false}
            >
              <PayPalButtons
                style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'donate', tagline: false, height: 40 }}
                forceReRender={[amount]}
                createOrder={(_data, actions) =>
                  actions.order.create({
                    purchase_units: [
                      {
                        description: campaign.title,
                        amount: { currency_code: 'USD', value: usd },
                      },
                    ],
                    application_context: { brand_name: 'FundDoo - Together we save lives', user_action: 'PAY_NOW' },
                  })
                }
                onApprove={(_data, actions) =>
                  actions.order.capture().then(() => {
                    onClose()
                    setToast(`Your donation of ₹${amount.toLocaleString('en-IN')} was received. You're making a real difference!`)
                  })
                }
                onError={() => setToast(null)}
              />
            </PayPalScriptProvider>

            <p className="text-center text-xs text-gray-400 mt-3">
              🔒 Sandbox mode — no real charges. Secured by PayPal.
            </p>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast}
          type="success"
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
