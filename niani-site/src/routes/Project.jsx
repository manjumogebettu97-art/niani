import { Link, useParams } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'

const projects = {
  'concept-apartment-bengaluru': {
    title: 'Apartment Living Study',
    altRoot: 'Cream, walnut and burgundy Bengaluru apartment design study',
    hasGallery: true,
  },
  'concept-kitchen-study': {
    title: 'Warm Modular Kitchen Study',
    altRoot: 'Fluted cream and walnut modular kitchen design study',
    hasGallery: true,
  },
  'concept-villa-interior': {
    title: 'Double-Height Villa Study',
    altRoot: 'Double-height villa interior design study',
    hasGallery: false,
    cover: 'card.webp',
  },
}

function Project() {
  const { slug } = useParams()
  const project = projects[slug]
  const title = project?.title || slug.split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' ')
  const gallery = project?.hasGallery
    ? Array.from({ length: 10 }, (_, index) => {
      const number = String(index + 1).padStart(2, '0')
      const portrait = [2, 4, 6, 8].includes(index + 1)
      return {
        src: `${import.meta.env.BASE_URL}projects/${slug}/gallery-${number}.webp`,
        alt: `${project.altRoot}, view ${index + 1}`,
        width: portrait ? 1600 : 2400,
        height: portrait ? 2000 : 1600,
        portrait,
      }
    })
    : []

  return (
    <PageShell
      eyebrow="Design study"
      title={title}
      intro="Concept work developed to communicate Niani’s spatial, material and detailing direction. It is not presented as a completed client commission."
    >
      {project && (
        <section className="route-project-story" aria-label={`${title} gallery`}>
          <figure className="route-project-hero">
            <img
              src={`${import.meta.env.BASE_URL}projects/${slug}/${project.cover || 'hero.webp'}`}
              alt={`${project.altRoot}, main living space`}
              width={project.cover ? 1600 : 2400}
              height={project.cover ? 1200 : 1350}
              data-ai-placeholder
            />
          </figure>

          {project.hasGallery && <div className="route-project-gallery">
            {gallery.map((image, index) => (
              <figure className={image.portrait ? 'route-project-gallery__portrait' : ''} key={image.src}>
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  data-ai-placeholder
                />
                <figcaption>Study view {String(index + 1).padStart(2, '0')}</figcaption>
              </figure>
            ))}
          </div>}
        </section>
      )}
      <section className="route-section route-detail-grid">
        <div>
          <span>01 · The brief</span>
          <h2>Designed around everyday life.</h2>
        </div>
        <p>{project?.hasGallery ? 'A calm material language connects the rooms while each space is shaped for its own rhythm, storage and light.' : 'This study currently uses its selected cover direction. Additional verified imagery can be added later without changing the page structure.'}</p>
      </section>
      <nav className="route-back"><Link to="/work">← Back to all work</Link></nav>
    </PageShell>
  )
}

export default Project
