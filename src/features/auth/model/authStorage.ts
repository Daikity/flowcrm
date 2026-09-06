import type { User } from '@/entities/user'

const TOKEN_KEY = 'flowcrm_auth_token'
const USER_KEY = 'flowcrm_auth_user'
/** Legacy keys — удаляем при save/clear, пароль больше не храним */
const LEGACY_LOGIN_KEY = 'login'
const LEGACY_PASSWORD_KEY = 'password'

export const DEMO_CREDENTIALS = {
  login: 'admin',
  password: 'admin',
} as const

/** Демо-пользователь после успешного входа */
export const DEMO_USER: User = {
  id: 'user-1',
  name: 'Igor Edison',
  email: 'igor@flowcrm.app',
  role: 'admin',
}

function clearLegacyAuth() {
  localStorage.removeItem(LEGACY_LOGIN_KEY)
  localStorage.removeItem(LEGACY_PASSWORD_KEY)
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY))
}

export function getSessionUser(): User | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function saveAuth() {
  clearLegacyAuth()
  const token = `demo-${Date.now()}`
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(DEMO_USER))
}

export function clearAuth() {
  clearLegacyAuth()
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function validateCredentials(login: string, password: string) {
  return (
    login === DEMO_CREDENTIALS.login && password === DEMO_CREDENTIALS.password
  )
}
