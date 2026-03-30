import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Services from './components/Services'
import ServiceComparison from './components/ServiceComparison'
import PricingCalculator from './components/PricingCalculator'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { DarkModeProvider, useDarkMode } from './context/DarkModeContext'
import { services } from './data/services'
import './App.css'

function AppContent() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Navigation />
      <Hero />
      <Services />
      <ServiceComparison services={services} />
      <PricingCalculator services={services} />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  )
}

export default App
