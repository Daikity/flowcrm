import { TaskPriorityBadge, type TaskListItem } from '@/entities/task'
import { ChangeTaskStatus } from '@/features/task-change-status'
import type { User } from '@/entities/user'
import { formatDate } from '@/shared/lib'
import { Avatar, Typography } from '@/shared/ui'

interface TaskCardProps {
  task: TaskListItem
  assignee?: User
  onEdit: (task: TaskListItem) => void
}

function dueLabel(task: TaskListItem, today: string): string {
  if (task.dueDate === today) return 'Due today'
  if (task.isOverdue) return `Overdue · ${formatDate(task.dueDate)}`
  return formatDate(task.dueDate)
}

export function TaskCard({ task, assignee, onEdit }: TaskCardProps) {
  const today = new Date().toISOString().slice(0, 10)

  return (
    <article
      className={`rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary/40 ${
        task.isOverdue ? 'border-l-4 border-l-danger' : ''
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <button
          type="button"
          className="min-w-0 flex-1 text-left"
          onClick={() => onEdit(task)}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Typography variant="h3" className="text-base">
              {task.title}
            </Typography>
            <TaskPriorityBadge priority={task.priority} />
            <span
              className={`text-small ${
                task.isOverdue ? 'font-medium text-danger' : 'text-text-secondary'
              }`}
            >
              {dueLabel(task, today)}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-text-secondary">
            {task.customerName ? <span>{task.customerName}</span> : null}
            {task.dealTitle ? (
              <span className="truncate">{task.dealTitle}</span>
            ) : null}
            {assignee ? (
              <span className="inline-flex items-center gap-1.5">
                <Avatar name={assignee.name} src={assignee.avatar} size="sm" />
                {assignee.name}
              </span>
            ) : null}
          </div>

          {task.description ? (
            <p className="mt-2 line-clamp-2 text-small text-text-secondary">
              {task.description}
            </p>
          ) : null}
        </button>

        <div
          className="shrink-0"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          <ChangeTaskStatus task={task} />
        </div>
      </div>
    </article>
  )
}
