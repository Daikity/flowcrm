import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/shared/ui'

export function DashboardEmpty() {
  const { t } = useTranslation()

  return (
    <EmptyState
      title={t('dashboard.empty.title')}
      description={t('dashboard.empty.description')}
    />
  )
}
