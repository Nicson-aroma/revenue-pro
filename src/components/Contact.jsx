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

const businessTypeOptions = [
  'Ecommerce',
  'SaaS',
  'Agency',
  'Coaching / Info product',
  'Local business',
  'Other',
];

const monthlyRevenueOptions = [
  'Under $10K / month',
  '$10K to $50K / month',
  '$50K to $100K / month',
  '$100K to $500K / month',
  '$500K+ / month',
];

const availableDates = [
  { value: '2026-04-08', label: 'April 8, 2026' },
  { value: '2026-04-09', label: 'April 9, 2026' },
  { value: '2026-04-10', label: 'April 10, 2026' },
  { value: '2026-04-13', label: 'April 13, 2026' },
  { value: '2026-04-14', label: 'April 14, 2026' },
];

const timeSlotsByDate = {
  '2026-04-08': ['10:00 AM', '12:00 PM', '3:00 PM'],
  '2026-04-09': ['11:00 AM', '1:00 PM', '4:00 PM'],
  '2026-04-10': ['9:30 AM', '12:30 PM', '2:30 PM'],
  '2026-04-13': ['10:30 AM', '1:30 PM', '5:00 PM'],
  '2026-04-14': ['9:00 AM', '11:30 AM', '3:30 PM'],
};

const discoveryPoints = [
  'A quick review of your current campaigns, flows, design quality, and missed retention opportunities.',
  'Clear direction on fit, execution scope, and what a practical engagement could look like.',
  'A no-pressure next step, even if the right move is fixing a few things before hiring anyone.',
];

const trustItems = [
  'Campaign strategy',
  'Flow optimization',
  'Email design',
  'QA and deployment',
  'Segmentation support',
  'Performance reporting',
];

const reviews = [
  {
    quote: 'We need a partner that can think strategically, ship fast, and keep quality high without constant hand-holding.',
    author: 'Common fit',
    role: 'Scaling ecommerce teams',
  },
  {
    quote: 'The best engagements start when a brand already knows email matters but needs sharper execution and more consistency.',
    author: 'Best use case',
    role: 'Retention-focused operators',
  },
  {
    quote: 'This page is built for teams that want a serious conversation about revenue, not a generic sales funnel.',
    author: 'How we approach it',
    role: 'Practical, low-friction discovery',
  },
];

const faqs = [
  {
    question: 'What kind of brands are the best fit?',
    answer:
      'This is best suited to ecommerce brands that already have an email list, existing sends, or a retention program that needs stronger planning and execution.',
  },
  {
    question: 'What do you cover end to end?',
    answer:
      'We can support strategy, campaign planning, design, build, flow work, QA, deployment support, and performance review depending on the scope you need.',
  },
  {
    question: 'What happens after I submit the form?',
    answer:
      'We review your brand context, current setup, and goals first. If there is a strong fit, we follow up with the next-step call and a clearer recommendation.',
  },
  {
    question: 'Do I need everything figured out before reaching out?',
    answer:
      'No. A rough snapshot of your current setup, growth stage, and main bottlenecks is enough for an informed first conversation.',
  },
  {
    question: 'Can you work with my current ESP and team setup?',
    answer:
      'Yes. The process is designed to plug into existing tools, workflows, and internal teams rather than forcing a rebuild from scratch.',
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
    'w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20';

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
    selectedDate: '',
    selectedTime: '',
    fullName: '',
    email: '',
    phone: '',
    company: '',
    monthlyRevenue: '',
    businessType: '',
    selectedService: '',
    projectDetails: '',
    currentChallenges: '',
    budget: '',
    timeline: '',
    preferredContact: 'email',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const availableTimeSlots = formData.selectedDate ? timeSlotsByDate[formData.selectedDate] ?? [] : [];

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.selectedDate) {
      nextErrors.selectedDate = 'Choose a date first.';
    }
    if (!formData.selectedTime) {
      nextErrors.selectedTime = 'Choose a time slot.';
    }
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
    if (!formData.monthlyRevenue) {
      nextErrors.monthlyRevenue = 'Select your monthly revenue range.';
    }
    if (!formData.businessType) {
      nextErrors.businessType = 'Select your business type.';
    }
    if (!formData.selectedService) {
      nextErrors.selectedService = 'Choose the area you need help with.';
    }
    if (formData.currentChallenges.trim().length < 20) {
      nextErrors.currentChallenges = 'Add more detail about the challenges you are facing right now.';
    }
    if (formData.projectDetails.trim().length < 20) {
      nextErrors.projectDetails = 'Add a little more detail so we can review the opportunity properly.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'selectedDate' ? { selectedTime: '' } : {}),
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (name === 'selectedDate' && errors.selectedTime) {
      setErrors((prev) => ({ ...prev, selectedTime: '' }));
    }
  };

  const resetForm = () => {
    setFormData({
      selectedDate: '',
      selectedTime: '',
      fullName: '',
      email: '',
      phone: '',
      company: '',
      monthlyRevenue: '',
      businessType: '',
      selectedService: '',
      projectDetails: '',
      currentChallenges: '',
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
    <main className="bg-[#07111f] pt-16 text-white">
      <section className="overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(249,115,22,0.14),_transparent_24%),linear-gradient(135deg,_#07111f_0%,_#0b1728_52%,_#07111f_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                Book a call
              </span>
              <h1 className="mt-6 max-w-3xl font-['Space_Grotesk',sans-serif] text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Let&apos;s tighten up your email operation and unlock more revenue.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                In one focused conversation, we can review your current setup, identify execution gaps, and map the most sensible next move for your retention program.
              </p>

              <div className="mt-8 space-y-4">
                {discoveryPoints.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 + index * 0.08, ease: 'easeOut' }}
                    className="flex gap-4 rounded-[24px] border border-white/10 bg-white/6 p-5 backdrop-blur-sm"
                  >
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-sm font-bold text-cyan-200">
                      0{index + 1}
                    </div>
                    <p className="text-base leading-7 text-slate-200">{item}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 rounded-[28px] border border-white/10 bg-[#0d1b2f]/80 p-6 shadow-[0_20px_60px_rgba(3,10,24,0.35)]">
                <div className="flex flex-wrap gap-3">
                  {trustItems.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-400">
                  This page is designed like a booking page, but tuned for your current lead form workflow so you can capture qualified inquiries without losing the higher-trust presentation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.08 }}
              className="rounded-[34px] border border-white/10 bg-white p-5 text-slate-900 shadow-[0_30px_90px_rgba(3,10,24,0.5)] sm:p-8"
            >
              <div className="rounded-[28px] bg-[linear-gradient(135deg,_#eff6ff_0%,_#f8fafc_50%,_#fff7ed_100%)] p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700">
                      Strategy call request
                    </p>
                    <h2 className="mt-3 font-['Space_Grotesk',sans-serif] text-3xl font-bold text-slate-950">
                      Tell us about your brand
                    </h2>
                    <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                      Share a few details below. We&apos;ll review the opportunity and reply with the most relevant next step.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">30-minute discovery</p>
                    <p className="mt-1">Focused on fit, gaps, and immediate priorities.</p>
                  </div>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 rounded-[24px] border border-emerald-200 bg-emerald-50 p-6"
                  >
                    <h3 className="text-2xl font-bold text-emerald-800">Request received</h3>
                    <p className="mt-3 text-base leading-7 text-emerald-700">
                      Thanks. We&apos;ll review your details and reach out shortly with the next step.
                    </p>
                  </motion.div>
                ) : null}

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div className="rounded-[24px] border border-slate-200 bg-white/80 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Step 1</p>
                    <div className="mt-4 grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="selectedDate" className="mb-2 block text-sm font-semibold text-slate-700">
                          Select date *
                        </label>
                        <select
                          id="selectedDate"
                          name="selectedDate"
                          value={formData.selectedDate}
                          onChange={handleChange}
                          className={`w-full rounded-2xl border bg-[#f8fafc] px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 ${
                            errors.selectedDate ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200'
                          }`}
                        >
                          <option value="">Choose a date</option>
                          {availableDates.map((date) => (
                            <option key={date.value} value={date.value}>
                              {date.label}
                            </option>
                          ))}
                        </select>
                        {errors.selectedDate ? <p className="mt-2 text-sm text-red-500">{errors.selectedDate}</p> : null}
                      </div>

                      <div>
                        <label htmlFor="selectedTime" className="mb-2 block text-sm font-semibold text-slate-700">
                          Select time *
                        </label>
                        <select
                          id="selectedTime"
                          name="selectedTime"
                          value={formData.selectedTime}
                          onChange={handleChange}
                          disabled={!formData.selectedDate}
                          className={`w-full rounded-2xl border bg-[#f8fafc] px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60 ${
                            errors.selectedTime ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200'
                          }`}
                        >
                          <option value="">{formData.selectedDate ? 'Choose a time slot' : 'Select a date first'}</option>
                          {availableTimeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                        {errors.selectedTime ? <p className="mt-2 text-sm text-red-500">{errors.selectedTime}</p> : null}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-white/80 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Step 2</p>
                    <div className="mt-4 grid gap-5 md:grid-cols-2">
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
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-white/80 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Step 3</p>
                    <div className="mt-4 grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="monthlyRevenue" className="mb-2 block text-sm font-semibold text-slate-700">
                          Company monthly revenue *
                        </label>
                        <select
                          id="monthlyRevenue"
                          name="monthlyRevenue"
                          value={formData.monthlyRevenue}
                          onChange={handleChange}
                          className={`w-full rounded-2xl border bg-[#f8fafc] px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 ${
                            errors.monthlyRevenue ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200'
                          }`}
                        >
                          <option value="">Choose revenue range</option>
                          {monthlyRevenueOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.monthlyRevenue ? <p className="mt-2 text-sm text-red-500">{errors.monthlyRevenue}</p> : null}
                      </div>

                      <div>
                        <label htmlFor="businessType" className="mb-2 block text-sm font-semibold text-slate-700">
                          Business type *
                        </label>
                        <select
                          id="businessType"
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          className={`w-full rounded-2xl border bg-[#f8fafc] px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 ${
                            errors.businessType ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200'
                          }`}
                        >
                          <option value="">Choose business type</option>
                          {businessTypeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.businessType ? <p className="mt-2 text-sm text-red-500">{errors.businessType}</p> : null}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="selectedService" className="mb-2 block text-sm font-semibold text-slate-700">
                      What do you need help with? *
                    </label>
                    <select
                      id="selectedService"
                      name="selectedService"
                      value={formData.selectedService}
                      onChange={handleChange}
                        className={`w-full rounded-2xl border bg-[#f8fafc] px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 ${
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
                        className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
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
                        className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
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
                                ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
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
                    label="What challenge are you facing right now?"
                    name="currentChallenges"
                    value={formData.currentChallenges}
                    onChange={handleChange}
                    error={errors.currentChallenges}
                    placeholder="Explain the bottleneck right now: low email revenue, weak flows, poor campaign consistency, deliverability issues, lack of strategy, or slow execution."
                    textarea
                    rows={5}
                    required
                  />

                  <InputField
                    label="What is happening in your email channel right now?"
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    error={errors.projectDetails}
                    placeholder="Tell us about your current setup, list size, campaign rhythm, automation coverage, revenue goals, and where execution feels weak."
                    textarea
                    rows={6}
                    required
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-base font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Submitting...' : 'Request My Strategy Call'}
                  </button>

                  <p className="text-center text-sm leading-6 text-slate-500">
                    Your details are only used to review your inquiry and contact you about the next step.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7fafc] py-20 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700">
                Why teams reach out
              </p>
              <h2 className="mt-4 font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight text-slate-950">
                Built for brands that need sharper execution, not more noise.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                The structure here mirrors a high-trust agency booking page: clear promise, clear process, proof-driven layout, and fewer distractions between interest and inquiry.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-slate-200 bg-white p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Best for</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">Growing ecommerce retention programs</p>
                </div>
                <div className="rounded-[24px] border border-slate-200 bg-white p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Call focus</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">Fit, priorities, and execution gaps</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.06, ease: 'easeOut' }}
              className="space-y-4"
            >
              {reviews.map((review) => (
                <div key={review.author} className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                  <p className="text-lg leading-8 text-slate-700">&ldquo;{review.quote}&rdquo;</p>
                  <div className="mt-5">
                    <p className="font-semibold text-slate-900">{review.author}</p>
                    <p className="text-sm text-slate-500">{review.role}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700">Questions</p>
            <h2 className="mt-4 font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight text-slate-950">
              Things most brands ask before booking
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              The FAQ section is intentionally placed after the booking block, following the same trust-building flow as the reference page.
            </p>
          </motion.div>

          <div className="mt-12 space-y-4">
            {faqs.map((item, index) => (
              <motion.details
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.04, ease: 'easeOut' }}
                className="group rounded-[24px] border border-slate-200 bg-slate-50 p-6"
              >
                <summary className="cursor-pointer list-none text-left text-lg font-semibold text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{item.answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
