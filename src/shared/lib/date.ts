/** ISO date helpers (YYYY-MM-DD), timezone-safe via local calendar parts */

export function parseIsoDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }
  return date
}

export function toIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

export function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

export function compareIsoDates(left: string, right: string): number {
  return left.localeCompare(right)
}

export function clampIsoDate(
  value: string,
  min?: string,
  max?: string,
): string {
  let next = value
  if (min && compareIsoDates(next, min) < 0) next = min
  if (max && compareIsoDates(next, max) > 0) next = max
  return next
}

export interface CalendarDay {
  date: Date
  iso: string
  day: number
  inCurrentMonth: boolean
  isToday: boolean
}

/** Monday-first month grid (6 weeks) */
export function getMonthGrid(viewDate: Date, today = new Date()): CalendarDay[] {
  const first = startOfMonth(viewDate)
  const weekday = (first.getDay() + 6) % 7 // Mon=0 ... Sun=6
  const gridStart = new Date(first)
  gridStart.setDate(first.getDate() - weekday)

  const days: CalendarDay[] = []
  for (let i = 0; i < 42; i += 1) {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + i,
    )
    days.push({
      date,
      iso: toIsoDate(date),
      day: date.getDate(),
      inCurrentMonth: date.getMonth() === viewDate.getMonth(),
      isToday: isSameDay(date, today),
    })
  }
  return days
}

export function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatDisplayDate(iso: string): string {
  const date = parseIsoDate(iso)
  if (!date) return iso
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
