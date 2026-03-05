import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import CampaignList from './components/CampaignList'
import HowItWorks   from './components/HowItWorks'
import Categories   from './components/Categories'
import Testimonials from './components/Testimonials'
import FAQ          from './components/FAQ'
import CTASection   from './components/CTASection'
import Footer       from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />

      {/*
        Semantic document outline:
        <header> (Navbar) - role=banner
        <main>
          <section> Hero         - #home
          <section> CampaignList - #campaigns  (h2: "Fundraising Campaigns…")
          <section> HowItWorks   - #how        (h2: "How to Start a Crowdfunding Campaign")
          <section> Categories   - #categories (h2: "Crowdfunding Categories")
          <section> Testimonials - #testimonials (h2: "What Our Donors Say")
          <section> FAQ          - #faq        (h2: "Frequently Asked Questions")
          <section> CTASection   - #start      (h2: "Start Your Free Campaign Today")
        </main>
        <footer> (Footer)       - role=contentinfo
      */}
      <main id="main-content" role="main" aria-label="ImpactGuru crowdfunding homepage">
        <Hero />
        <CampaignList />
        <HowItWorks />
        <Categories />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>

      <Footer />
    </>
  )
}
