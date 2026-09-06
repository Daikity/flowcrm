import { describe, expect, it } from 'vitest'
import {
  reportsFiltersToSearchParams,
  searchParamsToReports,
} from './reportsParams'

describe('searchParamsToReports', () => {
  it('maps empty URL to empty filters', () => {
    const { filters, queryParams } = searchParamsToReports(
      new URLSearchParams(),
    )
    expect(filters).toEqual({
      from: '',
      to: '',
      ownerId: '',
      stage: '',
    })
    expect(queryParams).toEqual({})
  })

  it('drops invalid stage and swaps inverted dates for filters and query', () => {
    const params = new URLSearchParams({
      from: '2026-09-20',
      to: '2026-09-01',
      stage: 'foobar',
      ownerId: 'user-2',
    })

    const { filters, queryParams } = searchParamsToReports(params)

    expect(filters).toEqual({
      from: '2026-09-01',
      to: '2026-09-20',
      ownerId: 'user-2',
      stage: '',
    })
    expect(queryParams).toEqual({
      from: '2026-09-01',
      to: '2026-09-20',
      ownerId: 'user-2',
    })
  })
})

describe('reportsFiltersToSearchParams', () => {
  it('writes filters to URL and normalizes from > to', () => {
    const next = reportsFiltersToSearchParams({
      from: '2026-12-31',
      to: '2026-01-01',
      ownerId: 'user-1',
      stage: 'won',
    })

    expect(next.get('from')).toBe('2026-01-01')
    expect(next.get('to')).toBe('2026-12-31')
    expect(next.get('ownerId')).toBe('user-1')
    expect(next.get('stage')).toBe('won')
  })

  it('removes empty keys', () => {
    const next = reportsFiltersToSearchParams({
      from: '',
      to: '',
      ownerId: '',
      stage: '',
    })
    expect([...next.keys()]).toEqual([])
  })
})
