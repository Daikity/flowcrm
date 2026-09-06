import { useTranslation } from 'react-i18next'
import { Button, EmptyState } from '@/shared/ui'

interface DealsErrorProps {
  onRetry: () => void
}

export function DealsError({ onRetry }: DealsErrorProps) {
  const { t } = useTranslation()

  return (
    <EmptyState
      title={t('common.error.title')}
      description={t('deals.error.description')}
      action={
        <Button type="button" onClick={onRetry}>
          {t('common.retry')}
        </Button>
      }
    />
  )
}
