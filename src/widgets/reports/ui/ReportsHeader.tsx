import { useTranslation } from 'react-i18next'
import { Typography } from '@/shared/ui'

export function ReportsHeader() {
  const { t } = useTranslation()

  return (
    <div className="space-y-1">
      <Typography variant="h1">{t('reports.title')}</Typography>
      <Typography muted>{t('reports.subtitle')}</Typography>
    </div>
  )
}
