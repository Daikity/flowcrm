import {
  TASK_STATUS_LABEL,
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

const statusOptions = TASK_STATUSES.map((status) => ({
  value: status,
  label: TASK_STATUS_LABEL[status],
}))

export function ChangeTaskStatus({
  task,
  className,
  compact = true,
}: ChangeTaskStatusProps) {
  const [updateTask, { isLoading }] = useUpdateTaskMutation()

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
        label={`Change status for ${task.title}`}
      />
    </div>
  )
}
