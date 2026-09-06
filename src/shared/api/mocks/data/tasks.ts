import type { Task, TaskPriority, TaskStatus } from '@/entities/task'

const statuses: TaskStatus[] = ['todo', 'in_progress', 'completed']
const priorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent']
const customerIds = ['cust-1', 'cust-2', 'cust-3', 'cust-4', 'cust-5']
const dealIds = ['deal-1', 'deal-2', 'deal-3', 'deal-4', 'deal-5', 'deal-6']
const assigneeIds = ['user-1', 'user-2', 'user-3']

function isoDateOffset(days: number): string {
  const date = new Date()
  date.setHours(12, 0, 0, 0)
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

function buildSeedTasks(): Task[] {
  return [
    {
      id: 'task-1',
      title: 'Fix onboarding flow',
      description: 'Resolve signup drop-off on step 2',
      status: 'in_progress',
      priority: 'high',
      assigneeId: 'user-1',
      dueDate: isoDateOffset(0),
      customerId: 'cust-1',
      dealId: 'deal-1',
      createdAt: '2026-08-20T10:00:00.000Z',
    },
    {
      id: 'task-2',
      title: 'Prepare proposal',
      description: 'Draft pricing and scope for Atlas Finance',
      status: 'todo',
      priority: 'medium',
      assigneeId: 'user-2',
      dueDate: isoDateOffset(4),
      customerId: 'cust-2',
      dealId: 'deal-2',
      createdAt: '2026-08-22T12:00:00.000Z',
    },
    {
      id: 'task-3',
      title: 'Schedule discovery call',
      status: 'todo',
      priority: 'urgent',
      assigneeId: 'user-3',
      dueDate: isoDateOffset(-2),
      customerId: 'cust-3',
      dealId: 'deal-3',
      createdAt: '2026-08-18T09:00:00.000Z',
    },
    {
      id: 'task-4',
      title: 'Send contract for signature',
      status: 'completed',
      priority: 'high',
      assigneeId: 'user-2',
      dueDate: isoDateOffset(-5),
      customerId: 'cust-4',
      dealId: 'deal-4',
      createdAt: '2026-08-10T15:30:00.000Z',
    },
    {
      id: 'task-5',
      title: 'Update CRM notes',
      description: 'Sync meeting notes from last week',
      status: 'todo',
      priority: 'low',
      assigneeId: 'user-1',
      dueDate: isoDateOffset(1),
      customerId: 'cust-5',
      createdAt: '2026-08-25T08:20:00.000Z',
    },
    {
      id: 'task-6',
      title: 'Follow up on renewal',
      status: 'in_progress',
      priority: 'medium',
      assigneeId: 'user-2',
      dueDate: isoDateOffset(0),
      customerId: 'cust-1',
      dealId: 'deal-6',
      createdAt: '2026-08-28T11:00:00.000Z',
    },
  ]
}

const titles = [
  'Review pricing sheet',
  'Confirm stakeholder list',
  'Share demo recording',
  'Collect security questionnaire',
  'Book technical workshop',
  'Clarify success metrics',
  'Send case study pack',
  'Align on go-live date',
]

function buildGeneratedTasks(): Task[] {
  const generated: Task[] = []

  for (let i = 0; i < 24; i += 1) {
    const status = statuses[i % statuses.length]
    const priority = priorities[i % priorities.length]
    const dayOffset = (i % 14) - 5

    generated.push({
      id: `task-gen-${i + 1}`,
      title: `${titles[i % titles.length]} #${i + 1}`,
      description: i % 3 === 0 ? `Generated task notes #${i + 1}` : undefined,
      status,
      priority,
      assigneeId: assigneeIds[i % assigneeIds.length],
      dueDate: isoDateOffset(dayOffset),
      customerId: customerIds[i % customerIds.length],
      dealId: i % 2 === 0 ? dealIds[i % dealIds.length] : undefined,
      createdAt: new Date(Date.UTC(2026, 6, 1 + i)).toISOString(),
    })
  }

  return generated
}

function buildAllTasks(): Task[] {
  return [...buildSeedTasks(), ...buildGeneratedTasks()]
}

export let tasks: Task[] = buildAllTasks()

export function resetTasks() {
  tasks = buildAllTasks()
}

export function setTasks(next: Task[]) {
  tasks = next
}
