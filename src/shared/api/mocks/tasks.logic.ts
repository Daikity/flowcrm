import type {
  CreateTaskInput,
  Task,
  TaskDueFilter,
  TaskListItem,
  TaskPriority,
  TasksResponse,
  TaskStatus,
  UpdateTaskInput,
} from '@/entities/task'
import { TASK_PRIORITY_WEIGHT } from '@/entities/task'
import { customers } from './data/customers'
import { deals } from './data/deals'
import { setTasks, tasks } from './data/tasks'

export function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10)
}

export function enrichTask(task: Task, today = todayIsoDate()): TaskListItem {
  const customer = task.customerId
    ? customers.find((item) => item.id === task.customerId)
    : undefined
  const deal = task.dealId
    ? deals.find((item) => item.id === task.dealId)
    : undefined

  const isOverdue =
    task.status !== 'completed' && task.dueDate < today

  return {
    ...task,
    customerName: customer?.company,
    dealTitle: deal?.title,
    isOverdue,
  }
}

export function matchesDueFilter(
  task: Task,
  due: TaskDueFilter,
  today = todayIsoDate(),
): boolean {
  const dueDate = task.dueDate

  switch (due) {
    case 'overdue':
      return task.status !== 'completed' && dueDate < today
    case 'today':
      return dueDate === today
    case 'upcoming':
      return dueDate > today
    case 'week': {
      const end = new Date(`${today}T12:00:00`)
      end.setDate(end.getDate() + 7)
      const endIso = end.toISOString().slice(0, 10)
      return dueDate >= today && dueDate <= endIso
    }
    default:
      return true
  }
}

export function filterAndSortTasks(params: {
  search: string
  status: TaskStatus | null
  priority: TaskPriority | null
  assigneeId: string | null
  due: TaskDueFilter | null
  sortBy: string
  sortOrder: 'asc' | 'desc'
}): Task[] {
  let filtered = [...tasks]
  const today = todayIsoDate()

  if (params.search) {
    const q = params.search
    filtered = filtered.filter((task) => {
      const customer = task.customerId
        ? customers.find((item) => item.id === task.customerId)
        : undefined
      const deal = task.dealId
        ? deals.find((item) => item.id === task.dealId)
        : undefined

      return (
        task.title.toLowerCase().includes(q) ||
        (task.description?.toLowerCase().includes(q) ?? false) ||
        (customer?.company.toLowerCase().includes(q) ?? false) ||
        (customer?.name.toLowerCase().includes(q) ?? false) ||
        (deal?.title.toLowerCase().includes(q) ?? false)
      )
    })
  }

  if (params.status) {
    filtered = filtered.filter((task) => task.status === params.status)
  }

  if (params.priority) {
    filtered = filtered.filter((task) => task.priority === params.priority)
  }

  if (params.assigneeId) {
    filtered = filtered.filter((task) => task.assigneeId === params.assigneeId)
  }

  if (params.due) {
    filtered = filtered.filter((task) =>
      matchesDueFilter(task, params.due!, today),
    )
  }

  filtered.sort((a, b) => {
    const left = getTaskSortValue(a, params.sortBy)
    const right = getTaskSortValue(b, params.sortBy)

    if (left < right) return params.sortOrder === 'asc' ? -1 : 1
    if (left > right) return params.sortOrder === 'asc' ? 1 : -1
    return 0
  })

  return filtered
}

export function paginateTasks(
  filtered: Task[],
  page: number,
  limit: number,
): TasksResponse {
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * limit
  const today = todayIsoDate()
  const items = filtered
    .slice(start, start + limit)
    .map((task) => enrichTask(task, today))

  return {
    items,
    total,
    page: safePage,
    limit,
    totalPages,
  }
}

export function createTaskFromBody(body: CreateTaskInput): Task {
  return {
    id: `task-${Date.now()}`,
    title: body.title,
    description: body.description || undefined,
    status: body.status,
    priority: body.priority,
    assigneeId: body.assigneeId,
    dueDate: body.dueDate,
    customerId: body.customerId || undefined,
    dealId: body.dealId || undefined,
    createdAt: new Date().toISOString(),
  }
}

export function updateTaskAt(
  id: string,
  body: UpdateTaskInput,
): Task | null {
  const index = tasks.findIndex((item) => item.id === id)
  if (index === -1) return null

  const current = tasks[index]
  const updated: Task = {
    ...current,
    ...body,
    id: current.id,
    createdAt: current.createdAt,
    description:
      body.description !== undefined
        ? body.description || undefined
        : current.description,
    customerId:
      body.customerId !== undefined
        ? body.customerId || undefined
        : current.customerId,
    dealId:
      body.dealId !== undefined ? body.dealId || undefined : current.dealId,
  }

  const next = [...tasks]
  next[index] = updated
  setTasks(next)
  return updated
}

function getTaskSortValue(task: Task, sortBy: string) {
  switch (sortBy) {
    case 'title':
      return task.title.toLowerCase()
    case 'priority':
      return TASK_PRIORITY_WEIGHT[task.priority]
    case 'status':
      return task.status
    case 'dueDate':
      return task.dueDate
    case 'createdAt':
    default:
      return task.createdAt
  }
}
