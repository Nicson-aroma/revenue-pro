
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { DarkModeProvider, useDarkMode } from './context/DarkModeContext';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import ServicesPage from './pages/Services';
import PricingPage from './pages/Pricing';
import PortfolioPage from './pages/Portfolio';
import CaseStudyPage from './pages/CaseStudy';
import ContactPage from './pages/Contact';
import AdminShell from './components/admin/AdminShell';
import AdminOverviewPage from './pages/AdminOverview';
import AdminLeadsPage from './pages/AdminLeads';
import AdminBookedPage from './pages/AdminBooked';
import AdminSettingsPage from './pages/AdminSettings';
import AdminLoginPage from './pages/AdminLogin';
import NotFound from './pages/NotFound';
import { isAdminAuthenticated } from './lib/adminAuth';

function AdminRoute() {
  const location = useLocation();

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}


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
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminShell />}>
                <Route index element={<Navigate to="/admin/overview" replace />} />
                <Route path="overview" element={<AdminOverviewPage />} />
                <Route path="leads" element={<AdminLeadsPage />} />
                <Route path="booked" element={<AdminBookedPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>
            </Route>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default App
