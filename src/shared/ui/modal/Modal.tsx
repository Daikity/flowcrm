import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui/button'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    }

    if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'm-auto w-full max-w-lg rounded-lg border border-border bg-surface p-0 text-text-primary shadow-[var(--shadow-overlay)] backdrop:bg-text-primary/40',
        className,
      )}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-h3">{title}</h2>
        <Button variant="ghost" size="sm" onClick={onClose} aria-label="Закрыть">
          ✕
        </Button>
      </div>
      <div className="px-5 py-4">{children}</div>
    </dialog>
  )
}
