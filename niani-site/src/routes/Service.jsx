import { Link, useParams } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import services from '../content/services'

function Service() {
  const { slug } = useParams()
  const service = services.find((item) => item.slug === slug)
  const title = service?.title || 'Interior design service'

  return (
    <PageShell eyebrow="Niani service" title={title} intro={service?.summary}>
      {service && (
        <section className="route-service-visuals" aria-label={`${service.title} inspiration`}>
          <figure className="route-service-hero">
            <img
              src={`${import.meta.env.BASE_URL}services/${service.slug}/hero.webp`}
              alt={service.heroAlt}
              width="2000"
              height="1125"
              data-ai-placeholder
            />
          </figure>
          <div className="route-service-details">
            {service.detailAlts.map((alt, index) => (
              <figure key={alt}>
                <img
                  src={`${import.meta.env.BASE_URL}services/${service.slug}/detail-0${index + 1}.webp`}
                  alt={alt}
                  width="1200"
                  height="900"
                  loading="lazy"
                  data-ai-placeholder
                />
              </figure>
            ))}
          </div>
        </section>
      )}
      <section className="route-section route-detail-grid">
        <div><span>What’s included</span><h2>A clear, collaborative design process.</h2></div>
        <ul>
          <li>Briefing and spatial planning</li>
          <li>Material, colour and finish direction</li>
          <li>Design development and visualisation</li>
          <li>Execution guidance tailored to scope</li>
        </ul>
      </section>
      <nav className="route-back"><Link to="/services">← Back to all services</Link></nav>
    </PageShell>
  )
}

export default Service
