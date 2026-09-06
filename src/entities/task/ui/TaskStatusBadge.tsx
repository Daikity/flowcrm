import { useTranslation } from 'react-i18next'
import { Badge } from '@/shared/ui'
import { TASK_STATUS_VARIANT } from '../model/constants'
import type { TaskStatus } from '../model/types'

interface TaskStatusBadgeProps {
  status: TaskStatus
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const { t } = useTranslation()

  return (
    <Badge variant={TASK_STATUS_VARIANT[status]}>
      {t(`enums.taskStatus.${status}`)}
    </Badge>
  )
}
