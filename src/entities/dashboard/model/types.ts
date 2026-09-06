import type { Activity } from '@/entities/activity'
import type { Deal } from '@/entities/deal'

export interface DashboardStats {
  revenue: number
  deals: number
  customers: number
  conversion: number
  revenueChange: number
  dealsChange: number
  customersChange: number
  conversionChange: number
}

export interface RevenuePoint {
  date: string
  revenue: number
}

export interface PipelineItem {
  stage: string
  count: number
  value: number
}

export interface DashboardData {
  stats: DashboardStats
  revenue: RevenuePoint[]
  pipeline: PipelineItem[]
  recentDeals: Deal[]
  recentActivity: Activity[]
}
