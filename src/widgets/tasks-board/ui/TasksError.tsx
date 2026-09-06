import { useTranslation } from 'react-i18next'
import { Button, EmptyState } from '@/shared/ui'

interface TasksErrorProps {
  onRetry: () => void
}

export function TasksError({ onRetry }: TasksErrorProps) {
  const { t } = useTranslation()

  return (
    <EmptyState
      title={t('common.error.title')}
      description={t('tasks.error.description')}
      action={
        <Button type="button" onClick={onRetry}>
          {t('common.retry')}
        </Button>
      }
    />
  )
}
