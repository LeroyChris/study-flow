import { useState } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import StatsSection from './components/StatsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import FlashcardView from './views/FlashcardView'
import PomodoroView from './views/PomodoroView'
import CalendarView from './views/CalendarView'
import { Marquee } from './components/Marquee'

function App() {
  const [view, setView] = useState('landing')

  if (view === 'flashcard') return <FlashcardView onNavigate={setView} />
  if (view === 'pomodoro') return <PomodoroView onNavigate={setView} />
  if (view === 'calendar') return <CalendarView onNavigate={setView} />

  return (
    <>
      <Header onNavigate={setView} />
      <main>
        <HeroSection onNavigate={setView} />
        <Marquee />
        <FeaturesSection onNavigate={setView} />
        <StatsSection />
        <CTASection onNavigate={setView} />
      </main>
      <Footer />
    </>
  )
}

export default App
