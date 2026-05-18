import './styles/globals.css'
import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Pillars from './components/Pillars'
import LearningPath from './components/LearningPath'
import Storyboards from './components/Storyboards'
import Mentors from './components/Mentors'
import SummerOfAI from './components/SummerOfAI'
import Contribute from './components/Contribute'
import Concepts from './pages/Concepts'

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
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Marquee />
                <Pillars />
                <LearningPath />
                <Storyboards />
                <Mentors />
                <SummerOfAI />
                <Contribute />
              </>
            }
          />
          <Route path="/concepts" element={<Concepts />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
