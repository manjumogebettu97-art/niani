import { Link, NavLink, useNavigate } from 'react-router-dom'

const desktopLinks = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Process' },
  { to: '/about', label: 'About' },
  { to: '/films', label: 'Films' },
]

const mobileLinks = [
  ...desktopLinks,
  { to: '/contact', label: 'Contact' },
]

function SiteNav({ scrolled = false, menuOpen, onToggleMenu, onCloseMenu, onOpenQuote }) {
  const navigate = useNavigate()

  const handleSearch = (event) => {
    event.preventDefault()
    const query = new FormData(event.currentTarget).get('site-search')?.toString().trim()
    navigate(query ? `/work?search=${encodeURIComponent(query)}` : '/work')
    onCloseMenu?.()
  }

  return (
    <>
      <header className={`main-nav${scrolled ? ' main-nav--scrolled' : ''}`}>
        <div className="nav-left">
          <Link className="nav-brand" to="/" aria-label="Niani Designs home">
            <img src={`${import.meta.env.BASE_URL}niani-logo.jpeg`} alt="" />
          </Link>
          {desktopLinks.map((link) => (
            <NavLink className="nav-link" to={link.to} key={link.to}>{link.label}</NavLink>
          ))}
        </div>

        <form className="nav-search-wrap" role="search" onSubmit={handleSearch}>
          <svg className="nav-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8.5" cy="8.5" r="5.5" />
            <line x1="13" y1="13" x2="17" y2="17" />
          </svg>
          <input
            className="nav-search"
            name="site-search"
            type="search"
            placeholder="Search Niani inspirations..."
            aria-label="Search Niani inspirations"
          />
          <span className="nav-search-dots" aria-hidden="true">
            <span /><span /><span /><span />
          </span>
        </form>

        <div className="nav-right">
          <button className="nav-cta" type="button" onClick={onOpenQuote}>Get Quote</button>
        </div>

        <button
          className={`nav-burger${menuOpen ? ' nav-burger--open' : ''}`}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={onToggleMenu}
        >
          <span />
          <span />
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          {mobileLinks.map((link) => (
            <NavLink to={link.to} key={link.to} onClick={onCloseMenu}>{link.label}</NavLink>
          ))}
          <button className="mobile-menu__cta" type="button" onClick={onOpenQuote}>Get Quote</button>
          <div className="mobile-menu__contact" aria-label="Contact Niani Designs">
            <a href="tel:+917760180604">Call</a>
            <a href="https://wa.me/917760180604" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      )}
    </>
  )
}

export default SiteNav
