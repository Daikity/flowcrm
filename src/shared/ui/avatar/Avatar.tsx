import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  src?: string
  size?: AvatarSize
}

const sizeClass: Record<AvatarSize, string> = {
  sm: 'size-8 text-caption',
  md: 'size-10 text-small',
  lg: 'size-12 text-body',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function Avatar({
  name,
  src,
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-secondary font-semibold text-text-secondary',
        sizeClass[size],
        className,
      )}
      aria-label={name}
      {...props}
    >
      {src ? (
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  )
}
