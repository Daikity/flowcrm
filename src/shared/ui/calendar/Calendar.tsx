import { useId, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LOCALE_TO_INTL, type AppLocale } from '@/shared/config/i18n'
import {
  addMonths,
  compareIsoDates,
  formatMonthYear,
  getMonthGrid,
  parseIsoDate,
  startOfMonth,
  toIsoDate,
} from '@/shared/lib/date'
import { cn } from '@/shared/lib'

const WEEKDAY_KEYS = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'] as const

export interface CalendarProps {
  value?: string
  onChange?: (iso: string) => void
  min?: string
  max?: string
  className?: string
}

export function Calendar({
  value,
  onChange,
  min,
  max,
  className,
}: CalendarProps) {
  const { t, i18n } = useTranslation()
  const labelId = useId()
  const intlLocale =
    LOCALE_TO_INTL[i18n.language as AppLocale] ?? LOCALE_TO_INTL.en
  const [viewDate, setViewDate] = useState(() => {
    const selected = value ? parseIsoDate(value) : null
    return startOfMonth(selected ?? new Date())
  })

  const days = useMemo(() => getMonthGrid(viewDate), [viewDate])
  const todayIso = toIsoDate(new Date())

  function isDisabled(iso: string) {
    if (min && compareIsoDates(iso, min) < 0) return true
    if (max && compareIsoDates(iso, max) > 0) return true
    return false
  }

  return (
    <div className={cn('w-[280px] select-none p-3', className)}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label={t('common.calendar.prevMonth')}
          className="inline-flex size-8 items-center justify-center rounded-md text-text-secondary transition hover:bg-surface-secondary hover:text-text-primary"
          onClick={() => setViewDate((current) => addMonths(current, -1))}
        >
          <Chevron direction="left" />
        </button>
        <p
          id={labelId}
          className="text-small font-semibold text-text-primary"
        >
          {formatMonthYear(viewDate, intlLocale)}
        </p>
        <button
          type="button"
          aria-label={t('common.calendar.nextMonth')}
          className="inline-flex size-8 items-center justify-center rounded-md text-text-secondary transition hover:bg-surface-secondary hover:text-text-primary"
          onClick={() => setViewDate((current) => addMonths(current, 1))}
        >
          <Chevron direction="right" />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1" aria-hidden>
        {WEEKDAY_KEYS.map((day) => (
          <div
            key={day}
            className="flex h-8 items-center justify-center text-[11px] font-medium text-text-secondary"
          >
            {t(`common.calendar.weekdays.${day}`)}
          </div>
        ))}
      </div>

      <div
        role="grid"
        aria-labelledby={labelId}
        className="grid grid-cols-7 gap-1"
      >
        {days.map((day) => {
          const selectedDay = value === day.iso
          const disabled = isDisabled(day.iso)
          const isToday = day.iso === todayIso

          return (
            <button
              key={day.iso}
              type="button"
              role="gridcell"
              aria-selected={selectedDay}
              disabled={disabled}
              onClick={() => onChange?.(day.iso)}
              className={cn(
                'relative flex h-8 items-center justify-center rounded-md text-small transition outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
                !selectedDay &&
                  (day.inCurrentMonth
                    ? 'text-text-primary'
                    : 'text-text-secondary/50'),
                !disabled && !selectedDay && 'hover:bg-surface-secondary',
                selectedDay &&
                  'bg-primary font-medium text-white hover:bg-primary hover:text-white',
                isToday &&
                  !selectedDay &&
                  'font-semibold text-primary ring-1 ring-primary/30',
                disabled && 'cursor-not-allowed opacity-35',
              )}
            >
              {day.day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn('size-4', direction === 'right' && 'rotate-180')}
    >
      <path
        d="M10 3.5L5.5 8L10 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
