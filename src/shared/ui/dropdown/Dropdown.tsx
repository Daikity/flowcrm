import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui/button'

export interface DropdownItem {
  id: string
  label: string
  onSelect: () => void
}

export interface DropdownProps {
  triggerLabel: string
  items: DropdownItem[]
  className?: string
}

export function Dropdown({ triggerLabel, items, className }: DropdownProps) {
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
        variant="secondary"
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
          className="absolute top-full left-0 z-20 mt-2 min-w-44 overflow-hidden rounded-md border border-border bg-surface shadow-[var(--shadow-overlay)]"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              className="block w-full px-3 py-2 text-left text-small text-text-primary hover:bg-surface-secondary"
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
