import './styles/globals.css'
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

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Pillars />
        <LearningPath />
        <Storyboards />
        <Mentors />
        <SummerOfAI />
        <Contribute />
      </main>
      <Footer />
    </>
  )
}