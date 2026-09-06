import { describe, expect, it } from 'vitest'
import { hasReportsData } from './hasReportsData'

describe('hasReportsData', () => {
  it('is empty when all datasets are empty', () => {
    expect(
      hasReportsData({
        revenue: [],
        byOwner: [],
        pipeline: [{ count: 0 }, { count: 0 }],
      }),
    ).toBe(false)
  })

  it('has data when revenue exists even if KPIs would look empty', () => {
    expect(
      hasReportsData({
        revenue: [{ date: '2026-01', revenue: 0 }],
        byOwner: [],
        pipeline: [{ count: 0 }],
      }),
    ).toBe(true)
  })

  it('has data when byOwner exists', () => {
    expect(
      hasReportsData({
        revenue: [],
        byOwner: [{ ownerId: 'user-1' }],
        pipeline: [{ count: 0 }],
      }),
    ).toBe(true)
  })

  it('has data when pipeline has counts', () => {
    expect(
      hasReportsData({
        revenue: [],
        byOwner: [],
        pipeline: [{ count: 2 }],
      }),
    ).toBe(true)
  })
})
