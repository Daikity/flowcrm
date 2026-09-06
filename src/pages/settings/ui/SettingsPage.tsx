import { useTranslation } from 'react-i18next'
import { Typography } from '@/shared/ui'

export function SettingsPage() {
  const { t } = useTranslation()

  return (
    <section className="space-y-2">
      <Typography variant="h1">{t('settings.title')}</Typography>
      <Typography muted>{t('settings.comingSoon')}</Typography>
    </section>
  )
}
