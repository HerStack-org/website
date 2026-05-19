import './styles/globals.css'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Pillars from './components/Pillars'
import LearningPath from './components/LearningPath'
import Storyboards from './components/Storyboards'
import Mentors from './components/Mentors'
import SummerOfAI from './components/SummerOfAI'
import Contribute from './components/Contribute'
import Footer from './components/Footer'
import BackToTopButton from './components/Backtotop'
import OurMission from './components/OurMission'

export default function App() {
  return (
    <>
      <Nav />
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
                  </>
              } />
              <Route path="/our-mission" element={<OurMission />} />
          </Routes>
      </main>
      <Footer />
      <BackToTopButton/>
    </>
  )
}