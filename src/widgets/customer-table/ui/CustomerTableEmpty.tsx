import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/shared/ui'

interface CustomerTableEmptyProps {
  hasFilters: boolean
  action?: ReactNode
}

export function CustomerTableEmpty({
  hasFilters,
  action,
}: CustomerTableEmptyProps) {
  const { t } = useTranslation()

  return (
    <EmptyState
      title={t('customers.empty.title')}
      description={
        hasFilters ? t('customers.empty.filtered') : t('customers.empty.default')
      }
      action={action}
    />
  )
}
