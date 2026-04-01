
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { isDarkMode } = useDarkMode();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="home"
      className={`pt-24 pb-20 px-4 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h1
              variants={itemVariants}
              className={`text-5xl md:text-6xl font-bold leading-tight mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Grow Your Business with{' '}
              <span className="text-blue-600">Email Marketing Excellence</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={`text-xl mb-8 leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Professional email marketing services designed to boost your revenue. From campaign
              creation to automation, we've got your email marketing covered.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
                >
                  Start Your Campaign
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg transition text-lg font-semibold ${
                    isDarkMode
                      ? 'hover:bg-gray-800 hover:border-blue-500'
                      : 'hover:bg-blue-50'
                  }`}
                >
                  View Services
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-8 text-sm"
            >
              {[
                { icon: '✅', stat: '500+', label: 'Happy Clients' },
                { icon: '📈', stat: '45%', label: 'Avg ROI' },
                { icon: '⚡', stat: '24H', label: 'Setup' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    <strong>{item.stat}</strong> {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl p-8 text-white shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '📧', label: 'Email Campaigns' },
                  { icon: '🤖', label: 'Automation' },
                  { icon: '🔐', label: 'Authentication' },
                  { icon: '📊', label: 'Analytics' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/20 rounded-lg p-4 text-center cursor-pointer backdrop-blur"
                  >
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <p className="font-semibold text-sm">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
