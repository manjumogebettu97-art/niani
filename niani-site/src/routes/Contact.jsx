import { useCallback, useState } from 'react'
import PageShell from '../components/layout/PageShell'
import QuoteModal from '../components/form/QuoteModal'

function Contact() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const closeQuote = useCallback(() => setQuoteOpen(false), [])
  return (
    <PageShell eyebrow="Contact Niani" title="Tell us about your space." intro="Start with a few essentials, or speak to the studio directly on WhatsApp." showCta={false}>
      <figure className="route-contact-visual">
        <img src={`${import.meta.env.BASE_URL}services/residential-interiors/detail-03.webp`} alt="Warm cream foyer with a walnut console and brass light" width="1200" height="900" data-ai-placeholder />
      </figure>
      <section className="route-section route-contact-grid">
        <button type="button" onClick={() => setQuoteOpen(true)}><span>Project enquiry</span><strong>Open quote form ↗</strong></button>
        <a href="https://wa.me/917760180604" target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>+91 77601 80604 ↗</strong></a>
        <a href="tel:+917760180604"><span>Call the studio</span><strong>+91 77601 80604 ↗</strong></a>
      </section>
      {quoteOpen && <QuoteModal onClose={closeQuote} />}
    </PageShell>
  )
}

export default Contact
