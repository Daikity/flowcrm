import {
  parseReportsParams,
  type ParsedReportsParams,
} from '@/entities/report'
import type { ReportsParams } from '@/entities/report'
import type { ReportFilterValue } from '@/features/report-filter'

export function searchParamsToReports(
  searchParams: URLSearchParams,
): {
  filters: ReportFilterValue
  queryParams: ReportsParams
  parsed: ParsedReportsParams
} {
  const parsed = parseReportsParams({
    from: searchParams.get('from'),
    to: searchParams.get('to'),
    ownerId: searchParams.get('ownerId'),
    stage: searchParams.get('stage'),
  })

  const filters: ReportFilterValue = {
    from: parsed.from ?? '',
    to: parsed.to ?? '',
    ownerId: parsed.ownerId ?? '',
    stage: parsed.stage ?? '',
  }

  const queryParams: ReportsParams = {
    from: parsed.from,
    to: parsed.to,
    ownerId: parsed.ownerId,
    stage: parsed.stage,
  }

  return { filters, queryParams, parsed }
}

export function reportsFiltersToSearchParams(
  filters: ReportFilterValue,
  prev = new URLSearchParams(),
): URLSearchParams {
  const next = new URLSearchParams(prev)

  const entries: Array<[keyof ReportFilterValue, string]> = [
    ['from', filters.from],
    ['to', filters.to],
    ['ownerId', filters.ownerId],
    ['stage', filters.stage],
  ]

  for (const [key, value] of entries) {
    if (!value) {
      next.delete(key)
    } else {
      next.set(key, value)
    }
  }

  // Re-parse so invalid/out-of-order values are normalized before writing URL
  const normalized = parseReportsParams({
    from: next.get('from'),
    to: next.get('to'),
    ownerId: next.get('ownerId'),
    stage: next.get('stage'),
  })

  const keys = ['from', 'to', 'ownerId', 'stage'] as const
  for (const key of keys) {
    const value = normalized[key]
    if (!value) {
      next.delete(key)
    } else {
      next.set(key, value)
    }
  }

  return next
}
