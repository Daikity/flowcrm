import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui'
import { logout } from '../model/session'

export function LogoutButton() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        logout()
        navigate('/', { replace: true })
      }}
    >
      {t('auth.logout')}
    </Button>
  )
}
