import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LOCALE_TO_INTL, type AppLocale } from '@/shared/config'
import { formatDisplayDate, toIsoDate } from '@/shared/lib/date'
import { cn } from '@/shared/lib'
import { Calendar } from '@/shared/ui/calendar'
import { Button } from '@/shared/ui/button'

export interface DatePickerProps {
  value?: string
  onChange?: (value: string) => void
  label?: string
  placeholder?: string
  error?: string
  min?: string
  max?: string
  disabled?: boolean
  clearable?: boolean
  className?: string
  name?: string
  id?: string
}

export function DatePicker({
  value = '',
  onChange,
  label,
  placeholder,
  error,
  min,
  max,
  disabled = false,
  clearable = true,
  className,
  name,
  id,
}: DatePickerProps) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const reactId = useId()
  const pickerId = id ?? `datepicker-${reactId}`
  const popoverId = `${pickerId}-popover`
  const resolvedPlaceholder = placeholder ?? t('common.datePicker.placeholder')
  const intlLocale =
    LOCALE_TO_INTL[i18n.language as AppLocale] ?? LOCALE_TO_INTL.en

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const display = value
    ? formatDisplayDate(value, intlLocale)
    : resolvedPlaceholder

  return (
    <div
      ref={rootRef}
      className={cn('relative flex w-full flex-col gap-1.5', className)}
    >
      {label ? (
        <label
          htmlFor={pickerId}
          className="text-small font-medium text-text-primary"
        >
          {label}
        </label>
      ) : null}

      {name ? <input type="hidden" name={name} value={value} /> : null}

      <button
        id={pickerId}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={popoverId}
        aria-invalid={Boolean(error) || undefined}
        onClick={() => {
          if (disabled) return
          setOpen((current) => !current)
        }}
        className={cn(
          'flex h-10 w-full items-center justify-between gap-2 rounded-md border border-border bg-surface px-3 text-left text-body outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-danger focus:border-danger focus:ring-danger/20',
          open && !error && 'border-primary ring-2 ring-primary/20',
        )}
      >
        <span
          className={cn(
            'truncate',
            value ? 'text-text-primary' : 'text-text-secondary',
          )}
        >
          {display}
        </span>
        <CalendarIcon />
      </button>

      {open ? (
        <div
          id={popoverId}
          role="dialog"
          aria-label={label ?? t('common.datePicker.aria')}
          className="absolute top-full left-0 z-40 mt-2 overflow-hidden rounded-md border border-border bg-surface shadow-[var(--shadow-overlay)]"
        >
          <Calendar
            value={value || undefined}
            min={min}
            max={max}
            onChange={(iso) => {
              onChange?.(iso)
              setOpen(false)
            }}
          />
          <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                onChange?.(toIsoDate(new Date()))
                setOpen(false)
              }}
            >
              {t('common.datePicker.today')}
            </Button>
            {clearable ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={!value}
                onClick={() => {
                  onChange?.('')
                  setOpen(false)
                }}
              >
                {t('common.datePicker.clear')}
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}

      {error ? <span className="text-small text-danger">{error}</span> : null}
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="size-4 shrink-0 text-text-secondary"
    >
      <rect
        x="2.5"
        y="3.5"
        width="11"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M2.5 6.5H13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5.5 2.5V4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10.5 2.5V4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
