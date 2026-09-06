import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui/button'

export interface DropdownItem {
  id: string
  label: string
  onSelect: () => void
  danger?: boolean
}

export interface DropdownProps {
  triggerLabel: string
  items: DropdownItem[]
  className?: string
  align?: 'start' | 'end'
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Dropdown({
  triggerLabel,
  items,
  className,
  align = 'start',
  variant = 'secondary',
  size = 'md',
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  return (
    <div ref={rootRef} className={cn('relative inline-block', className)}>
      <Button
        variant={variant}
        size={size}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {triggerLabel}
      </Button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className={cn(
            'absolute top-full z-20 mt-2 min-w-44 overflow-hidden rounded-md border border-border bg-surface shadow-[var(--shadow-overlay)]',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              className={cn(
                'block w-full px-3 py-2 text-left text-small hover:bg-surface-secondary',
                item.danger ? 'text-danger' : 'text-text-primary',
              )}
              onClick={() => {
                item.onSelect()
                setOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
