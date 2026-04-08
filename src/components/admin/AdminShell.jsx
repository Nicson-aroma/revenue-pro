import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { exportContactSubmissionsAsCsv, fetchContactSubmissions } from '../../lib/contactSubmissions';
import { getAdminSession, signOutAdmin, validateAdminSession } from '../../lib/adminAuth';
import { ADMIN_LAST_VISIT_KEY, getLeadStats, getLiveSinceOpenCount, getUnseenSinceLastVisitCount } from '../../lib/adminDashboard';

const navItems = [
  { label: 'Overview', path: '/admin/overview' },
  { label: 'Leads', path: '/admin/leads' },
  { label: 'Booked Calls', path: '/admin/booked' },
  { label: 'Settings', path: '/admin/settings' },
];

function SidebarLink({ label, active = false, onClick, to, tone = 'default' }) {
  const className = active
    ? 'border-cyan-400/30 bg-cyan-400/12 text-cyan-100'
    : tone === 'danger'
      ? 'border-rose-500/20 bg-rose-500/8 text-rose-100 hover:bg-rose-500/16'
      : 'border-white/8 bg-white/5 text-slate-200 hover:bg-white/10';

  const shared = `block w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${className}`;

  if (to) {
    return (
      <Link to={to} className={shared}>
        {label}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={shared}>
      {label}
    </button>
  );
}

export default function AdminShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const adminSession = getAdminSession();
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [previousVisitAt] = useState(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    return window.localStorage.getItem(ADMIN_LAST_VISIT_KEY) || '';
  });
  const [sessionStartedAt] = useState(() => new Date().toISOString());

  useEffect(() => {
    let cancelled = false;

    const loadAdminData = async () => {
      try {
        await validateAdminSession();
        const nextSubmissions = await fetchContactSubmissions();

        if (!cancelled) {
          setSubmissions(nextSubmissions);
          setError('');
        }
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        if (loadError.status === 401) {
          signOutAdmin();
          navigate('/admin/login', { replace: true });
          return;
        }

        setError(loadError.message);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadAdminData();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(ADMIN_LAST_VISIT_KEY, sessionStartedAt);
  }, [sessionStartedAt]);

  const stats = useMemo(() => getLeadStats(submissions), [submissions]);
  const unseenSinceLastVisitCount = useMemo(
    () => getUnseenSinceLastVisitCount(submissions, previousVisitAt),
    [previousVisitAt, submissions]
  );
  const liveSinceOpenCount = useMemo(
    () => getLiveSinceOpenCount(submissions, sessionStartedAt),
    [sessionStartedAt, submissions]
  );

  const handleExport = () => {
    const csv = exportContactSubmissionsAsCsv(submissions);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mailrevenuepro-leads.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAdminSignOut = () => {
    signOutAdmin();
    navigate('/admin/login', { replace: true });
  };

  const refreshSubmissions = async () => {
    const nextSubmissions = await fetchContactSubmissions();
    setSubmissions(nextSubmissions);
    return nextSubmissions;
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_25%),radial-gradient(circle_at_85%_10%,_rgba(244,114,182,0.14),_transparent_24%),linear-gradient(180deg,_#040816_0%,_#07111f_42%,_#0b1224_100%)] pt-24 text-white">
      <section className="mx-auto max-w-[1500px] px-4 pb-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="rounded-[34px] border border-white/10 bg-white/6 p-4 shadow-[0_30px_100px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-6"
        >
          <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
            <aside className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.94))] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">Admin navigation</p>
              <h2 className="mt-4 font-['Space_Grotesk',sans-serif] text-2xl font-bold text-white">Control Panel</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                CRM-style lead management with separate admin sections.
              </p>

              <div className="mt-6 space-y-3">
                {navItems.map((item) => (
                  <SidebarLink key={item.path} label={item.label} to={item.path} active={location.pathname === item.path} />
                ))}
              </div>

              <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Notifications</p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3">
                    <p className="text-2xl font-bold text-white">{unseenSinceLastVisitCount}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">New since last visit</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
                    <p className="text-2xl font-bold text-white">{liveSinceOpenCount}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">Arrived while open</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Quick actions</p>
                <div className="mt-4 space-y-3">
                  <SidebarLink label="Export All Leads" onClick={handleExport} />
                  <SidebarLink label="Sign Out" onClick={handleAdminSignOut} tone="danger" />
                </div>
              </div>

              {adminSession?.email ? (
                <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Session</p>
                  <p className="mt-3 text-sm font-semibold text-white">{adminSession.email}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">JWT session is active in this browser.</p>
                </div>
              ) : null}
            </aside>

            <div className="space-y-6">
              <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.94))] p-6">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">Admin workspace</p>
                    <h1 className="mt-4 font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      Retention Ops Admin
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                      Manage inbound leads, review booked calls, and keep admin controls organized by section.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
                      {unseenSinceLastVisitCount} new since last visit
                    </span>
                    {liveSinceOpenCount > 0 ? (
                      <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                        Live: {liveSinceOpenCount} arrived while open
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              {error ? (
                <div className="rounded-[24px] border border-rose-500/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100">
                  {error}
                </div>
              ) : null}

              {isLoading ? (
                <div className="rounded-[30px] border border-white/10 bg-white/5 px-6 py-12 text-center text-slate-300">
                  Loading admin data...
                </div>
              ) : (
                <Outlet context={{ submissions, stats, sessionStartedAt, refreshSubmissions }} />
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
