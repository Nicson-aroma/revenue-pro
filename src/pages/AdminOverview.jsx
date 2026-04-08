import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { formatDateTime, statusClassMap, statusLabelMap } from '../lib/adminDashboard';

function StatCard({ label, value, detail, tone }) {
  const tones = {
    cyan: 'from-cyan-500/18 via-cyan-400/10 to-transparent',
    emerald: 'from-emerald-500/18 via-emerald-400/10 to-transparent',
    amber: 'from-amber-500/18 via-amber-400/10 to-transparent',
    rose: 'from-rose-500/18 via-rose-400/10 to-transparent',
  };

  return (
    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(7,11,24,0.88))] p-6 shadow-[0_18px_50px_rgba(2,6,23,0.35)]">
      <div className={`rounded-[22px] bg-gradient-to-br ${tones[tone]} p-5`}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</p>
        <p className="mt-4 text-4xl font-bold text-white">{value}</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
      </div>
    </div>
  );
}

export default function AdminOverview() {
  const { submissions, stats } = useOutletContext();
  const recentLeads = useMemo(() => submissions.slice(0, 5), [submissions]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-4">
        <StatCard label="Total leads" value={stats.total} detail="All public form submissions stored in MongoDB." tone="cyan" />
        <StatCard label="New" value={stats.newCount} detail="Fresh opportunities waiting for review." tone="amber" />
        <StatCard label="Qualified" value={stats.qualifiedCount} detail="Strong-fit leads worth active follow-up." tone="emerald" />
        <StatCard label="Booked + failed sends" value={`${stats.bookedCount} / ${stats.failedEmailCount}`} detail="Booked leads versus failed EmailJS deliveries." tone="rose" />
      </div>

      <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(2,6,23,0.94))] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Overview</p>
        <h2 className="mt-3 text-3xl font-bold text-white">Latest activity</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          A quick snapshot of the most recent lead movement without opening the full inbox.
        </p>

        <div className="mt-8 space-y-3">
          {recentLeads.length ? (
            recentLeads.map((lead) => (
              <div key={lead.id} className="rounded-[24px] border border-white/8 bg-white/5 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{lead.fullName}</p>
                    <p className="mt-1 text-sm text-slate-300">{lead.company || 'No company'} | {lead.email}</p>
                    <p className="mt-2 text-sm text-slate-400">{lead.selectedService}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusClassMap[lead.status]}`}>
                    {statusLabelMap[lead.status]}
                  </span>
                </div>
                <p className="mt-4 text-sm text-slate-400">{formatDateTime(lead.createdAt)}</p>
              </div>
            ))
          ) : (
            <div className="rounded-[24px] border border-dashed border-white/10 bg-white/4 px-6 py-12 text-center">
              <p className="text-lg font-semibold text-white">No lead activity yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
