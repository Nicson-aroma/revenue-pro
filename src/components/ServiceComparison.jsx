import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServiceComparison({ services }) {
  const [selectedServices, setSelectedServices] = useState([services[0].id, services[1].id]);

  const handleServiceToggle = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(id => id !== serviceId));
      }
    } else {
      if (selectedServices.length < 4) {
        setSelectedServices([...selectedServices, serviceId]);
      }
    }
  };

  const comparedServices = services.filter(s => selectedServices.includes(s.id));
  const allFeatures = new Set();
  comparedServices.forEach(s => s.features.forEach(f => allFeatures.add(f)));

  return (
    <motion.section
      id="comparison"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">⚖️ Compare Services</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select up to 4 services to compare features and pricing side-by-side
          </p>
        </div>

        {/* Service Selection */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 mb-12 border border-gray-700"
        >
          <p className="text-gray-300 font-semibold mb-4">Select Services to Compare</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {services.map((service, idx) => (
              <motion.button
                key={service.id}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleServiceToggle(service.id)}
                disabled={!selectedServices.includes(service.id) && selectedServices.length >= 4}
                className={`py-3 px-2 rounded-lg font-semibold transition ${
                  selectedServices.includes(service.id)
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } disabled:opacity-50 disabled:cursor-not-allowed text-sm`}
              >
                {service.image} {service.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        {comparedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="overflow-x-auto bg-gray-800/50 backdrop-blur rounded-2xl border border-gray-700"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-6 text-gray-300 font-semibold w-1/4">Feature</th>
                  <AnimatePresence>
                    {comparedServices.map((service, idx) => (
                      <motion.th
                        key={service.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center p-6 border-l border-gray-700"
                      >
                        <div className="text-2xl mb-2">{service.image}</div>
                        <p className="text-white font-bold">{service.name}</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-gray-300 text-sm">{service.rating}</span>
                          <span className="text-gray-400 text-xs">({service.reviews})</span>
                        </div>
                      </motion.th>
                    ))}
                  </AnimatePresence>
                </tr>
              </thead>
              <tbody>
                {/* Price Row */}
                <motion.tr
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="border-b border-gray-700 bg-gray-700/30"
                >
                  <td className="p-6 text-gray-300 font-semibold">Starting Price</td>
                  <AnimatePresence>
                    {comparedServices.map((service) => (
                      <motion.td
                        key={service.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center p-6 border-l border-gray-700"
                      >
                        <p className="text-white font-bold text-xl">
                          ${service.price}
                          <span className="text-sm text-gray-400">per order</span>
                        </p>
                      </motion.td>
                    ))}
                  </AnimatePresence>
                </motion.tr>

                {/* Features */}
                {Array.from(allFeatures).map((feature, idx) => (
                  <motion.tr
                    key={feature}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-gray-700"
                  >
                    <td className="p-6 text-gray-300">{feature}</td>
                    <AnimatePresence>
                      {comparedServices.map((service) => (
                        <motion.td
                          key={service.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center p-6 border-l border-gray-700"
                        >
                          {service.features.includes(feature) ? (
                            <span className="text-green-400 text-2xl">✓</span>
                          ) : (
                            <span className="text-gray-600 text-2xl">✕</span>
                          )}
                        </motion.td>
                      ))}
                    </AnimatePresence>
                  </motion.tr>
                ))}

                {/* Rating Row */}
                <motion.tr
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="border-b border-gray-700 bg-gray-700/30"
                >
                  <td className="p-6 text-gray-300 font-semibold">Customer Rating</td>
                  <AnimatePresence>
                    {comparedServices.map((service) => (
                      <motion.td
                        key={service.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center p-6 border-l border-gray-700"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-xl">
                            {'⭐'.repeat(Math.round(service.rating))}
                          </span>
                          <span className="text-white font-bold">{service.rating}</span>
                        </div>
                      </motion.td>
                    ))}
                  </AnimatePresence>
                </motion.tr>

                {/* CTA Row */}
                <motion.tr
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="bg-linear-to-r from-blue-600/30 to-purple-600/30"
                >
                  <td className="p-6"></td>
                  <AnimatePresence>
                    {comparedServices.map((service) => (
                      <motion.td
                        key={service.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center p-6 border-l border-gray-700"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                        >
                          Get Started
                        </motion.button>
                      </motion.td>
                    ))}
                  </AnimatePresence>
                </motion.tr>
              </tbody>
            </table>
          </motion.div>
        )}

        {comparedServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            <p>Select at least one service to compare</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
