export interface NavItem {
  to: string
  labelKey: string
  end?: boolean
}

export const mainNav: NavItem[] = [
  { to: '/dashboard', labelKey: 'nav.dashboard', end: true },
  { to: '/customers', labelKey: 'nav.customers' },
  { to: '/deals', labelKey: 'nav.deals' },
  { to: '/tasks', labelKey: 'nav.tasks' },
  { to: '/reports', labelKey: 'nav.reports' },
]

export const secondaryNav: NavItem[] = [
  { to: '/settings', labelKey: 'nav.settings' },
]

export const routeTitleKeys: Record<string, string> = {
  '/dashboard': 'nav.dashboard',
  '/customers': 'nav.customers',
  '/customers/:id': 'nav.customer',
  '/deals': 'nav.deals',
  '/tasks': 'nav.tasks',
  '/reports': 'nav.reports',
  '/settings': 'nav.settings',
}
