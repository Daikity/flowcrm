import { useTranslation } from 'react-i18next'
import { Button, EmptyState } from '@/shared/ui'

interface CustomerTableErrorProps {
  onRetry: () => void
}

export function CustomerTableError({ onRetry }: CustomerTableErrorProps) {
  const { t } = useTranslation()

  return (
    <EmptyState
      title={t('common.error.title')}
      description={t('customers.error.description')}
      action={
        <Button type="button" onClick={onRetry}>
          {t('common.retry')}
        </Button>
      }
    />
  )
}
