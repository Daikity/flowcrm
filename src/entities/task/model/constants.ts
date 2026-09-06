import type { TaskPriority, TaskStatus } from './types'

export const TASK_STATUSES: TaskStatus[] = ['todo', 'in_progress', 'completed']

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  completed: 'Completed',
}

export const TASK_STATUS_VARIANT: Record<
  TaskStatus,
  'neutral' | 'primary' | 'success' | 'warning' | 'danger'
> = {
  todo: 'neutral',
  in_progress: 'primary',
  completed: 'success',
}

export const TASK_PRIORITIES: TaskPriority[] = [
  'low',
  'medium',
  'high',
  'urgent',
]

export const TASK_PRIORITY_LABEL: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
}

export const TASK_PRIORITY_VARIANT: Record<
  TaskPriority,
  'neutral' | 'primary' | 'success' | 'warning' | 'danger'
> = {
  low: 'neutral',
  medium: 'primary',
  high: 'warning',
  urgent: 'danger',
}

/** Numeric weight for sorting by priority */
export const TASK_PRIORITY_WEIGHT: Record<TaskPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
  urgent: 4,
}
