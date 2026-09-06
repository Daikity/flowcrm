import { afterEach, beforeAll, afterAll, describe, expect, it } from 'vitest'
import { setupServer } from 'msw/node'
import type { Customer, CustomersResponse } from '@/entities/customer'
import { handlers } from './handlers'
import { resetCustomers } from './data/customers'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
  resetCustomers()
})

afterAll(() => {
  server.close()
})

describe('MSW customers handlers', () => {
  it('lists customers with pagination', async () => {
    const response = await fetch('/api/customers?page=1&limit=10')
    expect(response.status).toBe(200)

    const body = (await response.json()) as CustomersResponse
    expect(body.items).toHaveLength(10)
    expect(body.page).toBe(1)
    expect(body.limit).toBe(10)
    expect(body.total).toBeGreaterThan(10)
    expect(body.totalPages).toBeGreaterThan(1)
  })

  it('filters customers by search', async () => {
    const response = await fetch('/api/customers?search=Nordic Soft&limit=50')
    const body = (await response.json()) as CustomersResponse

    expect(body.items.length).toBeGreaterThan(0)
    expect(
      body.items.every(
        (item) =>
          item.company.includes('Nordic Soft') ||
          item.name.toLowerCase().includes('nordic') ||
          item.email.toLowerCase().includes('nordic'),
      ),
    ).toBe(true)
  })

  it('returns customer details by id', async () => {
    const response = await fetch('/api/customers/cust-1')
    expect(response.status).toBe(200)

    const body = (await response.json()) as Customer & {
      dealsCount: number
      openDealsCount: number
    }
    expect(body.id).toBe('cust-1')
    expect(body.company).toBe('Nordic Soft')
    expect(typeof body.dealsCount).toBe('number')
  })

  it('returns 404 for missing customer', async () => {
    const response = await fetch('/api/customers/missing-id')
    expect(response.status).toBe(404)
  })

  it('creates a customer (POST)', async () => {
    const payload = {
      name: 'Test User',
      company: 'Test Co',
      email: 'test@example.com',
      phone: '+1 555 000 1111',
      industry: 'Technology',
      status: 'lead',
      ownerId: 'user-1',
    }

    const createResponse = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    expect(createResponse.status).toBe(201)

    const created = (await createResponse.json()) as Customer
    expect(created.id).toMatch(/^cust-/)
    expect(created.name).toBe(payload.name)
    expect(created.company).toBe(payload.company)
    expect(created.revenue).toBe(0)

    const listResponse = await fetch('/api/customers?search=Test Co&limit=50')
    const list = (await listResponse.json()) as CustomersResponse
    expect(list.items.some((item) => item.id === created.id)).toBe(true)
  })

  it('updates a customer (PATCH)', async () => {
    const response = await fetch('/api/customers/cust-1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company: 'Nordic Soft Updated' }),
    })
    expect(response.status).toBe(200)

    const updated = (await response.json()) as Customer
    expect(updated.id).toBe('cust-1')
    expect(updated.company).toBe('Nordic Soft Updated')
    expect(updated.name).toBe('Elena Volkova')
  })

  it('deletes a customer (DELETE)', async () => {
    const deleteResponse = await fetch('/api/customers/cust-2', {
      method: 'DELETE',
    })
    expect(deleteResponse.status).toBe(204)

    const getResponse = await fetch('/api/customers/cust-2')
    expect(getResponse.status).toBe(404)
  })

  it('CRUD smoke: create → get → patch → delete', async () => {
    const createResponse = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Smoke Tester',
        company: 'Smoke Inc',
        email: 'smoke@example.com',
        phone: '+1 555 999 0000',
        industry: 'Finance',
        status: 'active',
        ownerId: 'user-2',
      }),
    })
    const created = (await createResponse.json()) as Customer

    const getResponse = await fetch(`/api/customers/${created.id}`)
    expect(getResponse.status).toBe(200)

    const patchResponse = await fetch(`/api/customers/${created.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'inactive' }),
    })
    const patched = (await patchResponse.json()) as Customer
    expect(patched.status).toBe('inactive')

    const deleteResponse = await fetch(`/api/customers/${created.id}`, {
      method: 'DELETE',
    })
    expect(deleteResponse.status).toBe(204)

    const missing = await fetch(`/api/customers/${created.id}`)
    expect(missing.status).toBe(404)
  })
})
