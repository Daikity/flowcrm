import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  TASK_STATUSES,
  type TaskListItem,
  type TaskStatus,
} from '@/entities/task'
import { useUpdateTaskMutation } from '@/shared/api'
import { Select } from '@/shared/ui'

interface ChangeTaskStatusProps {
  task: TaskListItem
  className?: string
  compact?: boolean
}

export function ChangeTaskStatus({
  task,
  className,
  compact = true,
}: ChangeTaskStatusProps) {
  const { t } = useTranslation()
  const [updateTask, { isLoading }] = useUpdateTaskMutation()

  const statusOptions = useMemo(
    () =>
      TASK_STATUSES.map((status) => ({
        value: status,
        label: t(`enums.taskStatus.${status}`),
      })),
    [t],
  )

  async function handleChange(value: string) {
    const status = value as TaskStatus
    if (status === task.status) return

    try {
      await updateTask({
        id: task.id,
        data: { status },
      }).unwrap()
    } catch {
      // UI stays on current status from cache on error
    }
  }

  return (
    <div className={compact ? '[&_label]:sr-only' : undefined}>
      <Select
        options={statusOptions}
        value={task.status}
        onChange={(value) => void handleChange(value)}
        disabled={isLoading}
        className={className ?? 'w-36'}
        label={t('tasks.changeStatus.aria', { title: task.title })}
      />
    </div>
  )
}
