import { useTranslation } from 'react-i18next'
import { Button, EmptyState } from '@/shared/ui'

interface DashboardErrorProps {
  onRetry: () => void
}

export function DashboardError({ onRetry }: DashboardErrorProps) {
  const { t } = useTranslation()

  return (
    <EmptyState
      title={t('dashboard.error.title')}
      description={t('dashboard.error.description')}
      action={
        <Button type="button" onClick={onRetry}>
          {t('common.retry')}
        </Button>
      }
    />
  )
}
