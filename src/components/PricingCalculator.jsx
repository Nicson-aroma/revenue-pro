import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PricingCalculator({ services }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [volume, setVolume] = useState(10000);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const calculatePrice = (service, contacts) => {
    let tier = service.pricing[0];

    // Find the appropriate tier based on volume
    service.pricing.forEach(t => {
      const tierLimit = parseInt(t.contacts || t.workflows || t.domains || '0');
      if (tierLimit > 0 && contacts <= tierLimit) {
        tier = t;
      }
    });

    let price = typeof tier.price === 'number' ? tier.price : service.price;

    if (billingCycle === 'yearly') {
      price = price * 12 * 0.9; // 10% yearly discount
    }

    return price;
  };

  const totalPrice = useMemo(() => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + calculatePrice(service, volume);
    }, 0);
  }, [selectedServices, volume, billingCycle, services]);

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <motion.div
      id="calculator"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">💰 Pricing Calculator</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build your perfect package and see the total cost instantly
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Service Selection */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Services</h3>

            <div className="space-y-3 mb-8">
              {services.map((service, idx) => (
                <motion.label
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => handleServiceToggle(service.id)}
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-semibold text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-600">
                      ${calculatePrice(service, volume)}/month
                    </p>
                  </div>
                  <div className="text-2xl">{service.image}</div>
                </motion.label>
              ))}
            </div>

            {/* Volume Selector */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Contacts/Volume: {volume.toLocaleString()}
              </label>
              <motion.input
                type="range"
                min="1000"
                max="500000"
                step="1000"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>1K</span>
                <span>250K</span>
                <span>500K</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Total & Billing */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-lg text-white h-fit sticky top-24"
          >
            <h3 className="text-2xl font-bold mb-6">Summary</h3>

            {/* Billing Cycle */}
            <div className="mb-8">
              <p className="text-sm text-blue-100 mb-3">Billing Cycle</p>
              <div className="flex gap-2">
                {['monthly', 'yearly'].map(cycle => (
                  <motion.button
                    key={cycle}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setBillingCycle(cycle)}
                    className={`flex-1 py-2 rounded-lg font-semibold transition ${
                      billingCycle === cycle
                        ? 'bg-white text-blue-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {cycle === 'monthly' ? 'Monthly' : 'Yearly'}
                  </motion.button>
                ))}
              </div>
              {billingCycle === 'yearly' && (
                <p className="text-sm text-green-200 mt-2">✓ 10% yearly discount applied!</p>
              )}
            </div>

            {/* Selected Services */}
            <div className="mb-8 pb-8 border-b border-white/30">
              <p className="text-sm text-blue-100 mb-3">Selected Services</p>
              {selectedServices.length === 0 ? (
                <p className="text-sm text-blue-100">No services selected</p>
              ) : (
                <div className="space-y-2">
                  <AnimatePresence>
                    {selectedServices.map((serviceId, idx) => {
                      const service = services.find(s => s.id === serviceId);
                      const price = calculatePrice(service, volume);
                      return (
                        <motion.div
                          key={serviceId}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex justify-between text-sm"
                        >
                          <span>{service.name}</span>
                          <span className="font-semibold">${price.toFixed(2)}</span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Total Price */}
            <div className="mb-6">
              <p className="text-sm text-blue-100 mb-2">Total {billingCycle === 'yearly' ? 'Annual' : 'Monthly'} Cost</p>
              <motion.p
                key={totalPrice}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-5xl font-bold"
              >
                ${totalPrice.toFixed(2)}
              </motion.p>
              {billingCycle === 'yearly' && (
                <p className="text-xs text-blue-100 mt-1">
                  ${(totalPrice / 12).toFixed(2)}/month
                </p>
              )}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={selectedServices.length === 0}
              className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get Quote
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
