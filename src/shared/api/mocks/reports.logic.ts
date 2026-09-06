import {
  DEAL_STAGE_LABEL,
  DEAL_STAGES,
  type Deal,
  type DealStage,
} from '@/entities/deal'
import type {
  ReportOwnerBreakdown,
  ReportPipelineItem,
  ReportRevenuePoint,
  ReportsData,
  ReportsParams,
} from '@/entities/report'
import { users } from './data/users'
import { deals } from './data/deals'

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

function toDateKey(isoDate: string) {
  return isoDate.slice(0, 10)
}

function inDateRange(isoDate: string, from?: string, to?: string) {
  const key = toDateKey(isoDate)
  if (from && key < from) return false
  if (to && key > to) return false
  return true
}

function monthKey(isoDate: string) {
  const date = new Date(isoDate)
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
}

function monthLabel(key: string) {
  const [, month] = key.split('-')
  return MONTH_LABELS[Number(month) - 1] ?? key
}

export function filterDealsForReports(params: ReportsParams): Deal[] {
  const { from, to, ownerId, stage } = params

  return deals.filter((deal) => {
    if (ownerId && deal.ownerId !== ownerId) return false
    if (stage && deal.stage !== stage) return false
    if (!inDateRange(deal.expectedCloseDate, from, to)) return false
    return true
  })
}

function buildRevenueSeries(filtered: Deal[]): ReportRevenuePoint[] {
  const won = filtered.filter((deal) => deal.stage === 'won')
  const buckets = new Map<string, number>()

  for (const deal of won) {
    const key = monthKey(deal.expectedCloseDate)
    buckets.set(key, (buckets.get(key) ?? 0) + deal.value)
  }

  return [...buckets.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, revenue]) => ({
      date: monthLabel(key),
      revenue,
    }))
}

function buildPipeline(filtered: Deal[]): ReportPipelineItem[] {
  const byStage = Object.fromEntries(
    DEAL_STAGES.map((stage) => [stage, { count: 0, value: 0 }]),
  ) as Record<DealStage, { count: number; value: number }>

  for (const deal of filtered) {
    byStage[deal.stage].count += 1
    byStage[deal.stage].value += deal.value
  }

  return DEAL_STAGES.filter((stage) => stage !== 'lost').map((stage) => ({
    stage,
    label: DEAL_STAGE_LABEL[stage],
    count: byStage[stage].count,
    value: byStage[stage].value,
  }))
}

function buildByOwner(filtered: Deal[]): ReportOwnerBreakdown[] {
  const map = new Map<
    string,
    { revenue: number; wonDeals: number; deals: number }
  >()

  for (const deal of filtered) {
    const current = map.get(deal.ownerId) ?? {
      revenue: 0,
      wonDeals: 0,
      deals: 0,
    }
    current.deals += 1
    if (deal.stage === 'won') {
      current.wonDeals += 1
      current.revenue += deal.value
    }
    map.set(deal.ownerId, current)
  }

  const userName = new Map(users.map((user) => [user.id, user.name]))

  return [...map.entries()]
    .map(([ownerId, stats]) => ({
      ownerId,
      ownerName: userName.get(ownerId) ?? ownerId,
      ...stats,
    }))
    .sort((a, b) => b.revenue - a.revenue)
}

export function buildReportsData(params: ReportsParams): ReportsData {
  const filtered = filterDealsForReports(params)
  const won = filtered.filter((deal) => deal.stage === 'won')
  const lost = filtered.filter((deal) => deal.stage === 'lost')
  const closed = won.length + lost.length
  const openStages = new Set<DealStage>([
    'lead',
    'qualified',
    'proposal',
    'negotiation',
  ])

  const revenue = won.reduce((sum, deal) => sum + deal.value, 0)
  const pipelineValue = filtered
    .filter((deal) => openStages.has(deal.stage))
    .reduce((sum, deal) => sum + deal.value, 0)

  return {
    kpis: {
      revenue,
      wonDeals: won.length,
      winRate: closed === 0 ? 0 : Math.round((won.length / closed) * 1000) / 10,
      pipelineValue,
    },
    revenue: buildRevenueSeries(filtered),
    pipeline: buildPipeline(filtered),
    byOwner: buildByOwner(filtered),
  }
}
