import { z } from 'zod'
import { DEAL_STAGES } from './constants'
import type { DealStage } from './types'

const stageEnum = z.enum(
  DEAL_STAGES as [DealStage, ...DealStage[]],
)

export const dealFormSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  customerId: z.string().min(1, 'Customer is required'),
  ownerId: z.string().min(1, 'Owner is required'),
  value: z.coerce.number().min(0, 'Value must be ≥ 0'),
  stage: stageEnum,
  probability: z.coerce.number().min(0, 'Min 0').max(100, 'Max 100'),
  expectedCloseDate: z.string().min(1, 'Close date is required'),
})

export type DealFormValues = z.infer<typeof dealFormSchema>
