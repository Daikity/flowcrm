import type { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-6">
          <span className="text-lg font-semibold tracking-tight">
            {import.meta.env.VITE_APP_NAME ?? 'FlowCRM'}
          </span>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
