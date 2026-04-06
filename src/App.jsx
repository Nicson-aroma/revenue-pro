
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { DarkModeProvider, useDarkMode } from './context/DarkModeContext';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import ServicesPage from './pages/Services';
import PricingPage from './pages/Pricing';
import PortfolioPage from './pages/Portfolio';
import CaseStudyPage from './pages/CaseStudy';
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
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/comparison" element={<Navigate to="/pricing" replace />} />
            <Route path="/calculator" element={<Navigate to="/pricing" replace />} />
            <Route path="/features" element={<Navigate to="/services" replace />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:slug" element={<CaseStudyPage />} />
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
