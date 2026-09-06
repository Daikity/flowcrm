import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { cn } from '@/shared/lib'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label?: string
  placeholder?: string
  error?: string
  name?: string
  id?: string
  disabled?: boolean
  className?: string
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn(
        'size-4 shrink-0 text-text-secondary transition-transform duration-150',
        open && 'rotate-180',
      )}
    >
      <path
        d="M4 6.5L8 10.5L12 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Select({
  options,
  value,
  defaultValue = '',
  onChange,
  label,
  placeholder = 'Выберите',
  error,
  name,
  id,
  disabled = false,
  className,
}: SelectProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const selectedValue = isControlled ? value : internalValue

  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const reactId = useId()
  const selectId = id ?? `select-${reactId}`
  const listboxId = `${selectId}-listbox`

  const selectedOption = options.find((option) => option.value === selectedValue)
  const displayLabel = selectedOption?.label ?? placeholder
  const isPlaceholder = !selectedOption

  function getSelectedIndex() {
    const index = options.findIndex((option) => option.value === selectedValue)
    return index >= 0 ? index : 0
  }

  function openList() {
    setActiveIndex(getSelectedIndex())
    setOpen(true)
  }

  function commitValue(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue)
    }
    onChange?.(nextValue)
    setOpen(false)
  }

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  useEffect(() => {
    if (!open) return

    const frame = requestAnimationFrame(() => {
      listRef.current?.focus()
    })

    return () => cancelAnimationFrame(frame)
  }, [open])

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return

    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openList()
    }
  }

  function handleListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % options.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + options.length) % options.length)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const option = options[activeIndex]
      if (option) {
        commitValue(option.value)
      }
    }
  }

  return (
    <div ref={rootRef} className={cn('relative flex w-full flex-col gap-1.5', className)}>
      {label ? (
        <label htmlFor={selectId} className="text-small font-medium text-text-primary">
          {label}
        </label>
      ) : null}

      {name ? <input type="hidden" name={name} value={selectedValue} /> : null}

      <button
        id={selectId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-invalid={Boolean(error) || undefined}
        onClick={() => {
          if (disabled) return
          if (open) {
            setOpen(false)
            return
          }
          openList()
        }}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          'flex h-10 w-full items-center justify-between gap-2 rounded-md border border-border bg-surface px-3 text-left text-body outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-danger focus:border-danger focus:ring-danger/20',
          open && !error && 'border-primary ring-2 ring-primary/20',
        )}
      >
        <span
          className={cn(
            'truncate',
            isPlaceholder ? 'text-text-secondary' : 'text-text-primary',
          )}
        >
          {displayLabel}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={
            options[activeIndex]
              ? `${selectId}-option-${options[activeIndex].value}`
              : undefined
          }
          onKeyDown={handleListKeyDown}
          className="absolute top-full right-0 left-0 z-30 mt-2 max-h-60 overflow-auto rounded-md border border-border bg-surface py-1 shadow-[var(--shadow-overlay)] outline-none"
        >
          {options.map((option, index) => {
            const selected = option.value === selectedValue
            const active = index === activeIndex

            return (
              <li
                key={option.value}
                id={`${selectId}-option-${option.value}`}
                role="option"
                aria-selected={selected}
                className={cn(
                  'flex cursor-pointer items-center justify-between px-3 py-2 text-body text-text-primary transition-colors',
                  active && 'bg-surface-secondary',
                  selected && 'font-medium text-primary',
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commitValue(option.value)}
              >
                <span>{option.label}</span>
                {selected ? (
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                    className="size-4 text-primary"
                  >
                    <path
                      d="M3.5 8.5L6.5 11.5L12.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </li>
            )
          })}
        </ul>
      ) : null}

      {error ? <span className="text-small text-danger">{error}</span> : null}
    </div>
  )
}
