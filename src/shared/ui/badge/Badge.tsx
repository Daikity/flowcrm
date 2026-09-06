import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib'

type BadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: BadgeVariant
}

const variantClass: Record<BadgeVariant, string> = {
  neutral: 'bg-surface-secondary text-text-secondary',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
}

export function Badge({
  children,
  className,
  variant = 'neutral',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-caption',
        variantClass[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
