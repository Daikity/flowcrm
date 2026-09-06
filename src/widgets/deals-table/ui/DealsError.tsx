import { Button, EmptyState } from '@/shared/ui'

interface DealsErrorProps {
  onRetry: () => void
}

export function DealsError({ onRetry }: DealsErrorProps) {
  return (
    <EmptyState
      title="Something went wrong."
      description="Unable to load deals."
      action={
        <Button type="button" onClick={onRetry}>
          Try again
        </Button>
      }
    />
  )
}
