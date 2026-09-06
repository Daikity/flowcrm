import { useTranslation } from 'react-i18next'
import { Badge } from '@/shared/ui'
import { TASK_PRIORITY_VARIANT } from '../model/constants'
import type { TaskPriority } from '../model/types'

interface TaskPriorityBadgeProps {
  priority: TaskPriority
}

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  const { t } = useTranslation()

  return (
    <Badge variant={TASK_PRIORITY_VARIANT[priority]}>
      {t(`enums.taskPriority.${priority}`)}
    </Badge>
  )
}
