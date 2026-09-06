import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui'
import { clearAuth } from '../model/authStorage'

export function LogoutButton() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        clearAuth()
        navigate('/', { replace: true })
      }}
    >
      {t('auth.logout')}
    </Button>
  )
}
