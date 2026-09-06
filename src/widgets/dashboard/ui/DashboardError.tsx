import { Button, EmptyState } from '@/shared/ui'

interface DashboardErrorProps {
  onRetry: () => void
}

export function DashboardError({ onRetry }: DashboardErrorProps) {
  return (
    <EmptyState
      title="Не удалось загрузить dashboard"
      description="Проверьте соединение или попробуйте ещё раз."
      action={
        <Button type="button" onClick={onRetry}>
          Повторить
        </Button>
      }
    />
  )
}
