import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import logoImage from '../assets/new-logo.png';

const navItems = [
  { name: 'Home', path: '/', icon: 'H' },
  { name: 'Case Studies', path: '/portfolio', icon: 'C' },
  { name: 'Services', path: '/services', icon: 'S' },
  { name: 'Pricing', path: '/pricing', icon: 'P' },
  { name: 'Contact', path: '/contact', icon: 'C' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-50 w-full backdrop-blur shadow-sm ${
        isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <div className="flex h-16 items-center justify-between">
          <motion.div whileHover={{ scale: 1.04 }} className="flex items-center gap-2">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <img src={logoImage} alt="MailRevenuePro" className="h-11 w-auto" />
            </Link>
          </motion.div>

          <div className={`hidden gap-8 md:flex ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {navItems.map((item, idx) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ scale: 1.06 }}
              >
                <Link
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center gap-2 font-medium transition hover:text-purple-500 ${
                    location.pathname === item.path ? 'font-bold text-purple-500' : ''
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[10px]">
                    {item.icon}
                  </span>
                  <span className="hidden lg:inline">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              to="/contact"
              onClick={closeMenu}
              className="rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition hover:bg-purple-700"
            >
              Get a Free Audit
            </Link>
            <button
              onClick={toggleDarkMode}
              className={`rounded-lg border px-3 py-2 transition hover:opacity-90 ${
                isDarkMode
                  ? 'border-gray-300 bg-gray-700 text-white'
                  : 'border-gray-300 bg-white text-gray-700'
              }`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? 'Moon' : 'Sun'}
            </button>
          </div>

          <button
            className={`text-2xl md:hidden ${isDarkMode ? 'text-white' : 'text-gray-600'}`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            =
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`border-t pb-4 md:hidden ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`block w-full py-2 text-left ${
                    isDarkMode ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={closeMenu}
                className={`block w-full py-2 text-left font-semibold ${
                  isDarkMode ? 'text-white hover:text-purple-300' : 'text-purple-700 hover:text-purple-600'
                }`}
              >
                Get a Free Audit
              </Link>
              <button
                onClick={() => {
                  toggleDarkMode();
                  closeMenu();
                }}
                className={`block w-full py-2 text-left ${
                  isDarkMode ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
