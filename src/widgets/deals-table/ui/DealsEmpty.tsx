import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/shared/ui'

interface DealsEmptyProps {
  hasFilters: boolean
  action?: ReactNode
}

export function DealsEmpty({ hasFilters, action }: DealsEmptyProps) {
  const { t } = useTranslation()

  return (
    <EmptyState
      title={t('deals.empty.title')}
      description={
        hasFilters ? t('deals.empty.filtered') : t('deals.empty.default')
      }
      action={action}
    />
  )
}
