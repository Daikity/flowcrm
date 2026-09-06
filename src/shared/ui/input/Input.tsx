import type { InputHTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ className, label, error, id, ...props }: InputProps) {
  const inputId = id ?? props.name

  return (
    <label className="flex w-full flex-col gap-1.5">
      {label ? (
        <span className="text-small font-medium text-text-primary">{label}</span>
      ) : null}
      <input
        id={inputId}
        className={cn(
          'h-10 w-full rounded-md border border-border bg-surface px-3 text-body text-text-primary outline-none transition placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-danger focus:border-danger focus:ring-danger/20',
          className,
        )}
        {...props}
      />
      {error ? <span className="text-small text-danger">{error}</span> : null}
    </label>
  )
}
