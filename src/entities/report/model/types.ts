import type { DealStage } from '@/entities/deal'

export interface ReportsParams {
  from?: string
  to?: string
  ownerId?: string
  stage?: DealStage
}

export interface ReportsKpis {
  revenue: number
  wonDeals: number
  winRate: number
  pipelineValue: number
}

export interface ReportRevenuePoint {
  date: string
  revenue: number
}

export interface ReportPipelineItem {
  stage: DealStage
  label: string
  count: number
  value: number
}

export interface ReportOwnerBreakdown {
  ownerId: string
  ownerName: string
  revenue: number
  wonDeals: number
  deals: number
}

export interface ReportsData {
  kpis: ReportsKpis
  revenue: ReportRevenuePoint[]
  pipeline: ReportPipelineItem[]
  byOwner: ReportOwnerBreakdown[]
}
