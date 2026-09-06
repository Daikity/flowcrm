import { describe, expect, it } from 'vitest'
import { normalizeReportsDateRange, parseReportsParams } from './schemas'

describe('parseReportsParams', () => {
  it('returns empty object for empty params', () => {
    expect(parseReportsParams({})).toEqual({})
  })

  it('keeps valid stage and ISO dates', () => {
    expect(
      parseReportsParams({
        from: '2026-01-01',
        to: '2026-01-31',
        ownerId: 'user-1',
        stage: 'won',
      }),
    ).toEqual({
      from: '2026-01-01',
      to: '2026-01-31',
      ownerId: 'user-1',
      stage: 'won',
    })
  })

  it('drops invalid stage', () => {
    expect(
      parseReportsParams({
        stage: 'foobar',
        from: '2026-01-01',
      }),
    ).toEqual({
      from: '2026-01-01',
    })
  })

  it('drops invalid dates', () => {
    expect(
      parseReportsParams({
        from: 'not-a-date',
        to: '2026-02-30',
        ownerId: 'user-1',
      }),
    ).toEqual({
      ownerId: 'user-1',
    })
  })

  it('swaps from > to', () => {
    expect(
      parseReportsParams({
        from: '2026-09-20',
        to: '2026-09-01',
      }),
    ).toEqual({
      from: '2026-09-01',
      to: '2026-09-20',
    })
  })
})

describe('normalizeReportsDateRange', () => {
  it('is the single swap point of truth', () => {
    expect(
      normalizeReportsDateRange({ from: '2026-03-10', to: '2026-03-01' }),
    ).toEqual({ from: '2026-03-01', to: '2026-03-10' })

    expect(
      normalizeReportsDateRange({ from: '2026-03-01', to: '2026-03-10' }),
    ).toEqual({ from: '2026-03-01', to: '2026-03-10' })
  })
})
