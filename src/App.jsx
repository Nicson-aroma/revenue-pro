
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { DarkModeProvider, useDarkMode } from './context/DarkModeContext';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ServicesPage from './pages/Services';
import Comparison from './pages/Comparison';
import Calculator from './pages/Calculator';
import FeaturesPage from './pages/Features';
import PortfolioPage from './pages/Portfolio';
import ContactPage from './pages/Contact';
import AuthPage from './pages/Auth';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { ClerkProvider } from '@clerk/react';


function AppContent() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Router>
        <Navigation />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

function App() {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <DarkModeProvider>
        <AppContent />
      </DarkModeProvider>
    </ClerkProvider>
  );
}

export default App
