import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const painPoints = [
  'Campaigns go out, but weak copy and design leave revenue on the table.',
  'Automations exist, but flows are incomplete, under-tested, or poorly timed.',
  'Reporting looks busy, while the actual email channel keeps leaking qualified sales.',
];

const solutionCards = [
  {
    icon: '✍',
    title: 'Copywriting',
    description: 'Conversion-focused messaging for campaigns, launches, and lifecycle flows that moves subscribers to purchase.',
  },
  {
    icon: '◫',
    title: 'Design',
    description: 'High-clarity email layouts that look premium on desktop and mobile without sacrificing click-through rate.',
  },
  {
    icon: '⚙',
    title: 'Automation',
    description: 'Revenue-critical sequences built around abandon cart, welcome, win-back, browse, and post-purchase behavior.',
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Audit',
    description: 'Review list health, deliverability, segmentation, campaign quality, and automation gaps.',
  },
  {
    number: '2',
    title: 'Build',
    description: 'Launch improved creative, stronger offers, sharper segmentation, and revenue-first lifecycle flows.',
  },
  {
    number: '3',
    title: 'Scale',
    description: 'Iterate on performance, expand triggered journeys, and turn email into a dependable profit center.',
  },
];

const stats = [
  { value: '$250K+', label: 'Revenue Generated' },
  { value: '35%', label: 'Average Revenue Increase' },
  { value: '20+', label: 'Brands Supported' },
];

const services = [
  {
    title: 'Campaign Strategy',
    description: 'Campaign calendars, promotional planning, and send strategies aligned to launches, retention, and seasonal demand.',
  },
  {
    title: 'Lifecycle Automation',
    description: 'Welcome, abandon cart, browse abandon, replenishment, win-back, and post-purchase systems built to compound revenue.',
  },
  {
    title: 'Email Creative',
    description: 'Copy and design production for emails that are on-brand, easy to scan, and structured for clicks.',
  },
  {
    title: 'Segmentation',
    description: 'Audience logic based on behavior, purchase stage, and engagement so sends stay relevant and profitable.',
  },
  {
    title: 'Deliverability Support',
    description: 'Foundational checks for sender reputation, domain setup, cadence, and engagement patterns that affect inbox placement.',
  },
  {
    title: 'Analytics & Testing',
    description: 'Performance reviews, testing roadmaps, and reporting that ties creative decisions back to actual revenue impact.',
  },
];

const testimonials = [
  {
    quote: 'MailRevenuePro rebuilt our flows and turned email from a side channel into one of our most dependable revenue drivers.',
    name: 'Sarah Khan',
    company: 'DTC Skincare Brand',
  },
  {
    quote: 'The copy got sharper, the design got cleaner, and our automations started converting like they should have months earlier.',
    name: 'Daniel Reed',
    company: 'Consumer Wellness Store',
  },
  {
    quote: 'Clear strategy, fast execution, and measurable uplift. We finally had an email partner who cared about revenue, not vanity metrics.',
    name: 'Melissa Hart',
    company: 'Lifestyle Ecommerce Team',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function Home() {
  return (
    <main className="bg-[#0a0614] pt-16 text-white">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.28),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.24),_transparent_32%),linear-gradient(135deg,_#090511_0%,_#140d26_45%,_#090511_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-18 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <motion.div {...fadeUp} className="flex flex-col justify-center">
            <h1 className="max-w-xl font-['Space_Grotesk',sans-serif] text-5xl font-bold leading-none text-white sm:text-6xl">
              Turn your email list into a reliable revenue engine.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
              We build higher-converting campaigns, better-looking emails, and automation systems that recover lost revenue at scale.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-purple-500 px-7 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(168,85,247,0.35)] transition hover:bg-purple-400"
              >
                Book a Strategy Call
              </Link>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:border-purple-300 hover:text-purple-200"
              >
                Explore Services
              </a>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute -right-8 bottom-6 h-36 w-36 rounded-full bg-fuchsia-400/15 blur-3xl" />
            <div className="relative rounded-[28px] border border-white/10 bg-slate-950/75 p-5 shadow-[0_30px_80px_rgba(8,4,18,0.75)] backdrop-blur">
              <div className="rounded-[22px] border border-white/8 bg-slate-900/95 p-5">
                <div className="flex items-center justify-between border-b border-white/8 pb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-200">Revenue Dashboard</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">Last 30 days</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    +35.2%
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email Revenue</p>
                    <p className="mt-3 text-3xl font-bold text-white">$82.4K</p>
                    <div className="mt-4 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-400" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Recovered Carts</p>
                    <p className="mt-3 text-3xl font-bold text-white">$18.9K</p>
                    <div className="mt-4 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[61%] rounded-full bg-gradient-to-r from-fuchsia-400 to-purple-300" />
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {[
                    {
                      title: 'Welcome Flow',
                      revenue: '$12.8K',
                      copy: 'New subscriber onboarding with offer education and timed conversion pushes.',
                    },
                    {
                      title: 'Abandon Cart',
                      revenue: '$9.3K',
                      copy: 'Dynamic recovery emails using urgency, objections, and product reminders.',
                    },
                    {
                      title: 'Campaign Preview',
                      revenue: '42% CTR lift',
                      copy: 'Sharper hierarchy, stronger offer framing, and more persuasive CTA placement.',
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-white">{card.title}</p>
                          <p className="mt-2 text-sm leading-6 text-slate-400">{card.copy}</p>
                        </div>
                        <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-200">
                          {card.revenue}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white text-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Most brands lose email revenue because execution is inconsistent.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              The channel is usually active, but under-optimized. For many brands, that means <strong className="font-bold text-slate-950">15% to 30% revenue loss</strong> from weak flows, generic campaigns, and missed lifecycle opportunities.
            </p>
          </motion.div>

          <motion.ul
            {...fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="mt-10 space-y-4 text-left"
          >
            {painPoints.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 px-5 py-5 text-base leading-7 text-slate-700 shadow-sm"
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-500" />
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="bg-[#f7f4ff] text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              A revenue-focused email system built across strategy, creative, and automation.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {solutionCards.map((card, index) => (
              <motion.article
                key={card.title}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                className="rounded-[28px] border border-purple-100 bg-white p-8 shadow-[0_20px_50px_rgba(88,28,135,0.08)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-purple-700">
                  {card.icon}
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-950">{card.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{card.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              A simple system: audit, build, scale.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {processSteps.map((step, index) => (
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
                <p className="mt-5 text-base leading-7 text-slate-600">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="pointer-events-none absolute -right-4 top-1/2 hidden h-0.5 w-8 -translate-y-1/2 bg-gradient-to-r from-purple-300 to-purple-500 lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,_#120a22_0%,_#090511_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Performance that stands out on the P&amp;L, not just in a dashboard.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-8"
              >
                <p className="text-5xl font-bold text-white sm:text-6xl">{stat.value}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f6f1ff] text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Flexible support across the email revenue stack.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.05 }}
                className="rounded-[28px] border border-purple-100 bg-white p-7 shadow-[0_18px_45px_rgba(88,28,135,0.08)]"
              >
                <h3 className="text-2xl font-bold text-slate-950">{service.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{service.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Feedback from brands that needed email to do more than just send.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.blockquote
                key={item.name}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-8"
              >
                <p className="text-lg leading-8 text-slate-700">“{item.quote}”</p>
                <footer className="mt-8">
                  <p className="text-base font-bold text-slate-950">{item.name}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-slate-500">{item.company}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,_rgba(196,181,253,0.25),_transparent_35%),linear-gradient(135deg,_#2e1065_0%,_#5b21b6_48%,_#0f172a_100%)]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to recover more revenue from your email channel?
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              If your list is valuable but your email performance is flat, we can rebuild the channel around conversion, retention, and scale.
            </p>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                Start the Conversation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
