import { describe, expect, it } from 'vitest'
import { formatCurrency, formatDate, formatPercent } from './format'

function normalizeSpaces(value: string) {
  return value.replace(/\u00a0|\u202f/g, ' ')
}

describe('formatCurrency', () => {
  it('formats USD without fraction digits', () => {
    expect(normalizeSpaces(formatCurrency(284500))).toBe('$284,500')
  })

  it('formats zero', () => {
    expect(normalizeSpaces(formatCurrency(0))).toBe('$0')
  })

  it('formats negative values', () => {
    expect(normalizeSpaces(formatCurrency(-1200))).toBe('-$1,200')
  })
})

describe('formatPercent', () => {
  it('adds plus sign for positive values', () => {
    expect(formatPercent(12.4)).toBe('+12.4%')
  })

  it('keeps minus sign for negative values', () => {
    expect(formatPercent(-3.1)).toBe('-3.1%')
  })

  it('formats zero without plus sign', () => {
    expect(formatPercent(0)).toBe('0.0%')
  })

  it('rounds to one decimal place', () => {
    expect(formatPercent(8.25)).toBe('+8.3%')
  })
})

describe('formatDate', () => {
  it('formats ISO date in en-GB style', () => {
    expect(formatDate('2025-11-12T12:00:00.000Z')).toBe('12 Nov 2025')
  })

  it('formats another ISO timestamp', () => {
    expect(formatDate('2026-03-01T16:00:00.000Z')).toBe('01 Mar 2026')
  })
})
