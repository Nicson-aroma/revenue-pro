import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendContactForm } from '../config/emailjs';

const serviceOptions = [
  'Full Email Management',
  'Campaign Strategy & Execution',
  'Automation Flows',
  'Email Design & Development',
  'Audit & Optimization',
];

const budgetOptions = [
  'Under $500 / month',
  '$500 to $1,000 / month',
  '$1,000 to $2,000 / month',
  '$2,000+ / month',
];

const timelineOptions = [
  'As soon as possible',
  'Within 2 weeks',
  'This month',
  'Just exploring',
];

const contactPoints = [
  {
    title: 'Revenue-first strategy',
    copy: 'We focus on what will increase email-attributed revenue, not just email volume.',
  },
  {
    title: 'Fast, clear process',
    copy: 'You get a structured review, a recommended path, and a realistic rollout plan.',
  },
  {
    title: 'Built for scaling brands',
    copy: 'The process is designed for ecommerce teams that want stronger retention and better lifecycle performance.',
  },
];

function InputField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  textarea = false,
  rows = 5,
  required = false,
}) {
  const baseClassName =
    'w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20';

  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-slate-700">
        {label} {required ? '*' : ''}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`${baseClassName} resize-none ${error ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`${baseClassName} ${error ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
          placeholder={placeholder}
        />
      )}
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    selectedService: '',
    projectDetails: '',
    budget: '',
    timeline: '',
    preferredContact: 'email',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Please add your name.';
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Please add your work email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!formData.company.trim()) {
      nextErrors.company = 'Please add your brand or company name.';
    }
    if (!formData.selectedService) {
      nextErrors.selectedService = 'Choose the area you need help with.';
    }
    if (formData.projectDetails.trim().length < 20) {
      nextErrors.projectDetails = 'Add a little more detail so we can review the opportunity properly.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      selectedService: '',
      projectDetails: '',
      budget: '',
      timeline: '',
      preferredContact: 'email',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await sendContactForm(formData);
      setSubmitted(true);
      resetForm();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#0a0614] pt-16 text-white">
      <section className="bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.28),_transparent_36%),linear-gradient(135deg,_#090511_0%,_#140d26_50%,_#090511_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h1 className="font-['Space_Grotesk',sans-serif] text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Let&apos;s find the revenue your email channel is missing.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                This is not a generic contact form. Share a few details about your brand, current email setup, and growth goals. We&apos;ll review the opportunity and come back with a practical next step.
              </p>

              <div className="mt-10 space-y-4">
                {contactPoints.map((point, index) => (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: 'easeOut' }}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-6"
                  >
                    <h2 className="text-xl font-bold text-white">{point.title}</h2>
                    <p className="mt-3 text-base leading-7 text-slate-300">{point.copy}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 rounded-[28px] border border-purple-400/20 bg-purple-500/10 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-purple-200">
                  What happens next
                </p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-slate-200">
                  <li>We review your submission and current growth stage.</li>
                  <li>We identify the highest-value revenue opportunities.</li>
                  <li>We reply with a recommended path and next-step call.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.08 }}
              className="rounded-[32px] border border-white/10 bg-white p-8 text-slate-900 shadow-[0_30px_80px_rgba(8,4,18,0.45)]"
            >
              <div className="border-b border-slate-200 pb-6">
                <h2 className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-slate-950">
                  Book your free audit
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  The more context you share, the more useful our first response will be.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 rounded-[24px] border border-emerald-200 bg-emerald-50 p-6"
                >
                  <h3 className="text-2xl font-bold text-emerald-800">Inquiry received</h3>
                  <p className="mt-3 text-base leading-7 text-emerald-700">
                    Thanks. We&apos;ll review your details and reach out shortly with the next step.
                  </p>
                </motion.div>
              ) : null}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <InputField
                    label="Full name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    placeholder="Jane Smith"
                    required
                  />
                  <InputField
                    label="Work email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="jane@brand.com"
                    required
                  />
                  <InputField
                    label="Phone number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+1 (555) 123-4567"
                  />
                  <InputField
                    label="Brand or company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    error={errors.company}
                    placeholder="Your brand"
                    required
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="selectedService" className="mb-2 block text-sm font-semibold text-slate-700">
                      What do you need help with? *
                    </label>
                    <select
                      id="selectedService"
                      name="selectedService"
                      value={formData.selectedService}
                      onChange={handleChange}
                      className={`w-full rounded-2xl border bg-white px-4 py-3 text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                        errors.selectedService ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200'
                      }`}
                    >
                      <option value="">Select a service focus</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.selectedService ? <p className="mt-2 text-sm text-red-500">{errors.selectedService}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="budget" className="mb-2 block text-sm font-semibold text-slate-700">
                      Monthly budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    >
                      <option value="">Choose a range</option>
                      {budgetOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="mb-2 block text-sm font-semibold text-slate-700">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    >
                      <option value="">Select timing</option>
                      {timelineOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p className="mb-2 block text-sm font-semibold text-slate-700">Preferred contact method</p>
                    <div className="flex flex-wrap gap-3">
                      {['email', 'phone'].map((method) => (
                        <label
                          key={method}
                          className={`inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-sm font-medium capitalize transition ${
                            formData.preferredContact === method
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferredContact"
                            value={method}
                            checked={formData.preferredContact === method}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          {method}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <InputField
                  label="What is happening in your email channel right now?"
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  error={errors.projectDetails}
                  placeholder="Tell us about your current setup, list size, campaigns or flows in place, revenue goals, and where performance feels weak."
                  textarea
                  rows={6}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-full bg-purple-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Submitting...' : 'Request My Free Audit'}
                </button>

                <p className="text-center text-sm leading-6 text-slate-500">
                  Your details are only used to review your inquiry and contact you about the next step.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
