const revenuePriorityMap = {
  '$500K+ / month': 'high',
  '$100K to $500K / month': 'high',
  '$50K to $100K / month': 'medium',
  '$10K to $50K / month': 'medium',
  'Under $10K / month': 'low',
};

export function getLeadPriority(monthlyRevenue) {
  return revenuePriorityMap[monthlyRevenue] ?? 'low';
}
