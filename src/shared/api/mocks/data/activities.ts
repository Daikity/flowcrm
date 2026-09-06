import type { Activity } from '@/entities/activity'

export const activities: Activity[] = [
  {
    id: 'act-1',
    type: 'deal_won',
    message: 'Deal “Urban Retail — POS integration” marked as won',
    userId: 'user-2',
    entityId: 'deal-4',
    createdAt: '2026-03-01T16:00:00.000Z',
  },
  {
    id: 'act-2',
    type: 'deal_created',
    message: 'New deal “SteelForm — Maintenance renewal” created',
    userId: 'user-1',
    entityId: 'deal-5',
    createdAt: '2026-03-01T08:25:00.000Z',
  },
  {
    id: 'act-3',
    type: 'task_completed',
    message: 'Task “Send Helix Health NDA” completed',
    userId: 'user-3',
    entityId: 'task-3',
    createdAt: '2026-03-08T11:10:00.000Z',
  },
  {
    id: 'act-4',
    type: 'customer_created',
    message: 'Customer “Sofia Mendes / Helix Health” added',
    userId: 'user-3',
    entityId: 'cust-3',
    createdAt: '2026-01-18T14:20:00.000Z',
  },
  {
    id: 'act-5',
    type: 'note_updated',
    message: 'Note updated on Nordic Soft enterprise license',
    userId: 'user-2',
    entityId: 'deal-1',
    createdAt: '2026-03-07T13:40:00.000Z',
  },
]
