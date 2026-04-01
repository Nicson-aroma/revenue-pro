
import { useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [showNotification, setShowNotification] = useState(false);


  const location = useLocation();

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-600">📧</span>
              <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                MailRevenuePro
              </span>
            </Link>
          </motion.div>

          {/* Desktop menu */}
          <div className={`hidden md:flex gap-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {[
              { name: 'Home', path: '/', icon: '🏠' },
              { name: 'Portfolio', path: '/portfolio', icon: '📁' },
              { name: 'Services', path: '/services', icon: '📧' },
              { name: 'Compare', path: '/comparison', icon: '⚖️' },
              { name: 'Calculator', path: '/calculator', icon: '💰' },
              { name: 'Features', path: '/features', icon: '✨' },
              { name: 'Contact', path: '/contact', icon: '📞' }
            ].map((item, idx) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Link
                  to={item.path}
                  className={`hover:text-blue-600 transition font-medium flex items-center gap-1 ${location.pathname === item.path ? 'text-blue-600 font-bold' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="hidden lg:inline ">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right side buttons (Auth + Dark Mode) */}
          <div className="hidden sm:flex gap-3 items-center">
            <button
              onClick={toggleDarkMode}
              className={`px-3 py-2 rounded-lg border ${isDarkMode ? 'border-gray-300 text-white bg-gray-700' : 'border-gray-300 text-gray-700 bg-white'} hover:opacity-90 transition`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            {isSignedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
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
                { name: 'Home', path: '/' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Services', path: '/services' },
                { name: 'Compare', path: '/comparison' },
                { name: 'Calculator', path: '/calculator' },
                { name: 'Features', path: '/features' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left py-2 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  {item.name}
                </Link>
              ))}              <button
                onClick={() => {
                  toggleDarkMode();
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left py-2 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
              >
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
              {isSignedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full text-left py-2 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left py-2 ${isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-600 hover:text-red-600'}`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full text-left py-2 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full text-left py-2 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    Sign Up
                  </Link>
                </>
              )}
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
