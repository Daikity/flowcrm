import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/shared/ui'

export function ReportsEmpty() {
  const { t } = useTranslation()

  return (
    <EmptyState
      title={t('reports.empty.title')}
      description={t('reports.empty.description')}
    />
  )
}
