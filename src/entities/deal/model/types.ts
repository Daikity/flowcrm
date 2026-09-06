export type DealStage =
  | 'lead'
  | 'qualified'
  | 'proposal'
  | 'negotiation'
  | 'won'
  | 'lost'

export interface Deal {
  id: string
  title: string
  customerId: string
  ownerId: string
  value: number
  stage: DealStage
  probability: number
  expectedCloseDate: string
  createdAt: string
}

/** Deal enriched with customer company for list/kanban UI */
export interface DealListItem extends Deal {
  customerName: string
}

export type DealsView = 'table' | 'kanban'

export interface DealsParams {
  page: number
  limit: number
  search?: string
  stage?: DealStage
  ownerId?: string
  sortBy?: 'title' | 'value' | 'probability' | 'expectedCloseDate' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
  /** When kanban — MSW returns all filtered items (no pagination slice) */
  view?: DealsView
}

export interface DealStageTotal {
  count: number
  value: number
}

export interface DealsTotals {
  byStage: Record<DealStage, DealStageTotal>
  pipelineValue: number
  totalValue: number
}

export interface DealsResponse {
  items: DealListItem[]
  total: number
  page: number
  limit: number
  totalPages: number
  totals: DealsTotals
}

export type CreateDealInput = Omit<Deal, 'id' | 'createdAt'>

export type UpdateDealInput = Partial<Omit<Deal, 'id' | 'createdAt'>>
