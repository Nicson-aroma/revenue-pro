import { useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showNotification, setShowNotification] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleLiveChat = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur shadow-sm z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <span className="text-2xl font-bold text-blue-600">📧</span>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              MailRevenuePro
            </span>
          </motion.div>

          {/* Desktop menu */}
          <div className={`hidden md:flex gap-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {[
              { name: 'Home', id: 'home', icon: '🏠' },
              { name: 'Services', id: 'services', icon: '📧' },
              { name: 'Compare', id: 'comparison', icon: '⚖️' },
              { name: 'Calculator', id: 'calculator', icon: '💰' },
              { name: 'Features', id: 'features', icon: '✨' },
              { name: 'Contact', id: 'contact', icon: '📞' }
            ].map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className={`hover:text-blue-600 transition font-medium flex items-center gap-1`}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden lg:inline">{item.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden sm:flex gap-3 items-center">
            {/* Live Chat */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLiveChat}
              className="relative p-2 hover:text-blue-600 transition"
              title="Live Chat"
            >
              <span className="text-2xl">💬</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
              ></motion.span>
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.button>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden text-2xl ${isDarkMode ? 'text-white' : 'text-gray-600'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`md:hidden pb-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              {[
                { name: 'Home', id: 'home' },
                { name: 'Services', id: 'services' },
                { name: 'Compare', id: 'comparison' },
                { name: 'Calculator', id: 'calculator' },
                { name: 'Features', id: 'features' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  {item.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
            >
              💬 A chat agent will be with you shortly!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
