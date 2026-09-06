import type { DashboardData } from '@/entities/dashboard'
import { activities } from './activities'
import { deals } from './deals'

export const dashboardData: DashboardData = {
  stats: {
    revenue: 284500,
    deals: 48,
    customers: 126,
    conversion: 24.8,
    revenueChange: 12.4,
    dealsChange: 8.2,
    customersChange: 14.6,
    conversionChange: 3.1,
  },

  revenue: [
    { date: 'Jan', revenue: 32000 },
    { date: 'Feb', revenue: 41000 },
    { date: 'Mar', revenue: 38000 },
    { date: 'Apr', revenue: 52000 },
    { date: 'May', revenue: 47000 },
    { date: 'Jun', revenue: 74500 },
  ],

  pipeline: [
    { stage: 'Lead', count: 18, value: 42000 },
    { stage: 'Qualified', count: 14, value: 68000 },
    { stage: 'Proposal', count: 9, value: 84000 },
    { stage: 'Negotiation', count: 5, value: 90500 },
    { stage: 'Won', count: 12, value: 156000 },
  ],

  recentDeals: [...deals]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5),

  recentActivity: [...activities]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5),
}
