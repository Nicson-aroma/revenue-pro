export const ADMIN_LAST_VISIT_KEY = 'mrp_admin_leads_last_visit';

export const statusLabelMap = {
  all: 'All Leads',
  new: 'New',
  in_review: 'In Review',
  qualified: 'Qualified',
  booked: 'Booked',
  archived: 'Archived',
};

export const statusClassMap = {
  new: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100',
  in_review: 'border-amber-400/20 bg-amber-400/10 text-amber-100',
  qualified: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100',
  booked: 'border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-100',
  archived: 'border-slate-400/20 bg-slate-400/10 text-slate-200',
};

export const priorityClassMap = {
  high: 'bg-rose-500/15 text-rose-200 border border-rose-500/30',
  medium: 'bg-amber-500/15 text-amber-200 border border-amber-500/30',
  low: 'bg-slate-500/15 text-slate-200 border border-slate-500/30',
};

export function formatDateTime(value) {
  if (!value) {
    return 'Unknown';
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function getLeadStats(submissions) {
  const total = submissions.length;
  const newCount = submissions.filter((submission) => submission.status === 'new').length;
  const qualifiedCount = submissions.filter((submission) => submission.status === 'qualified').length;
  const bookedCount = submissions.filter((submission) => submission.status === 'booked').length;
  const failedEmailCount = submissions.filter((submission) => submission.emailDeliveryStatus === 'failed').length;

  return { total, newCount, qualifiedCount, bookedCount, failedEmailCount };
}

export function getUnseenSinceLastVisitCount(submissions, previousVisitAt) {
  if (!previousVisitAt) {
    return submissions.length;
  }

  const lastVisitTime = new Date(previousVisitAt).getTime();
  return submissions.filter((submission) => new Date(submission.createdAt).getTime() > lastVisitTime).length;
}

export function getLiveSinceOpenCount(submissions, sessionStartedAt) {
  const sessionStartTime = new Date(sessionStartedAt).getTime();
  return submissions.filter((submission) => new Date(submission.createdAt).getTime() > sessionStartTime).length;
}

export function getBookedSubmissions(submissions) {
  return submissions.filter((submission) => submission.status === 'booked');
}

