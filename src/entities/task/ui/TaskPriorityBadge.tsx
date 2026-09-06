import { Badge } from '@/shared/ui'
import { TASK_PRIORITY_LABEL, TASK_PRIORITY_VARIANT } from '../model/constants'
import type { TaskPriority } from '../model/types'

interface TaskPriorityBadgeProps {
  priority: TaskPriority
}

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  return (
    <Badge variant={TASK_PRIORITY_VARIANT[priority]}>
      {TASK_PRIORITY_LABEL[priority]}
    </Badge>
  )
}
