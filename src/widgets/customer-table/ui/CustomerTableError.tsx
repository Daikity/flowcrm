import { Button, EmptyState } from '@/shared/ui'

interface CustomerTableErrorProps {
  onRetry: () => void
}

export function CustomerTableError({ onRetry }: CustomerTableErrorProps) {
  return (
    <EmptyState
      title="Something went wrong."
      description="Unable to load customers."
      action={
        <Button type="button" onClick={onRetry}>
          Try again
        </Button>
      }
    />
  )
}
