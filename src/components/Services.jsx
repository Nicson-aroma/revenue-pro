import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';
import { services } from '../data/services';
import ServiceModal from './ServiceModal';
import ServiceFilter from './ServiceFilter';

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [displayedServices, setDisplayedServices] = useState(services);
  const { isDarkMode } = useDarkMode();

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
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="services" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Our Services
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Comprehensive email marketing solutions tailored to your business needs.
          </p>
        </motion.div>

        {/* Filter Component */}
        <ServiceFilter services={services} onFilter={setDisplayedServices} />

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayedServices.map((service, idx) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
              onClick={() => setSelectedService(service)}
              className={`rounded-xl p-8 cursor-pointer transition ${
                isDarkMode
                  ? 'bg-gray-800 border-2 border-gray-700 hover:border-blue-600'
                  : 'bg-white border-2 border-gray-200 hover:border-blue-600'
              }`}
            >
              <div className="text-5xl mb-4">{service.image}</div>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex items-center gap-2 mb-3"
              >
                <span className="text-yellow-400">⭐ {service.rating}</span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  ({service.reviews} reviews)
                </span>
              </motion.div>

              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {service.name}
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 h-12`}>
                {service.shortDesc}
              </p>

              <div className="mb-6">
                <span className="text-3xl font-bold text-blue-600">${service.price}</span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>/month</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {displayedServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <p className="text-xl">No services match your filters. Try adjusting your search.</p>
          </motion.div>
        )}
      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}
