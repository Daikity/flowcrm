import { NavLink } from 'react-router-dom'
import { currentUser, env, mainNav, secondaryNav } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Avatar, ShellSidebar, Typography } from '@/shared/ui'

function NavList({ items }: { items: typeof mainNav }) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            cn(
              'rounded-md px-3 py-2 text-body font-medium text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary',
              isActive && 'bg-surface-secondary text-text-primary',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export function Sidebar() {
  return (
    <ShellSidebar className="justify-between">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex h-14 shrink-0 items-center border-b border-border px-4">
          <Typography variant="h3">{env.appName}</Typography>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto py-4">
          <NavList items={mainNav} />

          <div className="mx-3 border-t border-border" />

          <NavList items={secondaryNav} />
        </div>
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-md px-2 py-2">
          <Avatar name={currentUser.name} size="sm" />
          <div className="min-w-0">
            <Typography variant="small" className="truncate font-medium">
              {currentUser.name}
            </Typography>
            <Typography variant="caption" muted className="normal-case tracking-normal">
              {currentUser.role}
            </Typography>
          </div>
        </div>
      </div>
    </ShellSidebar>
  )
}
