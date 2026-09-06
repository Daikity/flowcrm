import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function isNotFoundError(error: unknown): boolean {
  return isFetchBaseQueryError(error) && error.status === 404
}

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  if (!isFetchBaseQueryError(error)) {
    return fallback
  }

  if (typeof error.data === 'object' && error.data !== null && 'message' in error.data) {
    const message = (error.data as { message: unknown }).message
    if (typeof message === 'string' && message.trim()) {
      return message
    }
  }

  if (typeof error.status === 'number') {
    if (error.status === 404) return 'Resource not found.'
    if (error.status >= 500) return 'Server error. Please try again later.'
  }

  if (error.status === 'FETCH_ERROR') {
    return 'Network error. Check your connection.'
  }

  return fallback
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error
}
