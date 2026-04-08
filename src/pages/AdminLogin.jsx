import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isAdminAuthenticated, signInAdmin } from '../lib/adminAuth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const redirectTo = location.state?.from?.pathname || '/admin/overview';

  if (isAdminAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (error) {
      setError('');
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAdmin(formData.email, formData.password);
      navigate(redirectTo, { replace: true });
    } catch (signInError) {
      setError(signInError.message);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_25%),radial-gradient(circle_at_82%_12%,_rgba(168,85,247,0.18),_transparent_22%),linear-gradient(180deg,_#040816_0%,_#07111f_52%,_#0b1224_100%)] pt-24 text-white">
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Admin access</p>
            <h1 className="mt-4 font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Sign in to manage inbound leads.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              This protects the admin route with server-side credential checks and a browser-stored JWT session.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            className="rounded-[34px] border border-white/10 bg-white p-6 text-slate-900 shadow-[0_32px_100px_rgba(2,6,23,0.45)] sm:p-8"
          >
            <div className="rounded-[28px] bg-[linear-gradient(135deg,_#eff6ff_0%,_#f8fafc_48%,_#ecfeff_100%)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Secure entry</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">Admin sign in</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                After sign-in, the browser stores a JWT session token and routes you into the lead dashboard.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                    Admin email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="admin@admin.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Enter admin password"
                  />
                </div>

                {error ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-base font-semibold text-white transition hover:bg-cyan-700"
                >
                  Sign In to Admin
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
