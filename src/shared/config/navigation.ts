export interface NavItem {
  to: string
  label: string
  end?: boolean
}

export const mainNav: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', end: true },
  { to: '/customers', label: 'Customers' },
  { to: '/deals', label: 'Deals' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/reports', label: 'Reports' },
]

export const secondaryNav: NavItem[] = [
  { to: '/settings', label: 'Settings' },
]

export const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/customers': 'Customers',
  '/customers/:id': 'Customer',
  '/deals': 'Deals',
  '/tasks': 'Tasks',
  '/reports': 'Reports',
  '/settings': 'Settings',
}
