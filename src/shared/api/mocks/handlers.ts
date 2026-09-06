import { http, HttpResponse } from 'msw'
import type {
  CreateCustomerInput,
  Customer,
  CustomerDetails,
  CustomerIndustry,
  CustomersResponse,
  CustomerStatus,
  UpdateCustomerInput,
} from '@/entities/customer'
import { activities } from './data/activities'
import { customers, setCustomers } from './data/customers'
import { dashboardData } from './data/dashboard'
import { deals } from './data/deals'
import { users } from './data/users'

const OPEN_STAGES = new Set(['lead', 'qualified', 'proposal', 'negotiation'])

export const handlers = [
  http.get('/api/dashboard', async () => {
    await delay(400)
    return HttpResponse.json(dashboardData)
  }),

  http.get('/api/users', async () => {
    await delay(200)
    return HttpResponse.json(users)
  }),

  http.get('/api/customers', async ({ request }) => {
    await delay(350)

    const url = new URL(request.url)
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1') || 1)
    const limit = Math.max(1, Number(url.searchParams.get('limit') ?? '10') || 10)
    const search = url.searchParams.get('search')?.trim().toLowerCase() ?? ''
    const status = url.searchParams.get('status') as CustomerStatus | null
    const industry = url.searchParams.get('industry') as CustomerIndustry | null
    const ownerId = url.searchParams.get('ownerId')
    const sortBy = url.searchParams.get('sortBy') ?? 'createdAt'
    const sortOrder = url.searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc'

    let filtered = [...customers]

    if (search) {
      filtered = filtered.filter((customer) => {
        return (
          customer.name.toLowerCase().includes(search) ||
          customer.company.toLowerCase().includes(search) ||
          customer.email.toLowerCase().includes(search)
        )
      })
    }

    if (status) {
      filtered = filtered.filter((customer) => customer.status === status)
    }

    if (industry) {
      filtered = filtered.filter((customer) => customer.industry === industry)
    }

    if (ownerId) {
      filtered = filtered.filter((customer) => customer.ownerId === ownerId)
    }

    filtered.sort((a, b) => {
      const left = getSortValue(a, sortBy)
      const right = getSortValue(b, sortBy)

      if (left < right) return sortOrder === 'asc' ? -1 : 1
      if (left > right) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / limit))
    const safePage = Math.min(page, totalPages)
    const start = (safePage - 1) * limit
    const items = filtered.slice(start, start + limit)

    const response: CustomersResponse = {
      items,
      total,
      page: safePage,
      limit,
      totalPages,
    }

    return HttpResponse.json(response)
  }),

  http.get('/api/customers/:id', async ({ params }) => {
    await delay(300)

    const customer = customers.find((item) => item.id === params.id)

    if (!customer) {
      return HttpResponse.json({ message: 'Customer not found' }, { status: 404 })
    }

    const customerDeals = deals.filter((deal) => deal.customerId === customer.id)
    const dealIds = new Set(customerDeals.map((deal) => deal.id))
    const customerActivities = activities.filter(
      (activity) =>
        activity.entityId === customer.id ||
        (activity.entityId !== undefined && dealIds.has(activity.entityId)),
    )

    const details: CustomerDetails = {
      ...customer,
      dealsCount: customerDeals.length,
      openDealsCount: customerDeals.filter((deal) => OPEN_STAGES.has(deal.stage))
        .length,
      deals: customerDeals,
      activities: customerActivities,
    }

    return HttpResponse.json(details)
  }),

  http.post('/api/customers', async ({ request }) => {
    await delay(400)

    const body = (await request.json()) as CreateCustomerInput
    const created: Customer = {
      id: `cust-${Date.now()}`,
      name: body.name,
      company: body.company,
      email: body.email,
      phone: body.phone,
      industry: body.industry,
      status: body.status,
      ownerId: body.ownerId,
      revenue: body.revenue ?? 0,
      createdAt: new Date().toISOString(),
    }

    setCustomers([created, ...customers])
    return HttpResponse.json(created, { status: 201 })
  }),

  http.patch('/api/customers/:id', async ({ params, request }) => {
    await delay(350)

    const index = customers.findIndex((item) => item.id === params.id)

    if (index === -1) {
      return HttpResponse.json({ message: 'Customer not found' }, { status: 404 })
    }

    const body = (await request.json()) as UpdateCustomerInput
    const current = customers[index]
    const updated: Customer = {
      ...current,
      ...body,
      id: current.id,
      createdAt: current.createdAt,
    }

    const next = [...customers]
    next[index] = updated
    setCustomers(next)

    return HttpResponse.json(updated)
  }),

  http.delete('/api/customers/:id', async ({ params }) => {
    await delay(300)

    const exists = customers.some((item) => item.id === params.id)

    if (!exists) {
      return HttpResponse.json({ message: 'Customer not found' }, { status: 404 })
    }

    setCustomers(customers.filter((item) => item.id !== params.id))
    return new HttpResponse(null, { status: 204 })
  }),
]

function getSortValue(customer: Customer, sortBy: string) {
  switch (sortBy) {
    case 'name':
      return customer.name.toLowerCase()
    case 'company':
      return customer.company.toLowerCase()
    case 'revenue':
      return customer.revenue
    case 'createdAt':
    default:
      return customer.createdAt
  }
}

function delay(ms: number) {
  if (import.meta.env.MODE === 'test') {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
