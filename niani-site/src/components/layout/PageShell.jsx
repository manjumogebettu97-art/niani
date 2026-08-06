import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import QuoteModal from '../form/QuoteModal'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'

function PageShell({ eyebrow, title, intro, children, showCta = true }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const openQuoteModal = useCallback(() => {
    setMenuOpen(false)
    setQuoteOpen(true)
  }, [])
  const closeQuoteModal = useCallback(() => setQuoteOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="niani-shell route-shell">
      <SiteNav
        scrolled={scrolled}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onCloseMenu={() => setMenuOpen(false)}
        onOpenQuote={openQuoteModal}
      />

      <main className="route-main">
        <header className="route-hero">
          <p>{eyebrow}</p>
          <h1>{title}</h1>
          {intro && <div className="route-hero__intro">{intro}</div>}
        </header>

        {children}

        {showCta && (
          <section className="route-cta" aria-label="Start a project">
            <p>Planning a space of your own?</p>
            <h2>Let’s make it distinctly yours.</h2>
            <div>
              <button type="button" onClick={openQuoteModal}>Get a quote</button>
              <Link to="/work">View our work</Link>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
      {quoteOpen && <QuoteModal onClose={closeQuoteModal} />}
    </div>
  )
}

export default PageShell
