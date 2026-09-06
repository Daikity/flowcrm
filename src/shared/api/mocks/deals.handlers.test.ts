import { afterEach, beforeAll, afterAll, describe, expect, it } from 'vitest'
import { setupServer } from 'msw/node'
import type { DealListItem, DealsResponse } from '@/entities/deal'
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

describe('MSW deals handlers', () => {
  it('lists deals with pagination', async () => {
    const response = await fetch('/api/deals?page=1&limit=10')
    expect(response.status).toBe(200)

    const body = (await response.json()) as DealsResponse
    expect(body.items).toHaveLength(10)
    expect(body.page).toBe(1)
    expect(body.limit).toBe(10)
    expect(body.total).toBeGreaterThan(10)
    expect(body.totalPages).toBeGreaterThan(1)
    expect(body.totals.byStage.lead).toBeDefined()
    expect(body.items[0].customerName).toBeTruthy()
  })

  it('filters deals by stage and search', async () => {
    const response = await fetch('/api/deals?stage=won&search=Nordic&limit=50')
    const body = (await response.json()) as DealsResponse

    expect(body.items.length).toBeGreaterThan(0)
    expect(body.items.every((item) => item.stage === 'won')).toBe(true)
    expect(
      body.items.every(
        (item) =>
          item.title.toLowerCase().includes('nordic') ||
          item.customerName.toLowerCase().includes('nordic'),
      ),
    ).toBe(true)
  })

  it('returns all filtered deals for kanban view', async () => {
    const response = await fetch('/api/deals?view=kanban&limit=10')
    const body = (await response.json()) as DealsResponse

    expect(body.page).toBe(1)
    expect(body.totalPages).toBe(1)
    expect(body.items.length).toBe(body.total)
    expect(body.items.length).toBeGreaterThan(10)
  })

  it('creates a deal (POST)', async () => {
    const payload = {
      title: 'Test Deal',
      customerId: 'cust-1',
      ownerId: 'user-1',
      value: 15000,
      stage: 'lead',
      probability: 20,
      expectedCloseDate: '2026-08-01',
    }

    const createResponse = await fetch('/api/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    expect(createResponse.status).toBe(201)
    const created = (await createResponse.json()) as DealListItem
    expect(created.title).toBe('Test Deal')
    expect(created.customerName).toBe('Nordic Soft')

    const list = (await (
      await fetch('/api/deals?search=Test Deal&limit=50')
    ).json()) as DealsResponse
    expect(list.items.some((item) => item.id === created.id)).toBe(true)
  })

  it('updates deal stage (PATCH)', async () => {
    const response = await fetch('/api/deals/deal-5', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage: 'qualified', probability: 40 }),
    })

    expect(response.status).toBe(200)
    const updated = (await response.json()) as DealListItem
    expect(updated.stage).toBe('qualified')
    expect(updated.probability).toBe(40)
  })

  it('returns 404 for missing deal', async () => {
    const response = await fetch('/api/deals/missing-id', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage: 'won' }),
    })
    expect(response.status).toBe(404)
  })
})
