import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui'
import { clearAuth } from '../model/authStorage'

export function LogoutButton() {
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
      Выйти
    </Button>
  )
}
