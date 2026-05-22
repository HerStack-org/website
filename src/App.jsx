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
import FAQ from './components/FAQ'
import Concepts from './pages/Concepts'
import BackToTopButton from './components/Backtotop'
import OurMission from './components/OurMission'
import MentorList from './components/MentorList';

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
              <Route path="/mentorlist" element={<MentorList />} />
          </Routes>
      </main>
      <Footer />
      <BackToTopButton/>
    </>
  )
}