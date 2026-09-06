import type { Task } from '@/entities/task'

export const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Prepare Nordic Soft proposal deck',
    description: 'Include pricing tiers and SLA options',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'user-2',
    dueDate: '2026-03-20',
    createdAt: '2026-03-01T10:00:00.000Z',
  },
  {
    id: 'task-2',
    title: 'Call Atlas Finance procurement',
    status: 'todo',
    priority: 'urgent',
    assigneeId: 'user-3',
    dueDate: '2026-03-12',
    createdAt: '2026-03-05T09:00:00.000Z',
  },
  {
    id: 'task-3',
    title: 'Send Helix Health NDA',
    status: 'completed',
    priority: 'medium',
    assigneeId: 'user-3',
    dueDate: '2026-03-08',
    createdAt: '2026-03-02T14:00:00.000Z',
  },
  {
    id: 'task-4',
    title: 'Quarterly forecast review',
    status: 'todo',
    priority: 'low',
    assigneeId: 'user-1',
    dueDate: '2026-03-25',
    createdAt: '2026-03-06T08:00:00.000Z',
  },
]
