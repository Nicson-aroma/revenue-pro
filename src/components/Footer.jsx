import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoImage from '../assets/new-logo.png';

const services = [
  'Email Campaigns',
  'Automation Flows',
  'Retention Strategy',
  'Email Audit',
];

const companyLinks = [
  { label: 'Home', path: '/' },
  { label: 'Case Studies', path: '/portfolio' },
  { label: 'About', path: '/services' },
  { label: 'Contact', path: '/contact' },
];

const socials = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter (X)', href: '#' },
  { label: 'Instagram', href: '#' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0F19] text-slate-200">
      {/* <section className="border-t border-white/8 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),_transparent_36%),linear-gradient(135deg,_#18112b_0%,_#0B0F19_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to Turn Your Email List Into Revenue?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Book a free audit and discover hidden revenue opportunities.
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-purple-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-purple-400"
              >
                Book a Free Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section> */}

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <Link to="/" className="inline-flex items-center">
                <img src={logoImage} alt="MailRevenuePro" className="h-14 w-auto" />
              </Link>
              <p className="mt-5 max-w-sm text-base leading-7 text-slate-400">
                We help eCommerce brands generate more revenue through high-converting email marketing.
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Trusted by growing brands worldwide
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              <h3 className="text-lg font-semibold text-white">Services</h3>
              <ul className="mt-5 space-y-3">
                {services.map((item) => (
                  <li key={item}>
                    <Link to="/services" className="text-slate-400 transition hover:text-white">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white">Company</h3>
              <ul className="mt-5 space-y-3">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.path} className="text-slate-400 transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <h3 className="text-lg font-semibold text-white">Contact</h3>
              <a
                href="mailto:hello@mailrevenuepro.com"
                className="mt-5 block text-slate-400 transition hover:text-white"
              >
                hello@mailrevenuepro.com
              </a>
              <div className="mt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-purple-400/30 bg-purple-500/10 px-6 py-3 text-sm font-semibold text-purple-200 transition hover:border-purple-300 hover:bg-purple-500/20 hover:text-white"
                >
                  Book a Call
                </Link>
              </div>
              <a
                href="#"
                className="mt-4 inline-block text-sm font-medium text-slate-500 transition hover:text-slate-300"
              >
                Calendly
              </a>
            </motion.div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/8 pt-8">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-400 transition hover:border-white/20 hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>{currentYear} MailRevenuePro. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
