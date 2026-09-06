import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { i18n } from '@/shared/config/i18n'

export function isNotFoundError(error: unknown): boolean {
  return isFetchBaseQueryError(error) && error.status === 404
}

export function getApiErrorMessage(
  error: unknown,
  fallback?: string,
): string {
  const resolvedFallback = fallback ?? i18n.t('common.errors.generic')

  if (!isFetchBaseQueryError(error)) {
    return resolvedFallback
  }

  if (typeof error.data === 'object' && error.data !== null && 'message' in error.data) {
    const message = (error.data as { message: unknown }).message
    if (typeof message === 'string' && message.trim()) {
      return message
    }
  }

  if (typeof error.status === 'number') {
    if (error.status === 404) return i18n.t('common.errors.notFound')
    if (error.status >= 500) return i18n.t('common.errors.server')
  }

  if (error.status === 'FETCH_ERROR') {
    return i18n.t('common.errors.network')
  }

  return resolvedFallback
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error
}
