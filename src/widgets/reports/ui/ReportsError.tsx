import { useTranslation } from 'react-i18next'
import { Button, EmptyState } from '@/shared/ui'

interface ReportsErrorProps {
  onRetry: () => void
}

export function ReportsError({ onRetry }: ReportsErrorProps) {
  const { t } = useTranslation()

  return (
    <EmptyState
      title={t('reports.error.title')}
      description={t('reports.error.description')}
      action={
        <Button type="button" onClick={onRetry}>
          {t('common.retry')}
        </Button>
      }
    />
  )
}
