import { useTranslation } from 'react-i18next'
import { Typography } from '@/shared/ui'

export function DashboardHeader() {
  const { t } = useTranslation()

  return (
    <div className="space-y-1">
      <Typography variant="h1">{t('dashboard.title')}</Typography>
      <Typography muted>{t('dashboard.subtitle')}</Typography>
    </div>
  )
}
