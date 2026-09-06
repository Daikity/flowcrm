import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface p-5 shadow-[var(--shadow-card)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('mb-4 flex flex-col gap-1', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...props }: CardProps) {
  return (
    <h3 className={cn('text-h3 text-text-primary', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className, ...props }: CardProps) {
  return (
    <p className={cn('text-small text-text-secondary', className)} {...props}>
      {children}
    </p>
  )
}
