import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib'

type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'small'
  | 'caption'

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  variant?: TypographyVariant
  children: ReactNode
  muted?: boolean
}

const defaultTag: Record<TypographyVariant, ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  small: 'p',
  caption: 'span',
}

const variantClass: Record<TypographyVariant, string> = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  body: 'text-body',
  small: 'text-small',
  caption: 'text-caption',
}

export function Typography({
  as,
  variant = 'body',
  muted = false,
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = as ?? defaultTag[variant]

  return (
    <Component
      className={cn(
        variantClass[variant],
        muted ? 'text-text-secondary' : 'text-text-primary',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
