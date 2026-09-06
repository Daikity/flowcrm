import { z } from 'zod'
import { DEAL_STAGES, type DealStage } from '@/entities/deal'
import { compareIsoDates, parseIsoDate } from '@/shared/lib/date'
import type { ReportsParams } from './types'

const stageEnum = z.enum(DEAL_STAGES as [DealStage, ...DealStage[]])

const optionalIsoDate = z
  .string()
  .optional()
  .transform((value, ctx) => {
    if (!value) return undefined
    if (!parseIsoDate(value)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid ISO date',
      })
      return z.NEVER
    }
    return value
  })

const optionalStage = z
  .string()
  .optional()
  .transform((value, ctx) => {
    if (!value) return undefined
    const parsed = stageEnum.safeParse(value)
    if (!parsed.success) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid deal stage',
      })
      return z.NEVER
    }
    return parsed.data
  })

/**
 * Raw query fields before normalize.
 * Invalid stage/date → undefined (dropped), not a hard failure of the whole parse.
 */
const reportsQueryFieldsSchema = z.object({
  from: optionalIsoDate.catch(undefined),
  to: optionalIsoDate.catch(undefined),
  ownerId: z
    .string()
    .optional()
    .transform((value) => (value ? value : undefined)),
  stage: optionalStage.catch(undefined),
})

export type ReportsQueryFields = z.output<typeof reportsQueryFieldsSchema>

/** Single source of truth: swap when from > to */
export function normalizeReportsDateRange<
  T extends { from?: string; to?: string },
>(params: T): T {
  const { from, to } = params
  if (from && to && compareIsoDates(from, to) > 0) {
    return { ...params, from: to, to: from }
  }
  return params
}

export const reportsParamsSchema = reportsQueryFieldsSchema.transform(
  (fields) => normalizeReportsDateRange(fields),
)

export type ParsedReportsParams = ReportsParams

export function parseReportsParams(input: {
  from?: string | null
  to?: string | null
  ownerId?: string | null
  stage?: string | null
}): ReportsParams {
  const result = reportsParamsSchema.safeParse({
    from: input.from ?? undefined,
    to: input.to ?? undefined,
    ownerId: input.ownerId ?? undefined,
    stage: input.stage ?? undefined,
  })

  if (!result.success) {
    return {}
  }

  const { from, to, ownerId, stage } = result.data
  return {
    ...(from ? { from } : {}),
    ...(to ? { to } : {}),
    ...(ownerId ? { ownerId } : {}),
    ...(stage ? { stage } : {}),
  }
}
