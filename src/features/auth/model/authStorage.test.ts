import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearAuth,
  DEMO_USER,
  getSessionUser,
  isAuthenticated,
  saveAuth,
  validateCredentials,
} from './authStorage'

describe('authStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('validates demo credentials', () => {
    expect(validateCredentials('admin', 'admin')).toBe(true)
    expect(validateCredentials('admin', 'wrong')).toBe(false)
  })

  it('saves token and user without storing password', () => {
    saveAuth()

    expect(isAuthenticated()).toBe(true)
    expect(getSessionUser()).toEqual(DEMO_USER)
    expect(localStorage.getItem('password')).toBeNull()
    expect(localStorage.getItem('login')).toBeNull()
    expect(localStorage.getItem('flowcrm_auth_token')).toBeTruthy()
  })

  it('does not treat legacy login/password as authenticated', () => {
    localStorage.setItem('login', 'admin')
    localStorage.setItem('password', 'admin')

    expect(isAuthenticated()).toBe(false)
  })

  it('clears session on logout', () => {
    saveAuth()
    clearAuth()

    expect(isAuthenticated()).toBe(false)
    expect(getSessionUser()).toBeNull()
  })
})
