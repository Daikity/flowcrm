import { useTranslation } from 'react-i18next'
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
  changeLabel: string
}

function KpiCard({ label, value, change, changeLabel }: KpiCardProps) {
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
        {formatPercent(change)} {changeLabel}
      </Typography>
    </Card>
  )
}

export function KpiGrid({ stats }: KpiGridProps) {
  const { t } = useTranslation()

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        label={t('dashboard.kpi.revenue')}
        value={formatCurrency(stats.revenue)}
        change={stats.revenueChange}
        changeLabel={t('dashboard.kpi.vsLastPeriod')}
      />
      <KpiCard
        label={t('dashboard.kpi.deals')}
        value={String(stats.deals)}
        change={stats.dealsChange}
        changeLabel={t('dashboard.kpi.vsLastPeriod')}
      />
      <KpiCard
        label={t('dashboard.kpi.customers')}
        value={String(stats.customers)}
        change={stats.customersChange}
        changeLabel={t('dashboard.kpi.vsLastPeriod')}
      />
      <KpiCard
        label={t('dashboard.kpi.conversion')}
        value={`${stats.conversion}%`}
        change={stats.conversionChange}
        changeLabel={t('dashboard.kpi.vsLastPeriod')}
      />
    </div>
  )
}
