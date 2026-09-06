import { matchPath, useLocation } from 'react-router-dom'
import { getSessionUser, LogoutButton } from '@/features/auth'
import { routeTitles } from '@/shared/config'
import { Avatar, Button, ShellHeader, Typography } from '@/shared/ui'

function resolvePageTitle(pathname: string) {
  const exact = routeTitles[pathname]
  if (exact) return exact

  for (const [pattern, title] of Object.entries(routeTitles)) {
    if (pattern.includes(':') && matchPath({ path: pattern, end: true }, pathname)) {
      return title
    }
  }

  return 'FlowCRM'
}

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-6">
      <path
        d="M10 2.5a4.5 4.5 0 0 0-4.5 4.5v1.3c0 .7-.2 1.4-.6 2L3.7 12a1 1 0 0 0 .8 1.6h11a1 1 0 0 0 .8-1.6l-1.2-1.8c-.4-.6-.6-1.3-.6-2V7A4.5 4.5 0 0 0 10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8 15.5a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Header() {
  const { pathname } = useLocation()
  const title = resolvePageTitle(pathname)
  const user = getSessionUser()

  return (
    <ShellHeader className="justify-between gap-4">
      <Typography variant="h3">{title}</Typography>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="size-9 px-0"
          aria-label="Уведомления"
        >
          <BellIcon />
        </Button>
        {user ? <Avatar name={user.name} size="sm" /> : null}
        <LogoutButton />
      </div>
    </ShellHeader>
  )
}
