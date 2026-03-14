# FundDoo - React + Vite PWA Clone

A fully static, production-grade crowdfunding homepage built with **React**, **Vite**, **Tailwind CSS v3**, and **PayPal sandbox** integration. Configured as a **Progressive Web App** (PWA) with offline caching.

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server (hot reload)
npm run dev
# → http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 📁 Project Structure

```
fundfoo/
├── public/
│   ├── favicon.svg           # Brand favicon
│   ├── pwa-192.png           # PWA icon 192×192
│   └── pwa-512.png           # PWA icon 512×512 (maskable)
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky nav with mobile hamburger
│   │   ├── Hero.jsx          # Full-screen hero with floating cards
│   │   ├── CampaignCard.jsx  # Individual campaign card + Donate btn
│   │   ├── CampaignList.jsx  # Filterable grid of campaigns
│   │   ├── HowItWorks.jsx    # 4-step process section
│   │   ├── Categories.jsx    # Browse-by-cause grid
│   │   ├── Testimonials.jsx  # Community stories
│   │   ├── CTASection.jsx    # Start-a-campaign banner
│   │   ├── Footer.jsx        # Site footer
│   │   └── DonateModal.jsx   # PayPal donation modal
│   │
│   ├── data/
│   │   └── campaigns.js      # All hardcoded content
│   │
│   ├── hooks/
│   │   └── useScrollReveal.js # IntersectionObserver hook
│   │
│   ├── App.jsx               # Root component
│   ├── main.jsx              # React entry point
│   └── index.css             # Tailwind base + custom utilities
│
├── index.html                # HTML shell with async font loading
├── vite.config.js            # Vite + VitePWA config
├── tailwind.config.js        # Custom theme (colors, fonts, animations)
├── postcss.config.js         # PostCSS (auto-generated)
└── package.json
```

---

## 🎨 Design Highlights

| Feature | Implementation |
|---|---|
| Typography | Roboto (display) + DM Sans (body) |
| Color palette | Brand orange `#FF5722`, teal `#00897B`, dark navy `#1A1A2E` |
| Animations | CSS keyframes via Tailwind (`floatUp`, `fadeUp`, `slideIn`) |
| Scroll reveal | Single `IntersectionObserver` per section, fires once |
| Hover effects | `translateY` + shadow (compositor-only, no repaints) |
| Responsive | Mobile-first, `sm/lg/xl` breakpoints throughout |

---

## 💳 PayPal Integration

Uses the **official `@paypal/react-paypal-js`** SDK in **sandbox mode**.

When a user clicks **Donate** on any campaign card:
1. A modal opens with preset amounts (₹100 - ₹10,000) or a custom amount.
2. The `PayPalScriptProvider` loads the sandbox SDK lazily.
3. `PayPalButtons` creates an order converting INR → USD (÷83).
4. On approval, a success toast is shown. No backend required.

**To use your own sandbox account:**
- Go to https://developer.paypal.com → Sandbox Accounts
- Replace `client-id: 'sb'` in `DonateModal.jsx` with your sandbox Client ID.

---

## 📱 PWA Setup

Configured via `vite-plugin-pwa`:

- **Manifest** → `dist/manifest.webmanifest` (name, icons, theme color, display: standalone)
- **Service Worker** → `dist/sw.js` (Workbox `generateSW` mode)
- **Precaching** → All JS/CSS/HTML/fonts
- **Runtime caching** → Google Fonts (CacheFirst, 1 year)
- **Install prompt** → Browser shows "Add to Home Screen" automatically on mobile

To test PWA locally:
```bash
npm run build && npm run preview
# Open http://localhost:4173 in Chrome → DevTools → Application → Manifest
```

---

## 🧩 Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 (functional components) |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v3 |
| PWA | vite-plugin-pwa + Workbox |
| Payments | @paypal/react-paypal-js (sandbox) |
| Fonts | Google Fonts (async, non-blocking) |
| Icons | Emoji + SVG (no external icon library) |
| Images | CSS gradients (no HTTP image requests) |

---

## ⚡ Performance Notes

- No external images — campaign thumbnails are **CSS gradient + emoji** (zero network requests)
- Fonts loaded via `<link rel="preload">` — never block rendering
- `useScrollReveal` uses a single `IntersectionObserver`, unobserves after first trigger
- Tailwind purges unused CSS at build time (~5 KB gzipped)
- PayPal SDK only mounts when modal opens (lazy)
