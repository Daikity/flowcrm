import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type TaskDueFilter,
  type TaskPriority,
  type TaskStatus,
} from '@/entities/task'
import type { User } from '@/entities/user'
import { Select } from '@/shared/ui'

interface TaskFiltersProps {
  status?: TaskStatus | ''
  priority?: TaskPriority | ''
  assigneeId?: string
  due?: TaskDueFilter | ''
  users: User[]
  onStatusChange: (value: TaskStatus | '') => void
  onPriorityChange: (value: TaskPriority | '') => void
  onAssigneeChange: (value: string) => void
  onDueChange: (value: TaskDueFilter | '') => void
}

export function TaskFilters({
  status = '',
  priority = '',
  assigneeId = '',
  due = '',
  users,
  onStatusChange,
  onPriorityChange,
  onAssigneeChange,
  onDueChange,
}: TaskFiltersProps) {
  const { t } = useTranslation()

  const statusOptions = useMemo(
    () => [
      { value: '', label: t('tasks.filters.allStatuses') },
      ...TASK_STATUSES.map((item) => ({
        value: item,
        label: t(`enums.taskStatus.${item}`),
      })),
    ],
    [t],
  )

  const priorityOptions = useMemo(
    () => [
      { value: '', label: t('tasks.filters.allPriorities') },
      ...TASK_PRIORITIES.map((item) => ({
        value: item,
        label: t(`enums.taskPriority.${item}`),
      })),
    ],
    [t],
  )

  const dueOptions = useMemo(
    () => [
      { value: '', label: t('tasks.filters.due.any') },
      { value: 'overdue', label: t('tasks.filters.due.overdue') },
      { value: 'today', label: t('tasks.filters.due.today') },
      { value: 'week', label: t('tasks.filters.due.thisWeek') },
      { value: 'upcoming', label: t('tasks.filters.due.upcoming') },
    ],
    [t],
  )

  const assigneeOptions = useMemo(
    () => [
      { value: '', label: t('tasks.filters.allAssignees') },
      ...users.map((user) => ({ value: user.id, label: user.name })),
    ],
    [t, users],
  )

  return (
    <div className="flex flex-wrap gap-2">
      <Select
        options={statusOptions}
        value={status}
        onChange={(value) => onStatusChange(value as TaskStatus | '')}
        className="w-40"
      />
      <Select
        options={priorityOptions}
        value={priority}
        onChange={(value) => onPriorityChange(value as TaskPriority | '')}
        className="w-40"
      />
      <Select
        options={assigneeOptions}
        value={assigneeId}
        onChange={onAssigneeChange}
        className="w-44"
      />
      <Select
        options={dueOptions}
        value={due}
        onChange={(value) => onDueChange(value as TaskDueFilter | '')}
        className="w-40"
      />
    </div>
  )
}
