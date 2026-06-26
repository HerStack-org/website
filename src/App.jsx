import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import BackToTopButton from './components/Backtotop'
import ConceptPage from './components/ConceptPage'
import Contribute from './components/Contribute'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Hero from './components/Hero'
import LearningPath from './components/LearningPath'
import Marquee from './components/Marquee'
import Mentors from './components/Mentors'
import Nav from './components/Nav'
import OurMission from './components/OurMission'
import Pillars from './components/Pillars'
import Storyboards from './components/Storyboards'
import SummerOfAI from './components/SummerOfAI'
import Concepts from './pages/Concepts'
import './styles/globals.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}


export default function App() {
  return (
    <>
      <Nav />
      <ScrollToTop />
      <main>
          <Routes>
              <Route path="/" element={
                  <>
                    <Hero />
                    <Marquee />
                    <Pillars />
                    <LearningPath />
                    <Storyboards />
                    <Mentors />
                    <SummerOfAI />
                    <Contribute />
                    <FAQ />
                  </>
              } />
              <Route path="/our-mission" element={<OurMission />} />
              <Route path="/concepts" element={<Concepts />} />
              <Route
  path="/concepts/:slug"
  element={<ConceptPage />}
/>
          </Routes>
      </main>
      <Footer />
      <BackToTopButton/>
    </>
  )
}