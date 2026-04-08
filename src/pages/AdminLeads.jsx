import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { deleteContactSubmission, updateContactSubmission } from '../lib/contactSubmissions';
import { formatDateTime, priorityClassMap, statusClassMap, statusLabelMap } from '../lib/adminDashboard';

const statusOptions = ['all', 'new', 'in_review', 'qualified', 'booked', 'archived'];
const editableStatusOptions = statusOptions.filter((option) => option !== 'all');
const priorityOrder = { high: 3, medium: 2, low: 1 };

function DetailRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/6 bg-slate-950/30 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-200">{value || 'Not provided'}</p>
    </div>
  );
}

export default function AdminLeads() {
  const { submissions, sessionStartedAt, refreshSubmissions } = useOutletContext();
  const [statusFilter, setStatusFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const filteredSubmissions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return submissions
      .filter((submission) => (statusFilter === 'all' ? true : submission.status === statusFilter))
      .filter((submission) => {
        if (!normalizedQuery) {
          return true;
        }

        return [
          submission.fullName,
          submission.email,
          submission.company,
          submission.selectedService,
          submission.businessType,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .sort((a, b) => {
        const priorityDelta = (priorityOrder[b.priority] ?? 0) - (priorityOrder[a.priority] ?? 0);
        if (priorityDelta !== 0) {
          return priorityDelta;
        }

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [query, statusFilter, submissions]);

  const selectedLead =
    filteredSubmissions.find((submission) => submission.id === selectedId) ??
    submissions.find((submission) => submission.id === selectedId) ??
    null;
  const activeLead = selectedLead ?? filteredSubmissions[0] ?? null;

  const handleStatusChange = async (nextStatus) => {
    if (!activeLead) {
      return;
    }

    await updateContactSubmission(activeLead.id, { status: nextStatus });
    await refreshSubmissions();
  };

  const handleNotesSave = async (nextNotes) => {
    if (!activeLead) {
      return;
    }

    if ((activeLead.notes || '') === nextNotes) {
      return;
    }

    await updateContactSubmission(activeLead.id, { notes: nextNotes });
    await refreshSubmissions();
  };

  const handleDelete = async () => {
    if (!activeLead) {
      return;
    }

    const confirmed = window.confirm(`Delete submission from ${activeLead.fullName}?`);
    if (!confirmed) {
      return;
    }

    await deleteContactSubmission(activeLead.id);
    await refreshSubmissions();
    setSelectedId('');
  };

  return (
    <div className="grid gap-6 2xl:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-[30px] border border-white/10 bg-slate-950/45 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, company, email, service..."
            className="min-w-[240px] flex-1 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
          />
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => {
              const active = statusFilter === option;
              const optionCount =
                option === 'all'
                  ? filteredSubmissions.length
                  : filteredSubmissions.filter((submission) => submission.status === option).length;
              return (
                <button
                  key={option}
                  onClick={() => setStatusFilter(option)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                    active
                      ? 'bg-cyan-400 text-slate-950'
                      : 'border border-white/10 bg-white/6 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {statusLabelMap[option]} ({optionCount})
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {filteredSubmissions.length ? (
            filteredSubmissions.map((submission) => (
              <button
                key={submission.id}
                onClick={() => setSelectedId(submission.id)}
                className={`w-full rounded-[24px] border p-4 text-left transition ${
                  activeLead?.id === submission.id
                    ? 'border-cyan-400/50 bg-cyan-400/10 shadow-[0_18px_40px_rgba(34,211,238,0.12)]'
                    : 'border-white/8 bg-white/5 hover:border-white/16 hover:bg-white/8'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{submission.fullName}</p>
                    <p className="mt-1 text-sm text-slate-300">{submission.company || 'No company'}</p>
                    <p className="mt-1 text-sm text-slate-400">{submission.email}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {new Date(submission.createdAt).getTime() > new Date(sessionStartedAt).getTime() ? (
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                        New
                      </span>
                    ) : null}
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusClassMap[submission.status]}`}>
                      {statusLabelMap[submission.status]}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${priorityClassMap[submission.priority]}`}>
                      {submission.priority}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
                  <span>{submission.selectedService}</span>
                  <span>{formatDateTime(submission.createdAt)}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-white/4 px-6 py-12 text-center">
              <p className="text-lg font-semibold text-white">No submissions match this view.</p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(2,6,23,0.94))] p-6">
        {activeLead ? (
          <>
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Lead detail</p>
                <h2 className="mt-3 text-3xl font-bold text-white">{activeLead.fullName}</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Submitted {formatDateTime(activeLead.createdAt)} | Updated {formatDateTime(activeLead.updatedAt)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusClassMap[activeLead.status]}`}>
                  {statusLabelMap[activeLead.status]}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${priorityClassMap[activeLead.priority]}`}>
                  {activeLead.priority} priority
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <DetailRow label="Company" value={activeLead.company} />
              <DetailRow label="Work email" value={activeLead.email} />
              <DetailRow label="Phone" value={activeLead.phone} />
              <DetailRow label="Preferred contact" value={activeLead.preferredContact} />
              <DetailRow label="Revenue" value={activeLead.monthlyRevenue} />
              <DetailRow label="Business type" value={activeLead.businessType} />
              <DetailRow label="Service focus" value={activeLead.selectedService} />
              <DetailRow label="Budget / timeline" value={`${activeLead.budget || 'Not set'} / ${activeLead.timeline || 'Not set'}`} />
              <DetailRow label="Requested date" value={activeLead.selectedDate} />
              <DetailRow label="Requested time" value={activeLead.selectedTime} />
            </div>

            <div className="mt-4 grid gap-4">
              <DetailRow label="Current challenges" value={activeLead.currentChallenges} />
              <DetailRow label="Project details" value={activeLead.projectDetails} />
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[0.72fr_1fr]">
              <div className="rounded-[26px] border border-white/10 bg-white/4 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Pipeline status</p>
                <div className="mt-4 grid gap-2">
                  {editableStatusOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleStatusChange(option)}
                      className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                        activeLead.status === option
                          ? 'bg-cyan-400 text-slate-950'
                          : 'border border-white/10 bg-white/6 text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      {statusLabelMap[option]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/4 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Internal notes</p>
                  <button
                    onClick={handleDelete}
                    className="rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-200 transition hover:bg-rose-500/20"
                  >
                    Delete lead
                  </button>
                </div>
                <textarea
                  key={activeLead.id}
                  defaultValue={activeLead.notes || ''}
                  onBlur={(event) => handleNotesSave(event.target.value)}
                  placeholder="Add follow-up context, owner notes, pricing fit, or call prep..."
                  className="mt-4 min-h-[190px] w-full rounded-[22px] border border-white/10 bg-slate-950/50 px-4 py-4 text-sm leading-7 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex min-h-[520px] items-center justify-center rounded-[26px] border border-dashed border-white/10 bg-white/4 px-6 text-center">
            <div>
              <p className="text-2xl font-bold text-white">No lead selected</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
