import {
  TASK_PRIORITIES,
  TASK_PRIORITY_LABEL,
  TASK_STATUS_LABEL,
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

const statusOptions = [
  { value: '', label: 'All statuses' },
  ...TASK_STATUSES.map((status) => ({
    value: status,
    label: TASK_STATUS_LABEL[status],
  })),
]

const priorityOptions = [
  { value: '', label: 'All priorities' },
  ...TASK_PRIORITIES.map((priority) => ({
    value: priority,
    label: TASK_PRIORITY_LABEL[priority],
  })),
]

const dueOptions: { value: TaskDueFilter | ''; label: string }[] = [
  { value: '', label: 'Any due date' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'today', label: 'Due today' },
  { value: 'week', label: 'This week' },
  { value: 'upcoming', label: 'Upcoming' },
]

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
  const assigneeOptions = [
    { value: '', label: 'All assignees' },
    ...users.map((user) => ({ value: user.id, label: user.name })),
  ]

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
