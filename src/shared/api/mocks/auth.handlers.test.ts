import { configureStore } from '@reduxjs/toolkit'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setupServer } from 'msw/node'
import { setupAuthBridge } from '@/features/auth'
import {
  FORCE_401_TOKEN,
  isAuthenticated,
  login,
  logout,
} from '@/features/auth/model/session'
import { authApi } from '../authApi'
import { baseApi } from '../baseApi'
import { handlers } from './handlers'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
  logout()
  localStorage.clear()
})

afterAll(() => {
  server.close()
})

describe('MSW auth probe', () => {
  it('returns 401 without Authorization', async () => {
    const response = await fetch('/api/auth/probe')
    expect(response.status).toBe(401)
  })

  it('returns 200 with valid Bearer token', async () => {
    const response = await fetch('/api/auth/probe', {
      headers: { Authorization: 'Bearer demo-token' },
    })
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ ok: true })
  })

  it('returns 401 for force-401 token', async () => {
    const response = await fetch('/api/auth/probe', {
      headers: { Authorization: `Bearer ${FORCE_401_TOKEN}` },
    })
    expect(response.status).toBe(401)
  })
})

describe('baseApi 401 handling', () => {
  beforeEach(() => {
    setupAuthBridge()
    localStorage.clear()
  })

  it('clears session on 401 without navigating', async () => {
    login()
    expect(isAuthenticated()).toBe(true)

    localStorage.setItem('flowcrm_auth_token', FORCE_401_TOKEN)

    const store = configureStore({
      reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    })

    const result = await store.dispatch(
      authApi.endpoints.authProbe.initiate(undefined, { forceRefetch: true }),
    )

    expect('error' in result && result.error).toBeTruthy()
    expect(isAuthenticated()).toBe(false)
  })
})
