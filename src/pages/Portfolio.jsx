import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function PortfolioPage() {
  return (
    <main className="bg-[#0a0614] pt-16 text-white">
      <section className="bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.32),_transparent_35%),linear-gradient(135deg,_#090511_0%,_#140d26_52%,_#090511_100%)]">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <motion.div {...fadeUp}>
            <h1 className="font-['Space_Grotesk',sans-serif] text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Real Results. Real Revenue.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              See how we help eCommerce brands turn email into a major revenue channel.
            </p>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-purple-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(168,85,247,0.35)] transition hover:bg-purple-400"
              >
                Book a Free Audit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f4f0ff] text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight sm:text-5xl">
              Revenue outcomes that are easy to scan and hard to ignore.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {caseStudies.map((study, index) => (
              <motion.article
                key={study.slug}
                {...fadeUp}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                className="flex h-full flex-col rounded-[28px] border border-purple-100 bg-white p-8 shadow-[0_22px_55px_rgba(88,28,135,0.08)]"
              >
                <p className="text-5xl font-bold text-emerald-600">{study.result}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {study.resultLabel}
                </p>
                <h3 className="mt-6 text-2xl font-bold text-slate-950">{study.headline}</h3>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-purple-700">
                  {study.industry}
                </p>
                <p className="mt-4 flex-1 text-base leading-7 text-slate-600">{study.heroDescription}</p>
                <div className="mt-8">
                  <Link
                    to={`/portfolio/${study.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-purple-200 px-5 py-3 text-sm font-semibold text-purple-700 transition hover:border-purple-400 hover:bg-purple-50"
                  >
                    View Case Study
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
