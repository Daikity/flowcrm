import { Badge } from '@/shared/ui'
import { TASK_STATUS_LABEL, TASK_STATUS_VARIANT } from '../model/constants'
import type { TaskStatus } from '../model/types'

interface TaskStatusBadgeProps {
  status: TaskStatus
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  return (
    <Badge variant={TASK_STATUS_VARIANT[status]}>
      {TASK_STATUS_LABEL[status]}
    </Badge>
  )
}
