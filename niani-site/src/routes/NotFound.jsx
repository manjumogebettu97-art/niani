import { Link } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'

function NotFound() {
  return <PageShell eyebrow="404" title="This space could not be found." intro="The page may have moved, or the address may be incomplete." showCta={false}><figure className="route-not-found-visual"><img src={`${import.meta.env.BASE_URL}projects/concept-villa-interior/card.webp`} alt="Double-height villa living room design study" width="1600" height="1200" data-ai-placeholder /></figure><nav className="route-back"><Link to="/">Return home →</Link></nav></PageShell>
}

export default NotFound
