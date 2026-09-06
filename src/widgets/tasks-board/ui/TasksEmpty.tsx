import type { ReactNode } from 'react'
import { EmptyState } from '@/shared/ui'

interface TasksEmptyProps {
  hasFilters: boolean
  action?: ReactNode
}

export function TasksEmpty({ hasFilters, action }: TasksEmptyProps) {
  return (
    <EmptyState
      title="No tasks found."
      description={
        hasFilters
          ? 'Try changing your filters or create a new task.'
          : 'Create your first task to get started.'
      }
      action={action}
    />
  )
}
