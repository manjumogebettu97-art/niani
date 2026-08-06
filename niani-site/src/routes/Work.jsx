import { Link, useSearchParams } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'

const projectDirections = [
  {
    slug: 'concept-apartment-bengaluru',
    title: 'Apartment Living Study',
    type: 'Design study · Residential interiors',
    image: `${import.meta.env.BASE_URL}projects/concept-apartment-bengaluru/card.webp`,
    alt: 'Concept living room with cream seating and long walnut media joinery',
  },
  {
    slug: 'concept-kitchen-study',
    title: 'Warm Modular Kitchen Study',
    type: 'Design study · Modular kitchen',
    image: `${import.meta.env.BASE_URL}projects/concept-kitchen-study/card.webp`,
    alt: 'Concept modular kitchen with cream cabinetry and walnut tall units',
  },
  {
    slug: 'concept-villa-interior',
    title: 'Double-Height Villa Study',
    type: 'Design study · Villa interior',
    image: `${import.meta.env.BASE_URL}projects/concept-villa-interior/card.webp`,
    alt: 'Concept double-height villa living room with a stone feature wall',
  },
]

function Work() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('search')?.trim().toLowerCase() || ''
  const visibleProjects = projectDirections.filter((project) => (
    !query || `${project.title} ${project.type}`.toLowerCase().includes(query)
  ))

  return (
    <PageShell
      eyebrow="Selected work"
      title="Spaces with a point of view."
      intro="A growing collection of considered homes, rooms and places shaped around the people who use them."
    >
      <section className="route-section route-project-grid" aria-label="Projects">
        {visibleProjects.length ? visibleProjects.map((project, index) => (
          <Link className="route-project-card" to={`/work/${project.slug}`} key={project.slug}>
            <div><img src={project.image} alt={project.alt} width="1600" height="1200" loading="lazy" data-ai-placeholder /></div>
            <span>Study {String(index + 1).padStart(2, '0')} · {project.type}</span>
            <h2>{project.title}</h2>
          </Link>
        )) : (
          <p className="route-empty">No matching work yet. Try another search.</p>
        )}
      </section>
    </PageShell>
  )
}

export default Work
