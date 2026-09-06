import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'

export interface AppShellProps {
  sidebar: ReactNode
  header: ReactNode
  children: ReactNode
  className?: string
}

export function AppShell({ sidebar, header, children, className }: AppShellProps) {
  return (
    <div className={cn('flex min-h-screen bg-background text-text-primary', className)}>
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        {header}
        <ShellMain>{children}</ShellMain>
      </div>
    </div>
  )
}

export interface ShellSlotProps {
  children: ReactNode
  className?: string
}

export function ShellSidebar({ children, className }: ShellSlotProps) {
  return (
    <aside
      className={cn(
        'flex w-60 shrink-0 flex-col border-r border-border bg-surface',
        className,
      )}
    >
      {children}
    </aside>
  )
}

export function ShellHeader({ children, className }: ShellSlotProps) {
  return (
    <header
      className={cn(
        'flex h-14 shrink-0 items-center border-b border-border bg-surface px-6',
        className,
      )}
    >
      {children}
    </header>
  )
}

export function ShellMain({ children, className }: ShellSlotProps) {
  return <main className={cn('flex-1 overflow-auto p-6', className)}>{children}</main>
}
