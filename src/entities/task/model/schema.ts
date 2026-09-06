import type { TFunction } from 'i18next'
import { z } from 'zod'
import { TASK_PRIORITIES, TASK_STATUSES } from './constants'
import type { TaskPriority, TaskStatus } from './types'

const statusEnum = z.enum(TASK_STATUSES as [TaskStatus, ...TaskStatus[]])
const priorityEnum = z.enum(
  TASK_PRIORITIES as [TaskPriority, ...TaskPriority[]],
)

export function createTaskSchema(t: TFunction) {
  return z.object({
    title: z.string().min(2, t('validation.task.titleRequired')),
    description: z.string().optional(),
    status: statusEnum,
    priority: priorityEnum,
    assigneeId: z.string().min(1, t('validation.task.assigneeRequired')),
    dueDate: z.string().min(1, t('validation.task.dueDateRequired')),
    customerId: z.string().optional(),
    dealId: z.string().optional(),
  })
}

export type TaskFormValues = z.infer<ReturnType<typeof createTaskSchema>>
