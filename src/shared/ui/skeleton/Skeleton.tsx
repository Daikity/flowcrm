import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

const roundedClass = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
} as const

export function Skeleton({
  className,
  width,
  height = '1rem',
  rounded = 'md',
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'animate-pulse bg-surface-secondary',
        roundedClass[rounded],
        className,
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  )
}
