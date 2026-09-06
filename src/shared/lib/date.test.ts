import { describe, expect, it } from 'vitest'
import {
  compareIsoDates,
  getMonthGrid,
  parseIsoDate,
  toIsoDate,
} from './date'

describe('date helpers', () => {
  it('parses and serializes ISO dates without timezone shift', () => {
    const date = parseIsoDate('2026-03-15')
    expect(date).not.toBeNull()
    expect(toIsoDate(date!)).toBe('2026-03-15')
    expect(parseIsoDate('2026-02-30')).toBeNull()
  })

  it('builds monday-first month grid', () => {
    const grid = getMonthGrid(new Date(2026, 2, 1), new Date(2026, 2, 6))
    expect(grid).toHaveLength(42)
    expect(grid[0].iso).toBe('2026-02-23')
    expect(grid.find((day) => day.iso === '2026-03-01')?.inCurrentMonth).toBe(
      true,
    )
    expect(grid.find((day) => day.iso === '2026-03-06')?.isToday).toBe(true)
  })

  it('compares ISO dates lexicographically', () => {
    expect(compareIsoDates('2026-01-01', '2026-01-02')).toBeLessThan(0)
    expect(compareIsoDates('2026-12-31', '2026-01-01')).toBeGreaterThan(0)
  })
})
