import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { setupServer } from 'msw/node'
import type { ReportsData } from '@/entities/report'
import { handlers } from './handlers'
import { resetDeals } from './data/deals'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
  resetDeals()
})

afterAll(() => {
  server.close()
})

describe('MSW reports handlers', () => {
  it('returns aggregated sales performance', async () => {
    const response = await fetch('/api/reports')
    expect(response.status).toBe(200)

    const body = (await response.json()) as ReportsData
    expect(body.kpis).toMatchObject({
      revenue: expect.any(Number),
      wonDeals: expect.any(Number),
      winRate: expect.any(Number),
      pipelineValue: expect.any(Number),
    })
    expect(body.kpis.wonDeals).toBeGreaterThan(0)
    expect(body.revenue.length).toBeGreaterThan(0)
    expect(body.pipeline.length).toBeGreaterThan(0)
    expect(body.byOwner.length).toBeGreaterThan(0)
  })

  it('filters by owner', async () => {
    const response = await fetch('/api/reports?ownerId=user-2')
    const body = (await response.json()) as ReportsData

    expect(body.byOwner.every((row) => row.ownerId === 'user-2')).toBe(true)
  })

  it('filters by stage', async () => {
    const response = await fetch('/api/reports?stage=won')
    const body = (await response.json()) as ReportsData

    const nonZero = body.pipeline.filter((item) => item.count > 0)
    expect(nonZero.every((item) => item.stage === 'won')).toBe(true)
    expect(body.kpis.pipelineValue).toBe(0)
  })

  it('filters by date range', async () => {
    const response = await fetch(
      '/api/reports?from=2026-03-01&to=2026-03-31',
    )
    const body = (await response.json()) as ReportsData

    expect(body.kpis).toBeDefined()
    expect(Array.isArray(body.revenue)).toBe(true)
  })
})
