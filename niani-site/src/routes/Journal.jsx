import { Link } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'

const entries = [
  ['materials-that-age-beautifully', 'Materials that age beautifully', 'atmosphere/think-material-palette.webp', 'Walnut, brass, linen and stone material samples'],
  ['planning-a-modular-kitchen', 'Planning a modular kitchen', 'projects/concept-kitchen-study/gallery-04.webp', 'Full-height walnut kitchen cabinetry and integrated appliances'],
  ['before-your-interior-project', 'Before your interior project begins', 'services/turnkey-execution/detail-01.webp', 'Organised drawings and finish samples for an interior project'],
]

function Journal() {
  return (
    <PageShell eyebrow="Niani journal" title="Notes on making better spaces." intro="Practical guidance and observations from the studio’s design process.">
      <section className="route-section route-journal-list">
        {entries.map(([slug, title, image, alt], index) => (
          <Link to={`/journal/${slug}`} key={slug}>
            <figure><img src={`${import.meta.env.BASE_URL}${image}`} alt={alt} width="1200" height="900" loading="lazy" data-ai-placeholder /></figure>
            <span>Note {String(index + 1).padStart(2, '0')}</span>
            <h2>{title}</h2>
            <strong>Read article ↗</strong>
          </Link>
        ))}
      </section>
    </PageShell>
  )
}

export default Journal
