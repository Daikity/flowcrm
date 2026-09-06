export type TaskStatus = 'todo' | 'in_progress' | 'completed'

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

/** Preset filter for due date relative to "today" */
export type TaskDueFilter = 'overdue' | 'today' | 'upcoming' | 'week'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId: string
  dueDate: string
  customerId?: string
  dealId?: string
  createdAt: string
}

/** Task enriched for list UI */
export interface TaskListItem extends Task {
  customerName?: string
  dealTitle?: string
  isOverdue: boolean
}

export interface TasksParams {
  page: number
  limit: number
  search?: string
  status?: TaskStatus
  priority?: TaskPriority
  assigneeId?: string
  due?: TaskDueFilter
  sortBy?: 'title' | 'dueDate' | 'priority' | 'status' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface TasksResponse {
  items: TaskListItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt'>

export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'createdAt'>>
