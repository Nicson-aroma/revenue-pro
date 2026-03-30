import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ServiceFilter({ services, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  const handleFilter = () => {
    const filtered = services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = service.rating >= selectedRating;
      const matchesPrice = service.price <= maxPrice;
      return matchesSearch && matchesRating && matchesPrice;
    });
    onFilter(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handlePriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  // Trigger filter whenever inputs change
  const triggerFilter = () => {
    handleFilter();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 shadow-lg"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">🔍 Filter Services</h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Search</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => {
              handleSearchChange(e);
              triggerFilter();
            }}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition placeholder-gray-400"
          />
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Min Rating</label>
          <select
            value={selectedRating}
            onChange={(e) => {
              handleRatingChange(Number(e.target.value));
              triggerFilter();
            }}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition bg-white cursor-pointer"
          >
            <option value={0}>All Ratings</option>
            <option value={4.5}>⭐⭐⭐⭐⭐ 4.5+</option>
            <option value={4.7}>⭐⭐⭐⭐⭐ 4.7+</option>
            <option value={4.8}>⭐⭐⭐⭐⭐ 4.8+</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Max Price: ${maxPrice}
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="range"
            min="0"
            max="500"
            value={maxPrice}
            onChange={(e) => {
              handlePriceChange(e);
              triggerFilter();
            }}
            className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <p className="text-sm text-gray-600 mt-2">$0 - ${maxPrice}/month</p>
        </div>

        {/* Filter Button */}
        <div className="flex items-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFilter}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition font-semibold"
          >
            Apply Filters
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
