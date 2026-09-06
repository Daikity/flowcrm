const LOGIN_KEY = 'login'
const PASSWORD_KEY = 'password'

export const DEMO_CREDENTIALS = {
  login: 'admin',
  password: 'admin',
} as const

export function isAuthenticated() {
  const login = localStorage.getItem(LOGIN_KEY)
  const password = localStorage.getItem(PASSWORD_KEY)
  return Boolean(login && password)
}

export function saveAuth(login: string, password: string) {
  localStorage.setItem(LOGIN_KEY, login)
  localStorage.setItem(PASSWORD_KEY, password)
}

export function clearAuth() {
  localStorage.removeItem(LOGIN_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

export function validateCredentials(login: string, password: string) {
  return (
    login === DEMO_CREDENTIALS.login && password === DEMO_CREDENTIALS.password
  )
}
