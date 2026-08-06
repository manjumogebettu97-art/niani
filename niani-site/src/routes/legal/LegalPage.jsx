import PageShell from '../../components/layout/PageShell'

const legalCopy = {
  privacy: ['Privacy policy', 'This page is ready for Niani Designs’ approved privacy notice, including enquiry data, analytics and contact rights.'],
  terms: ['Terms & conditions', 'This page is ready for the studio’s approved website and service terms.'],
  cookies: ['Cookie policy', 'This page is ready for the approved cookie notice before analytics or advertising tools are enabled.'],
}

function LegalPage({ type }) {
  const [title, copy] = legalCopy[type]
  return <PageShell eyebrow="Legal" title={title} intro={copy} showCta={false}><section className="route-section route-article"><p>Final legal language should be reviewed and supplied by the business before publication.</p></section></PageShell>
}

export default LegalPage
