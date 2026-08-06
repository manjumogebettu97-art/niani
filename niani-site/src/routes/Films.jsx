import PageShell from '../components/layout/PageShell'
import FilmGallery from '../FilmGallery'

function Films() {
  return (
    <PageShell eyebrow="Explore films" title="Behind the spaces." intro="Materials, site moments and finished details from the Niani design journey.">
      <div className="route-films"><FilmGallery embedded /></div>
    </PageShell>
  )
}

export default Films
