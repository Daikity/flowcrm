import type { DashboardStats } from '@/entities/dashboard'
import { formatCurrency, formatPercent } from '@/shared/lib'
import { Card, Typography } from '@/shared/ui'

interface KpiGridProps {
  stats: DashboardStats
}

interface KpiCardProps {
  label: string
  value: string
  change: number
}

function KpiCard({ label, value, change }: KpiCardProps) {
  const isPositive = change >= 0

  return (
    <Card className="space-y-3">
      <Typography variant="caption" muted>
        {label}
      </Typography>
      <Typography variant="h2">{value}</Typography>
      <Typography
        variant="small"
        className={isPositive ? 'text-success' : 'text-danger'}
      >
        {formatPercent(change)} vs last period
      </Typography>
    </Card>
  )
}

export function KpiGrid({ stats }: KpiGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        label="Revenue"
        value={formatCurrency(stats.revenue)}
        change={stats.revenueChange}
      />
      <KpiCard
        label="Deals"
        value={String(stats.deals)}
        change={stats.dealsChange}
      />
      <KpiCard
        label="Customers"
        value={String(stats.customers)}
        change={stats.customersChange}
      />
      <KpiCard
        label="Conversion"
        value={`${stats.conversion}%`}
        change={stats.conversionChange}
      />
    </div>
  )
}
