import { Outlet } from 'react-router-dom'
import { AppShell as AppShellLayout } from '@/shared/ui'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

export function AppShell() {
  return (
    <AppShellLayout sidebar={<Sidebar />} header={<Header />}>
      <Outlet />
    </AppShellLayout>
  )
}
