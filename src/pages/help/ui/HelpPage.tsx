import { useTranslation } from 'react-i18next'
import { Typography } from '@/shared/ui'

export function HelpPage() {
  const { t } = useTranslation()

  return (
    <section className="space-y-2">
      <Typography variant="h1">{t('help.title')}</Typography>
      <Typography muted>{t('help.subtitle')}</Typography>
    </section>
  )
}
