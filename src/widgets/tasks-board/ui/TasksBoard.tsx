import { useMemo } from 'react'
import type { TaskListItem } from '@/entities/task'
import type { User } from '@/entities/user'
import { Typography } from '@/shared/ui'
import { TaskCard } from './TaskCard'

type TaskSectionKey = 'overdue' | 'today' | 'upcoming' | 'completed'

const SECTION_ORDER: TaskSectionKey[] = [
  'overdue',
  'today',
  'upcoming',
  'completed',
]

const SECTION_LABEL: Record<TaskSectionKey, string> = {
  overdue: 'Overdue',
  today: 'Today',
  upcoming: 'Upcoming',
  completed: 'Completed',
}

interface TasksBoardProps {
  tasks: TaskListItem[]
  users: User[]
  onEdit: (task: TaskListItem) => void
}

function sectionForTask(task: TaskListItem, today: string): TaskSectionKey {
  if (task.status === 'completed') return 'completed'
  if (task.dueDate < today) return 'overdue'
  if (task.dueDate === today) return 'today'
  return 'upcoming'
}

export function TasksBoard({ tasks, users, onEdit }: TasksBoardProps) {
  const usersById = Object.fromEntries(users.map((user) => [user.id, user]))
  const today = new Date().toISOString().slice(0, 10)

  const sections = useMemo(() => {
    const grouped: Record<TaskSectionKey, TaskListItem[]> = {
      overdue: [],
      today: [],
      upcoming: [],
      completed: [],
    }

    for (const task of tasks) {
      grouped[sectionForTask(task, today)].push(task)
    }

    return SECTION_ORDER.filter((key) => grouped[key].length > 0).map(
      (key) => ({
        key,
        label: SECTION_LABEL[key],
        items: grouped[key],
      }),
    )
  }, [tasks, today])

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section key={section.key} className="space-y-3">
          <div className="flex items-baseline gap-2">
            <Typography variant="h2" className="text-lg">
              {section.label}
            </Typography>
            <span className="text-small text-text-secondary">
              {section.items.length}
            </span>
          </div>
          <div className="space-y-3">
            {section.items.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                assignee={usersById[task.assigneeId]}
                onEdit={onEdit}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
