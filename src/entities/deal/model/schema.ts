import { z } from 'zod'
import type { TFunction } from 'i18next'
import { DEAL_STAGES } from './constants'
import type { DealStage } from './types'

const stageEnum = z.enum(
  DEAL_STAGES as [DealStage, ...DealStage[]],
)

export function createDealSchema(t: TFunction) {
  return z.object({
    title: z.string().min(2, t('validation.deal.titleRequired')),
    customerId: z.string().min(1, t('validation.deal.customerRequired')),
    ownerId: z.string().min(1, t('validation.ownerRequired')),
    value: z.coerce.number().min(0, t('validation.deal.valueMin')),
    stage: stageEnum,
    probability: z.coerce
      .number()
      .min(0, t('validation.deal.probabilityMin'))
      .max(100, t('validation.deal.probabilityMax')),
    expectedCloseDate: z.string().min(1, t('validation.deal.closeDateRequired')),
  })
}

export type DealFormValues = z.output<ReturnType<typeof createDealSchema>>
