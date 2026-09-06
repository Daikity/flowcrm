import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { getSessionUser } from '@/features/auth'
import { env, mainNav, secondaryNav, type NavItem } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Avatar, ShellSidebar, Typography } from '@/shared/ui'

const navIcons: Record<string, ReactNode> = {
  '/dashboard': <DashboardIcon />,
  '/customers': <CustomersIcon />,
  '/deals': <DealsIcon />,
  '/tasks': <TasksIcon />,
  '/reports': <ReportsIcon />,
  '/settings': <SettingsIcon />,
}

function NavList({ items }: { items: NavItem[] }) {
  return (
    <nav className="flex flex-col gap-1 px-2 md:px-3">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          title={item.label}
          aria-label={item.label}
          className={({ isActive }) =>
            cn(
              'flex items-center justify-center gap-0 rounded-md px-0 py-2.5 text-body font-medium text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary md:justify-start md:gap-3 md:px-3 md:py-2',
              isActive && 'bg-surface-secondary text-text-primary',
            )
          }
        >
          <span className="inline-flex size-5 shrink-0 items-center justify-center [&_svg]:size-5">
            {navIcons[item.to]}
          </span>
          <span className="hidden truncate md:inline">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export function Sidebar() {
  const user = getSessionUser()

  return (
    <ShellSidebar className="justify-between">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex h-14 shrink-0 items-center justify-center border-b border-border px-2 md:justify-start md:px-4">
          <Typography variant="h3" className="md:hidden" aria-label={env.appName}>
            F
          </Typography>
          <Typography variant="h3" className="hidden md:block">
            {env.appName}
          </Typography>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 md:gap-6">
          <NavList items={mainNav} />

          <div className="mx-2 border-t border-border md:mx-3" />

          <NavList items={secondaryNav} />
        </div>
      </div>

      {user ? (
        <div className="border-t border-border p-2 md:p-3">
          <div className="flex items-center justify-center gap-0 rounded-md px-0 py-2 md:justify-start md:gap-3 md:px-2">
            <Avatar name={user.name} size="sm" />
            <div className="hidden min-w-0 md:block">
              <Typography variant="small" className="truncate font-medium">
                {user.name}
              </Typography>
              <Typography variant="caption" muted className="normal-case tracking-normal">
                {user.role}
              </Typography>
            </div>
          </div>
        </div>
      ) : null}
    </ShellSidebar>
  )
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3.5 3.5h5v5h-5v-5Zm8 0h5v5h-5v-5Zm-8 8h5v5h-5v-5Zm8 0h5v5h-5v-5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CustomersIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 9.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M4 16.5c.8-2.4 3-4 6-4s5.2 1.6 6 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function DealsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3.5 6.5h13v9h-13v-9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M7 6.5V5a3 3 0 0 1 6 0v1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TasksIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 5.5h12M4 10h12M4 14.5h8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ReportsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 15.5V9M8.5 15.5V5.5M13 15.5v-4M17 15.5V7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 12.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8.3 3.4 8 4.9l-1.4.5-1.3-1-1.3 1.3 1 1.3-.5 1.4-1.5.3v1.8l1.5.3.5 1.4-1 1.3 1.3 1.3 1.3-1 1.4.5.3 1.5h1.8l.3-1.5 1.4-.5 1.3 1 1.3-1.3-1-1.3.5-1.4 1.5-.3V9.1l-1.5-.3-.5-1.4 1-1.3-1.3-1.3-1.3 1-1.4-.5L11.7 3.4H8.3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
