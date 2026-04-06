import { motion } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getCaseStudyBySlug } from '../data/caseStudies';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <main className="bg-[#0a0614] pt-16 text-white">
      <section className="bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.3),_transparent_32%),linear-gradient(135deg,_#090511_0%,_#140d26_55%,_#090511_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <motion.div {...fadeUp} className="max-w-4xl">
            <Link to="/portfolio" className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-200 transition hover:text-white">
              Back to Case Studies
            </Link>
            <h1 className="mt-6 font-['Space_Grotesk',sans-serif] text-5xl font-bold tracking-tight text-white sm:text-6xl">
              {study.headline}
            </h1>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-purple-200">
              {study.client}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{study.heroDescription}</p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {study.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-8"
              >
                <p className={`text-5xl font-bold ${stat.value.includes('$') || stat.label.toLowerCase().includes('revenue') ? 'text-emerald-400' : 'text-white'}`}>
                  {stat.value}
                </p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-900">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              What was broken before the rebuild.
            </h2>
            <ul className="mt-8 space-y-4">
              {study.problems.map((problem) => (
                <li
                  key={problem}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 px-5 py-5 text-base leading-7 text-slate-700"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-500" />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
            className="rounded-[28px] border border-slate-200 bg-slate-50 p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              What Was Missing
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-700">{study.missing}</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f6f1ff] text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              What we implemented to change the revenue outcome.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {study.strategy.map((item, index) => (
              <motion.article
                key={item}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.05 }}
                className="rounded-[28px] border border-purple-100 bg-white p-7 shadow-[0_20px_50px_rgba(88,28,135,0.08)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-purple-600">
                  Strategy {index + 1}
                </p>
                <p className="mt-4 text-base leading-7 text-slate-700">{item}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Screens, flows, and performance visuals from the implementation.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {study.execution.map((item, index) => (
              <motion.article
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                className="overflow-hidden rounded-[30px] border border-slate-200 bg-slate-50"
              >
                <img src={item.image} alt={item.title} className="h-72 w-full object-cover object-top" />
                <div className="p-7">
                  <h3 className="text-2xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,_#120a22_0%,_#090511_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Big numbers, clear business impact.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {study.results.map((item, index) => (
              <motion.div
                key={item.label}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-8"
              >
                <p className={`text-5xl font-bold ${item.value.includes('$') || item.label.toLowerCase().includes('revenue') ? 'text-emerald-400' : 'text-white'}`}>
                  {item.value}
                </p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {study.beforeAfter.map((item, index) => (
              <motion.div
                key={item.label}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                className="rounded-[28px] border border-emerald-500/20 bg-emerald-500/8 p-8"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">{item.label}</p>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Before</p>
                    <p className="mt-2 text-2xl font-bold text-slate-200">{item.before}</p>
                  </div>
                  <p className="pb-1 text-xl font-bold text-emerald-400">→</p>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">After</p>
                    <p className="mt-2 text-2xl font-bold text-emerald-400">{item.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              What made the difference.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {study.takeaways.map((item, index) => (
              <motion.article
                key={item}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.05 }}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-8"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-purple-600">
                  Insight {index + 1}
                </p>
                <p className="mt-4 text-base leading-7 text-slate-700">{item}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,_rgba(196,181,253,0.25),_transparent_35%),linear-gradient(135deg,_#2e1065_0%,_#5b21b6_48%,_#0f172a_100%)]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Want similar results for your brand?
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              We build email systems that focus on revenue growth, retention, and measurable performance.
            </p>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
