import type { User } from '@/entities/user'
import {
  clearAuth,
  getAuthToken,
  getSessionUser,
  isAuthenticated as readIsAuthenticated,
  saveAuth,
  validateCredentials,
} from './authStorage'

/** Token that MSW auth probe treats as expired (tests / demo). */
export const FORCE_401_TOKEN = 'force-401'

let version = 0
const listeners = new Set<() => void>()

function emit() {
  version += 1
  listeners.forEach((listener) => listener())
}

/** Minimal subscription for React useSyncExternalStore — not a global auth store. */
export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getSnapshot() {
  return version
}

export function getServerSnapshot() {
  return 0
}

export function getToken() {
  return getAuthToken()
}

export function isAuthenticated() {
  return readIsAuthenticated()
}

export function getSession(): User | null {
  return getSessionUser()
}

export function login() {
  saveAuth()
  emit()
}

export function logout() {
  clearAuth()
  emit()
}

export { validateCredentials }
