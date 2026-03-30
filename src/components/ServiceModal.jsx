import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';

export default function ServiceModal({ service, onClose }) {
  const { isDarkMode } = useDarkMode();

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById('contact');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white relative"
          >
            <motion.button
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 text-2xl font-bold hover:opacity-80 transition"
            >
              ✕
            </motion.button>
            <div className="flex items-center gap-4 mb-4">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl"
              >
                {service.image}
              </motion.span>
              <div>
                <h2 className="text-3xl font-bold">{service.title}</h2>
                <p className="text-blue-100">{service.shortDesc}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xl">⭐ {service.rating}</span>
                  <span className="text-sm text-blue-100">({service.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="p-8">
            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {service.description}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Key Features
              </h3>
              <motion.div
                className="grid md:grid-cols-2 gap-3"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ delay: 0.3 + idx * 0.05, duration: 0.6 }}
                      className="text-green-500 text-xl flex-shrink-0 mt-1"
                    >
                      ✓
                    </motion.span>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Pricing Plans */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Pricing Plans
              </h3>
              <div className="space-y-3">
                {service.pricing.map((plan, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    whileHover={{ x: 5 }}
                    className={`flex justify-between items-center p-4 rounded-lg transition ${
                      isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div>
                      <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {plan.tier}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {plan.contacts || plan.workflows || plan.domains || plan.campaigns}
                      </p>
                    </div>
                    <motion.p
                      animate={{ color: ['#3b82f6', '#8b5cf6', '#3b82f6'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xl font-bold text-blue-600"
                    >
                      {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
              >
                Get Started Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-lg transition font-semibold text-lg ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'
                }`}
              >
                View Other Services
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
