import { Typography } from '@/shared/ui'

export function DashboardHeader() {
  return (
    <div className="space-y-1">
      <Typography variant="h1">Dashboard</Typography>
      <Typography muted>
        Обзор продаж, воронки и недавней активности команды.
      </Typography>
    </div>
  )
}
