import { Link } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'

function ThankYou() {
  return <PageShell eyebrow="Thank you" title="Your enquiry is with us." intro="Continue the conversation on WhatsApp, or return to the portfolio while we learn more about your project." showCta={false}><nav className="route-back"><Link to="/work">View our work →</Link></nav></PageShell>
}

export default ThankYou
