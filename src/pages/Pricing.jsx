import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const packages = [
  {
    name: 'Starter',
    accent: 'bg-emerald-500',
    ring: 'border-emerald-200',
    surface: 'bg-emerald-50',
    label: 'Best for early-stage brands',
    items: [
      '4 to 6 email campaigns per month',
      'Basic automation setup with 1 to 2 flows',
      'Email design and copywriting',
      'Performance tracking',
    ],
    investment: 'Starting from $500/month',
  },
  {
    name: 'Growth',
    accent: 'bg-sky-500',
    ring: 'border-sky-200',
    surface: 'bg-sky-50',
    label: 'Best for growing brands',
    items: [
      '8 to 10 campaigns per month',
      'Multiple automation flows',
      'A/B testing',
      'Customer segmentation',
      'Monthly strategy',
    ],
    investment: 'Typically $800 to $1,500/month',
  },
  {
    name: 'Scale',
    accent: 'bg-purple-500',
    ring: 'border-purple-200',
    surface: 'bg-purple-50',
    label: 'Best for serious brands',
    items: [
      'Unlimited campaigns',
      'Full email system setup',
      'Advanced segmentation',
      'Weekly optimization',
      'Dedicated team',
    ],
    investment: '$1,500 to $3,000+/month',
  },
];

const pricingFactors = [
  'Number of campaigns per month',
  'Automation flows required',
  'Email list size',
  'Level of strategy and optimization',
  'Turnaround speed',
];

const valuePoints = [
  'Generate consistent monthly revenue',
  'Recover lost sales automatically',
  'Increase repeat purchases',
  'Build long-term customer relationships',
];

const results = [
  { value: '30 to 40%', label: 'Increase in Email Revenue' },
  { value: '$100K+', label: 'Generated Through Flows' },
  { value: 'Higher', label: 'Engagement and Conversions' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function PricingPage() {
  return (
    <main className="bg-[#0a0614] pt-16 text-white">
      <section className="bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.28),_transparent_35%),linear-gradient(135deg,_#090511_0%,_#140d26_48%,_#090511_100%)]">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <motion.div {...fadeUp}>
            <h1 className="font-['Space_Grotesk',sans-serif] text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Simple, Flexible Pricing
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Every brand is different. That&apos;s why we offer tailored pricing based on your goals, email list size, and growth stage.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white text-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              What You Can Expect to Invest
            </h2>
            <div className="mx-auto mt-10 max-w-3xl rounded-[32px] border border-purple-100 bg-[#f7f3ff] p-10 shadow-[0_22px_55px_rgba(88,28,135,0.08)]">
              <p className="text-5xl font-bold text-emerald-600 sm:text-6xl">$500 to $2,000</p>
              <p className="mt-3 text-lg font-semibold text-slate-700">typical monthly investment</p>
            </div>
            <div className="mx-auto mt-8 max-w-3xl space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Most of our clients invest between $500 and $2,000 per month depending on their needs and growth stage.
              </p>
              <p>
                Smaller brands typically start lower, while scaling brands invest more for advanced strategies and faster growth.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f6f1ff] text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Guide pricing built for different growth stages.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {packages.map((pkg, index) => (
              <motion.article
                key={pkg.name}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                className={`rounded-[30px] border ${pkg.ring} bg-white p-8 shadow-[0_20px_50px_rgba(88,28,135,0.08)]`}
              >
                <div className={`h-2 w-16 rounded-full ${pkg.accent}`} />
                <h3 className="mt-6 text-3xl font-bold text-slate-950">{pkg.name}</h3>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{pkg.label}</p>
                <ul className="mt-8 space-y-3">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base leading-7 text-slate-600">
                      <span className={`mt-1 h-2.5 w-2.5 rounded-full ${pkg.accent}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className={`mt-8 rounded-2xl border ${pkg.ring} ${pkg.surface} p-5`}>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Investment</p>
                  <p className="mt-3 text-xl font-bold text-slate-950">{pkg.investment}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Need Something Custom?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Every business is unique. We create custom plans based on your requirements, email list size, and revenue goals.
            </p>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-purple-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-purple-400"
              >
                Get a Custom Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f6f1ff] text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              What Determines Pricing?
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {pricingFactors.map((factor, index) => (
              <motion.div
                key={factor}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.05 }}
                className="rounded-[26px] border border-purple-100 bg-white p-6 shadow-[0_18px_45px_rgba(88,28,135,0.08)]"
              >
                <p className="text-lg font-semibold leading-8 text-slate-800">{factor}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,_#120a22_0%,_#090511_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Why Clients Invest in Email Marketing
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {valuePoints.map((point, index) => (
              <motion.div
                key={point}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.05 }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-7"
              >
                <p className="text-xl font-semibold leading-8 text-white">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Real Results
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {results.map((result, index) => (
              <motion.div
                key={result.label}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-8"
              >
                <p className="text-5xl font-bold text-emerald-600 sm:text-6xl">{result.value}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {result.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }} className="mt-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-purple-200 px-7 py-4 text-sm font-semibold text-purple-700 transition hover:border-purple-400 hover:bg-purple-50"
            >
              View Case Studies
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,_rgba(196,181,253,0.25),_transparent_35%),linear-gradient(135deg,_#2e1065_0%,_#5b21b6_48%,_#0f172a_100%)]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to See What Email Can Do for Your Business?
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Book a free audit and we&apos;ll show you exactly how to unlock more revenue.
            </p>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                Book a Free Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
