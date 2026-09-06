import { Button, EmptyState } from '@/shared/ui'

interface ReportsErrorProps {
  onRetry: () => void
}

export function ReportsError({ onRetry }: ReportsErrorProps) {
  return (
    <EmptyState
      title="Не удалось загрузить reports"
      description="Проверьте соединение или попробуйте ещё раз."
      action={
        <Button type="button" onClick={onRetry}>
          Повторить
        </Button>
      }
    />
  )
}
