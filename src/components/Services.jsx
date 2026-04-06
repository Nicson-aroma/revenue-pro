import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import abandonCartImg from '../assets/abandone-cart-automation.png';
import heroImg from '../assets/hero.png';
import monthlyStatsImg from '../assets/monthly-campaign-stats.png';
import welcomeWorkflowImg from '../assets/welcome-mail-workflow.png';

const serviceCards = [
  {
    icon: '✉',
    title: 'Email Campaign Management',
    intro:
      'We plan, design, and send high-converting campaigns that drive consistent revenue.',
    includes: [
      'Weekly campaign planning',
      'Conversion-focused copywriting',
      'Clean, mobile-first design',
      'Scheduling and deployment',
      'A/B testing',
    ],
    outcome: 'Consistent sales from your email list every week.',
    image: heroImg,
  },
  {
    icon: '⚙',
    title: 'Automation Flows',
    intro:
      'We build automated email sequences that work 24/7 to generate revenue.',
    includes: [
      'Welcome series',
      'Abandoned cart',
      'Browse abandonment',
      'Post-purchase',
      'Winback campaigns',
    ],
    outcome: 'Recover lost revenue and increase repeat purchases automatically.',
    image: abandonCartImg,
  },
  {
    icon: '◫',
    title: 'Email Design & Development',
    intro:
      'Professionally designed emails that look great and convert.',
    includes: [
      'Responsive mobile-friendly design',
      'Brand-focused layouts',
      'HTML email development',
      'Cross-platform compatibility',
    ],
    outcome: 'Better user experience and higher click-through rates.',
    image: welcomeWorkflowImg,
  },
  {
    icon: '📈',
    title: 'Email Strategy & Optimization',
    intro:
      'We analyze your data and continuously improve performance.',
    includes: [
      'Account audit',
      'Customer segmentation',
      'A/B testing',
      'Performance tracking',
      'Monthly reporting',
    ],
    outcome: 'Higher ROI from every email you send.',
    image: monthlyStatsImg,
  },
];

const workSteps = [
  {
    number: '1',
    title: 'Audit & Strategy',
    copy: 'We identify revenue gaps and build a clear plan.',
  },
  {
    number: '2',
    title: 'Build & Launch',
    copy: 'We design, write, and deploy your emails.',
  },
  {
    number: '3',
    title: 'Optimize & Scale',
    copy: 'We continuously improve performance.',
  },
];

const reasons = [
  'Fast turnaround in 48 to 72 hours',
  'Dedicated email team',
  'Data-driven decisions',
  'Focus on revenue growth',
  'Scalable system',
];

const stats = [
  { value: '$250,000+', label: 'Generated Through Email' },
  { value: '35%', label: 'Average Revenue Increase' },
  { value: '20+', label: 'Brands Scaled' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function Services() {
  return (
    <main className="bg-[#0a0614] pt-16 text-white">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),_transparent_28%),linear-gradient(135deg,_#090511_0%,_#140d26_48%,_#090511_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <motion.div {...fadeUp} className="flex flex-col justify-center">
            <h1 className="font-['Space_Grotesk',sans-serif] text-5xl font-bold leading-none text-white sm:text-6xl">
              Email Marketing That Actually Drives Revenue
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              From strategy to execution, we handle everything needed to turn your email list into a consistent revenue channel.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-purple-500 px-7 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(168,85,247,0.35)] transition hover:bg-purple-400"
              >
                Book a Free Audit
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:border-purple-300 hover:text-purple-200"
              >
                View Case Studies
              </Link>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -left-6 top-12 h-28 w-28 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute -right-8 bottom-8 h-32 w-32 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="rounded-[30px] border border-white/10 bg-slate-950/75 p-5 shadow-[0_30px_80px_rgba(8,4,18,0.75)] backdrop-blur">
              <img src={heroImg} alt="Email dashboard preview" className="h-72 w-full rounded-[24px] object-cover object-top" />
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Weekly Campaigns</p>
                  <p className="mt-3 text-3xl font-bold text-white">Built Fast</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Revenue Focus</p>
                  <p className="mt-3 text-3xl font-bold text-emerald-400">Always On</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white text-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              More Than Just Emails
            </h2>
            <div className="mx-auto mt-8 max-w-3xl space-y-5 text-lg leading-8 text-slate-600">
              <p>Most agencies focus on sending emails. We focus on generating revenue.</p>
              <p>
                We act as your dedicated email marketing team, handling strategy, design, copy, and execution so you can scale faster without hiring in-house.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f6f1ff] text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Four core areas that turn email into a dependable sales channel.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {serviceCards.map((service, index) => (
              <motion.article
                key={service.title}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                className="overflow-hidden rounded-[30px] border border-purple-100 bg-white shadow-[0_22px_55px_rgba(88,28,135,0.08)]"
              >
                <img src={service.image} alt={service.title} className="h-56 w-full object-cover object-top" />
                <div className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-purple-700">
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-slate-950">{service.title}</h3>
                  </div>
                  <p className="mt-6 text-base leading-7 text-slate-700">{service.intro}</p>

                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                      What&apos;s Included
                    </p>
                    <ul className="mt-4 space-y-3">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-base leading-7 text-slate-600">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
                      Outcome
                    </p>
                    <p className="mt-3 text-lg font-bold leading-8 text-emerald-800">{service.outcome}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Simple, Fast, and Scalable
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {workSteps.map((step, index) => (
              <motion.div
                key={step.title}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                className="relative rounded-[28px] border border-slate-200 bg-slate-50 p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-xl font-bold text-white">
                    {step.number}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-950">{step.title}</h3>
                </div>
                <p className="mt-5 text-base leading-7 text-slate-600">{step.copy}</p>
                {index < workSteps.length - 1 && (
                  <div className="pointer-events-none absolute -right-4 top-1/2 hidden h-0.5 w-8 -translate-y-1/2 bg-gradient-to-r from-purple-300 to-purple-500 lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,_#120a22_0%,_#090511_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Built for Results, Not Just Activity
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.05 }}
                className="rounded-[26px] border border-white/10 bg-white/5 p-6"
              >
                <p className="text-lg font-semibold leading-8 text-white">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f1ff] text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Proven Results
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                className="rounded-[28px] border border-purple-100 bg-white p-8 shadow-[0_18px_45px_rgba(88,28,135,0.08)]"
              >
                <p className="text-5xl font-bold text-emerald-600 sm:text-6xl">{stat.value}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }} className="mt-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center rounded-full bg-purple-500 px-7 py-4 text-sm font-semibold text-white transition hover:bg-purple-400"
            >
              View Case Studies
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-white text-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Flexible Pricing for Growing Brands
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Every brand is different. That&apos;s why we offer flexible pricing based on your needs and growth stage.
            </p>
            <div className="mx-auto mt-10 max-w-md rounded-[30px] border border-purple-100 bg-[#f7f3ff] p-8 shadow-[0_20px_50px_rgba(88,28,135,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Plans Typically Start From
              </p>
              <p className="mt-4 text-6xl font-bold text-emerald-600">$500</p>
              <p className="mt-2 text-lg font-semibold text-slate-700">per month</p>
            </div>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-purple-200 px-7 py-4 text-sm font-semibold text-purple-700 transition hover:border-purple-400 hover:bg-purple-50"
              >
                See Pricing
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-purple-500 px-7 py-4 text-sm font-semibold text-white transition hover:bg-purple-400"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,_rgba(196,181,253,0.25),_transparent_35%),linear-gradient(135deg,_#2e1065_0%,_#5b21b6_48%,_#0f172a_100%)]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to Turn Email Into Your Top Revenue Channel?
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Book a free audit and discover hidden revenue opportunities in your email marketing.
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
