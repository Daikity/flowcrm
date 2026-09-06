import { setAuthTokenGetter, setUnauthorizedHandler } from '@/shared/api/authBridge'
import { getToken, logout } from './session'

/** Wire shared/api auth bridge to session facade (call once from app). */
export function setupAuthBridge() {
  setAuthTokenGetter(getToken)
  setUnauthorizedHandler(logout)
}
