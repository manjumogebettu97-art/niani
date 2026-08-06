import PageShell from '../components/layout/PageShell'

const materials = [
  ['texture-walnut.webp', 'Walnut'],
  ['texture-linen.webp', 'Linen'],
  ['texture-stone.webp', 'Stone'],
  ['texture-brass.webp', 'Brass'],
  ['texture-marble.webp', 'Marble'],
  ['texture-cane.webp', 'Cane'],
]

function About() {
  return (
    <PageShell eyebrow="The studio" title="Interiors with warmth, clarity and character." intro="Niani Designs approaches every space as a dialogue between the people who use it, the materials that shape it and the life it must support.">
      <section className="route-about-visual" aria-label="Niani design direction">
        <figure>
          <img src={`${import.meta.env.BASE_URL}projects/concept-apartment-bengaluru/hero.webp`} alt="Cream and walnut apartment living room design study" width="2400" height="1350" data-ai-placeholder />
        </figure>
      </section>
      <section className="route-section route-editorial-copy">
        <p>Our work begins with attention: to proportion, movement, light and the small rituals that turn an interior into a place of belonging.</p>
        <p>We favour natural materials, quiet contrast and useful details that continue to feel considered long after handover.</p>
      </section>
      <section className="route-materials" aria-label="Material palette">
        {materials.map(([file, label]) => (
          <figure key={file}>
            <img src={`${import.meta.env.BASE_URL}atmosphere/textures/${file}`} alt={`${label} material sample`} width="300" height="300" loading="lazy" data-ai-placeholder />
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </section>
    </PageShell>
  )
}

export default About
