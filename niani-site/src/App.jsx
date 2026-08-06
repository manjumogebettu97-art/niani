import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import About from './routes/About'
import Article from './routes/Article'
import Contact from './routes/Contact'
import Films from './routes/Films'
import Home from './routes/Home'
import Journal from './routes/Journal'
import NotFound from './routes/NotFound'
import Process from './routes/Process'
import Project from './routes/Project'
import Service from './routes/Service'
import Services from './routes/Services'
import ThankYou from './routes/ThankYou'
import Work from './routes/Work'
import LegalPage from './routes/legal/LegalPage'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<Project />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<Service />} />
        <Route path="/process" element={<Process />} />
        <Route path="/about" element={<About />} />
        <Route path="/films" element={<Films />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<Article />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/privacy" element={<LegalPage type="privacy" />} />
        <Route path="/terms" element={<LegalPage type="terms" />} />
        <Route path="/cookies" element={<LegalPage type="cookies" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
  return <BrowserRouter basename={basename}><AppRoutes /></BrowserRouter>
}

export default App
