import type {
  CreateDealInput,
  Deal,
  DealListItem,
  DealStage,
  DealsResponse,
  DealsTotals,
  UpdateDealInput,
} from '@/entities/deal'
import { DEAL_STAGES } from '@/entities/deal'
import { customers } from './data/customers'
import { deals, setDeals } from './data/deals'

const OPEN_STAGES = new Set<DealStage>([
  'lead',
  'qualified',
  'proposal',
  'negotiation',
])

export function enrichDeal(deal: Deal): DealListItem {
  const customer = customers.find((item) => item.id === deal.customerId)
  return {
    ...deal,
    customerName: customer?.company ?? 'Unknown',
  }
}

export function buildDealsTotals(items: Deal[]): DealsTotals {
  const byStage = Object.fromEntries(
    DEAL_STAGES.map((stage) => [stage, { count: 0, value: 0 }]),
  ) as DealsTotals['byStage']

  let totalValue = 0
  let pipelineValue = 0

  for (const deal of items) {
    byStage[deal.stage].count += 1
    byStage[deal.stage].value += deal.value
    totalValue += deal.value
    if (OPEN_STAGES.has(deal.stage)) {
      pipelineValue += deal.value
    }
  }

  return { byStage, pipelineValue, totalValue }
}

export function filterAndSortDeals(params: {
  search: string
  stage: DealStage | null
  ownerId: string | null
  sortBy: string
  sortOrder: 'asc' | 'desc'
}): Deal[] {
  let filtered = [...deals]

  if (params.search) {
    const q = params.search
    filtered = filtered.filter((deal) => {
      const customer = customers.find((item) => item.id === deal.customerId)
      return (
        deal.title.toLowerCase().includes(q) ||
        (customer?.company.toLowerCase().includes(q) ?? false) ||
        (customer?.name.toLowerCase().includes(q) ?? false)
      )
    })
  }

  if (params.stage) {
    filtered = filtered.filter((deal) => deal.stage === params.stage)
  }

  if (params.ownerId) {
    filtered = filtered.filter((deal) => deal.ownerId === params.ownerId)
  }

  filtered.sort((a, b) => {
    const left = getDealSortValue(a, params.sortBy)
    const right = getDealSortValue(b, params.sortBy)

    if (left < right) return params.sortOrder === 'asc' ? -1 : 1
    if (left > right) return params.sortOrder === 'asc' ? 1 : -1
    return 0
  })

  return filtered
}

export function paginateDeals(
  filtered: Deal[],
  page: number,
  limit: number,
  view: string | null,
): DealsResponse {
  const totals = buildDealsTotals(filtered)
  const total = filtered.length

  if (view === 'kanban') {
    return {
      items: filtered.map(enrichDeal),
      total,
      page: 1,
      limit: total || 1,
      totalPages: 1,
      totals,
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / limit))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * limit
  const items = filtered.slice(start, start + limit).map(enrichDeal)

  return {
    items,
    total,
    page: safePage,
    limit,
    totalPages,
    totals,
  }
}

export function createDealFromBody(body: CreateDealInput): Deal {
  return {
    id: `deal-${Date.now()}`,
    title: body.title,
    customerId: body.customerId,
    ownerId: body.ownerId,
    value: body.value,
    stage: body.stage,
    probability: body.probability,
    expectedCloseDate: body.expectedCloseDate,
    createdAt: new Date().toISOString(),
  }
}

export function updateDealAt(
  id: string,
  body: UpdateDealInput,
): Deal | null {
  const index = deals.findIndex((item) => item.id === id)
  if (index === -1) return null

  const current = deals[index]
  const updated: Deal = {
    ...current,
    ...body,
    id: current.id,
    createdAt: current.createdAt,
  }

  const next = [...deals]
  next[index] = updated
  setDeals(next)
  return updated
}

function getDealSortValue(deal: Deal, sortBy: string) {
  switch (sortBy) {
    case 'title':
      return deal.title.toLowerCase()
    case 'value':
      return deal.value
    case 'probability':
      return deal.probability
    case 'expectedCloseDate':
      return deal.expectedCloseDate
    case 'createdAt':
    default:
      return deal.createdAt
  }
}
