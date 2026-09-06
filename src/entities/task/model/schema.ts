import { z } from 'zod'
import { TASK_PRIORITIES, TASK_STATUSES } from './constants'
import type { TaskPriority, TaskStatus } from './types'

const statusEnum = z.enum(TASK_STATUSES as [TaskStatus, ...TaskStatus[]])
const priorityEnum = z.enum(
  TASK_PRIORITIES as [TaskPriority, ...TaskPriority[]],
)

export const taskFormSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().optional(),
  status: statusEnum,
  priority: priorityEnum,
  assigneeId: z.string().min(1, 'Assignee is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  customerId: z.string().optional(),
  dealId: z.string().optional(),
})

export type TaskFormValues = z.infer<typeof taskFormSchema>
