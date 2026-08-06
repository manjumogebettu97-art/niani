import { Link, useParams } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'

const articleImages = {
  'materials-that-age-beautifully': ['atmosphere/think-material-palette.webp', 'Walnut, brass, linen and stone material samples', 1000, 1250],
  'planning-a-modular-kitchen': ['projects/concept-kitchen-study/gallery-01.webp', 'Fluted cream island in a warm modular kitchen study', 2400, 1600],
  'before-your-interior-project': ['services/turnkey-execution/detail-01.webp', 'Interior drawings and material samples prepared for execution', 1200, 900],
}

function Article() {
  const { slug } = useParams()
  const title = slug.split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' ')
  const image = articleImages[slug] || articleImages['before-your-interior-project']
  return (
    <PageShell eyebrow="Niani journal" title={title} intro="Practical notes from the studio on making calm, useful and enduring interiors.">
      <figure className="route-article-hero"><img src={`${import.meta.env.BASE_URL}${image[0]}`} alt={image[1]} width={image[2]} height={image[3]} data-ai-placeholder /></figure>
      <article className="route-section route-article"><p>Good interiors are built through a sequence of clear decisions: understanding the room, selecting a restrained palette and resolving the details before execution begins.</p></article>
      <nav className="route-back"><Link to="/journal">← Back to journal</Link></nav>
    </PageShell>
  )
}

export default Article
