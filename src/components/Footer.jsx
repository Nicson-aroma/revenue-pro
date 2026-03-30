import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';

export default function Footer() {
  const { isDarkMode } = useDarkMode();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer
      className={`py-16 px-4 ${
        isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-800 text-gray-300'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mb-12"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="text-3xl">📧</span>
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                MailRevenuePro
              </span>
            </motion.div>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-400'} mb-6`}>
              Professional email marketing services to grow your business revenue.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              {['📱', '💼', '🐦', '📘'].map((icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-300'} transition text-xl`}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-white'}`}>
              Services
            </h4>
            <ul className="space-y-2">
              {['Email Campaigns', 'Email Automation', 'Authentication', 'Template Design', 'Analytics'].map(
                (service, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <a
                      href="#services"
                      className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-300'} transition`}
                    >
                      {service}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-white'}`}>
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Features', id: 'features' },
                { label: 'Contact', id: 'contact' },
              ].map((link, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-300'} transition text-left`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              {['Privacy Policy', 'Terms of Service'].map((link, idx) => (
                <motion.li
                  key={idx + 3}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: (idx + 3) * 0.1 }}
                >
                  <a
                    href="#"
                    className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-300'} transition`}
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-white'}`}>
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-2"
              >
                <span>📧</span>
                <a href="mailto:info@mailrevenuepro.com" className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-300'} transition`}>
                  info@mailrevenuepro.com
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-2"
              >
                <span>📞</span>
                <a href="tel:+1234567890" className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-300'} transition`}>
                  +1 (234) 567-890
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-2"
              >
                <span>📍</span>
                <span>123 Business Street<br />New York, NY 10001</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-700'} mb-8 origin-left`}
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
            &copy; {currentYear} MailRevenuePro. All rights reserved.
          </p>
          <p className={`text-sm mt-4 md:mt-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
            Built with React & Tailwind CSS ❤️
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
