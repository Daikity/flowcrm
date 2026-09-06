import { describe, expect, it } from 'vitest'
import { getApiErrorMessage, isNotFoundError } from './apiError'

describe('isNotFoundError', () => {
  it('detects 404 FetchBaseQueryError', () => {
    expect(isNotFoundError({ status: 404, data: { message: 'Not found' } })).toBe(
      true,
    )
  })

  it('rejects other statuses', () => {
    expect(isNotFoundError({ status: 500, data: {} })).toBe(false)
    expect(isNotFoundError(undefined)).toBe(false)
  })
})

describe('getApiErrorMessage', () => {
  it('reads message from error payload', () => {
    expect(
      getApiErrorMessage({ status: 400, data: { message: 'Invalid payload' } }),
    ).toBe('Invalid payload')
  })

  it('falls back for unknown errors', () => {
    expect(getApiErrorMessage(null, 'Custom fallback')).toBe('Custom fallback')
  })
})
