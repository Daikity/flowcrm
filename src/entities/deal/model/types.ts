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
