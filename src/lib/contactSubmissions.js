import { apiRequest } from './api';

export async function fetchContactSubmissions() {
  const data = await apiRequest('/leads');
  return data.leads;
}

export async function saveContactSubmission(formData, meta = {}) {
  const data = await apiRequest('/leads', {
    method: 'POST',
    body: JSON.stringify({
      ...formData,
      emailDeliveryStatus: meta.emailDeliveryStatus ?? 'sent',
    }),
  });

  return data.lead;
}

export async function updateContactSubmission(id, updates) {
  const data = await apiRequest(`/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });

  return data.lead;
}

export async function deleteContactSubmission(id) {
  await apiRequest(`/leads/${id}`, {
    method: 'DELETE',
  });
}

export function exportContactSubmissionsAsCsv(submissions) {
  const fields = [
    'createdAt',
    'status',
    'priority',
    'emailDeliveryStatus',
    'fullName',
    'email',
    'phone',
    'company',
    'monthlyRevenue',
    'businessType',
    'selectedService',
    'budget',
    'timeline',
    'preferredContact',
    'selectedDate',
    'selectedTime',
    'currentChallenges',
    'projectDetails',
    'notes',
  ];

  const escapeValue = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const rows = submissions.map((submission) => fields.map((field) => escapeValue(submission[field])).join(','));

  return [fields.join(','), ...rows].join('\n');
}
