import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { formatDateTime, priorityClassMap } from '../lib/adminDashboard';

export default function AdminBooked() {
  const { submissions } = useOutletContext();
  const bookedLeads = useMemo(() => submissions.filter((submission) => submission.status === 'booked'), [submissions]);

  return (
    <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(2,6,23,0.94))] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Booked Calls</p>
      <h2 className="mt-3 text-3xl font-bold text-white">Scheduled leads</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
        Leads that have been moved into the booked stage for active follow-up or call prep.
      </p>

      <div className="mt-8 space-y-3">
        {bookedLeads.length ? (
          bookedLeads.map((lead) => (
            <div key={lead.id} className="rounded-[24px] border border-white/8 bg-white/5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-white">{lead.fullName}</p>
                  <p className="mt-1 text-sm text-slate-300">{lead.company || 'No company'} | {lead.email}</p>
                  <p className="mt-2 text-sm text-slate-400">{lead.selectedDate} at {lead.selectedTime}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${priorityClassMap[lead.priority]}`}>
                  {lead.priority}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-400">Booked record updated {formatDateTime(lead.updatedAt)}</p>
            </div>
          ))
        ) : (
          <div className="rounded-[24px] border border-dashed border-white/10 bg-white/4 px-6 py-12 text-center">
            <p className="text-lg font-semibold text-white">No booked calls yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
