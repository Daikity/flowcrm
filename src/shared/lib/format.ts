import i18n from 'i18next'
import { LOCALE_TO_INTL, type AppLocale } from '@/shared/config/i18n'

function resolveIntlLocale(locale?: string) {
  const lang = (locale ?? i18n.language) as AppLocale
  return LOCALE_TO_INTL[lang] ?? LOCALE_TO_INTL.en
}

/** Currency stays en-US so amounts remain consistent across UI languages */
export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPercent(value: number) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

export function formatDate(value: string, locale?: string) {
  return new Intl.DateTimeFormat(resolveIntlLocale(locale), {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}
