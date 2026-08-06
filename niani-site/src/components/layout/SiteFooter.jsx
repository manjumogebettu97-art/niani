import { Link } from 'react-router-dom'

function SiteFooter() {
  return (
    <section className="signup-stage" id="signup" data-reveal-group>
      <div className="footer-links" data-reveal>
        <a className="link-hover" href="https://www.instagram.com/niani_designs/" target="_blank" rel="noreferrer">Instagram</a>
        <Link className="link-hover" to="/work">Portfolio</Link>
        <Link className="link-hover" to="/films">Films</Link>
        <Link className="link-hover" to="/journal">Journal</Link>
      </div>
      <div className="wordmark" aria-hidden="true">NIANI</div>
      <footer className="site-legal">
        <span>© 2026 Niani Designs. All rights reserved.</span>
        <div className="site-legal__links" aria-label="Legal information">
          <a href="tel:+917760180604">+91 77601 80604</a>
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms &amp; conditions</Link>
          <Link to="/cookies">Cookie policy</Link>
        </div>
      </footer>
    </section>
  )
}

export default SiteFooter
