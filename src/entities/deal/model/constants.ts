import type { DealStage } from './types'

export const DEAL_STAGES: DealStage[] = [
  'lead',
  'qualified',
  'proposal',
  'negotiation',
  'won',
  'lost',
]

export const DEAL_STAGE_LABEL: Record<DealStage, string> = {
  lead: 'Lead',
  qualified: 'Qualified',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  won: 'Won',
  lost: 'Lost',
}

export const DEAL_STAGE_VARIANT: Record<
  DealStage,
  'neutral' | 'primary' | 'success' | 'warning' | 'danger'
> = {
  lead: 'neutral',
  qualified: 'primary',
  proposal: 'warning',
  negotiation: 'warning',
  won: 'success',
  lost: 'danger',
}

/** Default win probability when stage changes */
export const DEAL_STAGE_PROBABILITY: Record<DealStage, number> = {
  lead: 20,
  qualified: 40,
  proposal: 55,
  negotiation: 70,
  won: 100,
  lost: 0,
}
