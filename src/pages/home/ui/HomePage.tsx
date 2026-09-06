import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { env } from '@/shared/config'
import { Button, Typography } from '@/shared/ui'

export function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="flex max-w-lg flex-col items-center gap-6 text-center">
        <Typography variant="display">{env.appName}</Typography>
        <Typography muted>{t('home.tagline')}</Typography>
        <Button size="lg" onClick={() => navigate('/login')}>
          {t('home.signIn')}
        </Button>
      </div>
    </div>
  )
}
