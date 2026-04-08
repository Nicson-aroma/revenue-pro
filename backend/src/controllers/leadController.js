import { Lead } from '../models/Lead.js';
import { getLeadPriority } from '../utils/leadPriority.js';

function validateLeadPayload(payload) {
  const requiredFields = [
    'selectedDate',
    'selectedTime',
    'fullName',
    'email',
    'company',
    'monthlyRevenue',
    'businessType',
    'selectedService',
    'currentChallenges',
    'projectDetails',
  ];

  for (const field of requiredFields) {
    const value = payload[field];
    if (typeof value !== 'string' || !value.trim()) {
      return `${field} is required.`;
    }
  }

  return null;
}

export async function createLead(req, res) {
  const validationError = validateLeadPayload(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const lead = await Lead.create({
    ...req.body,
    email: req.body.email.trim().toLowerCase(),
    priority: getLeadPriority(req.body.monthlyRevenue),
  });

  res.status(201).json({ lead: lead.toJSON() });
}

export async function getLeads(_req, res) {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json({ leads: leads.map((lead) => lead.toJSON()) });
}

export async function updateLead(req, res) {
  const allowedFields = [
    'status',
    'notes',
    'selectedDate',
    'selectedTime',
    'budget',
    'timeline',
    'preferredContact',
    'emailDeliveryStatus',
  ];

  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
  );

  const lead = await Lead.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!lead) {
    return res.status(404).json({ message: 'Lead not found.' });
  }

  res.json({ lead: lead.toJSON() });
}

export async function deleteLead(req, res) {
  const lead = await Lead.findByIdAndDelete(req.params.id);

  if (!lead) {
    return res.status(404).json({ message: 'Lead not found.' });
  }

  res.status(204).send();
}
