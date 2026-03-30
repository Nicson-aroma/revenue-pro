import { useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import { useDarkMode } from '../context/DarkModeContext';
import { sendContactForm } from '../config/emailjs';

export default function Contact() {
  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    selectedService: '',
    projectDetails: '',
    budget: '',
    timeline: '',
    preferredContact: 'email'
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.selectedService) {
      newErrors.selectedService = 'Please select a service';
    }

    if (formData.projectDetails.trim().length < 10) {
      newErrors.projectDetails = 'Project details must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await sendContactForm(formData);
      console.log('Form submitted successfully:', formData);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          selectedService: '',
          projectDetails: '',
          budget: '',
          timeline: '',
          preferredContact: 'email'
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Get Your Service Quote
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Fill out the form below and our team will contact you within 24 hours with a personalized quote and implementation plan.
          </p>
        </motion.div>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-8 p-6 border-2 rounded-xl text-center ${
              isDarkMode
                ? 'bg-green-900 border-green-500'
                : 'bg-green-50 border-green-500'
            }`}
          >
            <div className="text-5xl mb-3">✅</div>
            <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
              Thank You!
            </h3>
            <p className={isDarkMode ? 'text-green-300' : 'text-green-600'}>
              We've received your inquiry. Our team will contact you shortly at {formData.email} or {formData.phone}.
            </p>
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className={`rounded-2xl p-8 shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Full Name *
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  isDarkMode
                    ? 'bg-gray-700 text-white placeholder-gray-500'
                    : 'bg-white text-gray-900 placeholder-gray-500 border-2 border-gray-300'
                } ${errors.fullName ? 'ring-2 ring-red-500 border-red-500' : ''}`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.fullName}
                </motion.p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <label className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address *
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  isDarkMode
                    ? 'bg-gray-700 text-white placeholder-gray-500'
                    : 'bg-white text-gray-900 placeholder-gray-500 border-2 border-gray-300'
                } ${errors.email ? 'ring-2 ring-red-500 border-red-500' : ''}`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Phone Number *
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  isDarkMode
                    ? 'bg-gray-700 text-white placeholder-gray-500'
                    : 'bg-white text-gray-900 placeholder-gray-500 border-2 border-gray-300'
                } ${errors.phone ? 'ring-2 ring-red-500 border-red-500' : ''}`}
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.phone}
                </motion.p>
              )}
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Company Name *
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  isDarkMode
                    ? 'bg-gray-700 text-white placeholder-gray-500'
                    : 'bg-white text-gray-900 placeholder-gray-500 border-2 border-gray-300'
                } ${errors.company ? 'ring-2 ring-red-500 border-red-500' : ''}`}
                placeholder="Your Company"
              />
              {errors.company && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.company}
                </motion.p>
              )}
            </motion.div>

            {/* Service Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Select Service *
              </label>
              <motion.select
                whileFocus={{ scale: 1.02 }}
                name="selectedService"
                value={formData.selectedService}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer ${
                  isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-white text-gray-900 border-2 border-gray-300'
                } ${errors.selectedService ? 'ring-2 ring-red-500 border-red-500' : ''}`}
              >
                <option value="">Choose a service...</option>
                {services.map(service => (
                  <option key={service.id} value={service.name}>
                    {service.name} - ${service.price}/month
                  </option>
                ))}
              </motion.select>
              {errors.selectedService && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.selectedService}
                </motion.p>
              )}
            </motion.div>

            {/* Budget */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Monthly Budget
              </label>
              <motion.select
                whileFocus={{ scale: 1.02 }}
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer ${
                  isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-white text-gray-900 border-2 border-gray-300'
                }`}
              >
                <option value="">Select budget range...</option>
                <option value="<500">Less than $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value=">5000">More than $5,000</option>
              </motion.select>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Implementation Timeline
              </label>
              <motion.select
                whileFocus={{ scale: 1.02 }}
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer ${
                  isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-white text-gray-900 border-2 border-gray-300'
                }`}
              >
                <option value="">Select timeline...</option>
                <option value="asap">ASAP</option>
                <option value="1-2weeks">1-2 weeks</option>
                <option value="1month">1 month</option>
                <option value="flexible">Flexible</option>
              </motion.select>
            </motion.div>

            {/* Preferred Contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <label className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Preferred Contact Method
              </label>
              <div className="flex gap-4 mt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="phone"
                    checked={formData.preferredContact === 'phone'}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Phone</span>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <label className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Tell us about your project
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleChange}
              rows="5"
              className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${
                isDarkMode
                  ? 'bg-gray-700 text-white placeholder-gray-500'
                  : 'bg-white text-gray-900 placeholder-gray-500 border-2 border-gray-300'
              } ${errors.projectDetails ? 'ring-2 ring-red-500 border-red-500' : ''}`}
              placeholder="Describe your email marketing goals, current challenges, and what you're looking to achieve..."
            />
            {errors.projectDetails && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.projectDetails}
              </motion.p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-lg transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Submitting...
              </>
            ) : (
              <>
                <span>📤</span>
                Get Free Quote
              </>
            )}
          </motion.button>

          <p className={`text-center text-sm mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            We respect your privacy. Your information is safe with us and will only be used to contact you about your service inquiry.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
