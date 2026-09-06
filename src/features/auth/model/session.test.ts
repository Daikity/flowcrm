import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DEMO_USER } from './authStorage'
import {
  getSession,
  getSnapshot,
  getToken,
  isAuthenticated,
  login,
  logout,
  subscribe,
} from './session'

describe('session facade', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('login establishes session and notifies subscribers', () => {
    const listener = vi.fn()
    const unsubscribe = subscribe(listener)
    const before = getSnapshot()

    login()

    expect(isAuthenticated()).toBe(true)
    expect(getSession()).toEqual(DEMO_USER)
    expect(getToken()).toBeTruthy()
    expect(getSnapshot()).toBeGreaterThan(before)
    expect(listener).toHaveBeenCalled()
    unsubscribe()
  })

  it('logout clears session and notifies subscribers', () => {
    login()
    const listener = vi.fn()
    subscribe(listener)

    logout()

    expect(isAuthenticated()).toBe(false)
    expect(getSession()).toBeNull()
    expect(getToken()).toBeNull()
    expect(listener).toHaveBeenCalled()
  })
})
