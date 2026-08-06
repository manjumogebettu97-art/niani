import { Link } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import services from '../content/services'

function Services() {
  return (
    <PageShell
      eyebrow="What we do"
      title="From first thought to final detail."
      intro="Choose a complete interior journey or bring us into the part of the process where you need a trained eye."
    >
      <section className="route-section route-service-list">
        {services.map((service, index) => (
          <Link className="route-service-list__item" to={`/services/${service.slug}`} key={service.slug}>
            <figure className="route-service-list__media">
              <img
                src={`${import.meta.env.BASE_URL}services/${service.slug}/hero.webp`}
                alt={service.heroAlt}
                width="2000"
                height="1125"
                loading="lazy"
                data-ai-placeholder
              />
            </figure>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div><h2>{service.title}</h2><p>{service.summary}</p></div>
            <strong aria-hidden="true">↗</strong>
          </Link>
        ))}
      </section>
    </PageShell>
  )
}

export default Services
