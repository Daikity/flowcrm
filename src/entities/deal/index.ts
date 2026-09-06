export type {
  CreateDealInput,
  Deal,
  DealListItem,
  DealStage,
  DealStageTotal,
  DealsParams,
  DealsResponse,
  DealsTotals,
  DealsView,
  UpdateDealInput,
} from './model/types'
export type { DealFormValues } from './model/schema'
export { createDealSchema } from './model/schema'
export {
  DEAL_STAGE_LABEL,
  DEAL_STAGE_PROBABILITY,
  DEAL_STAGE_VARIANT,
  DEAL_STAGES,
} from './model/constants'
export { DealForm } from './ui/DealForm'
export { DealStageBadge } from './ui/DealStageBadge'
