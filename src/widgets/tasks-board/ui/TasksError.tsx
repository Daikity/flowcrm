import { Button, EmptyState } from '@/shared/ui'

interface TasksErrorProps {
  onRetry: () => void
}

export function TasksError({ onRetry }: TasksErrorProps) {
  return (
    <EmptyState
      title="Something went wrong."
      description="Unable to load tasks."
      action={
        <Button type="button" onClick={onRetry}>
          Try again
        </Button>
      }
    />
  )
}
