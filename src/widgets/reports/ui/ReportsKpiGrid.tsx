import type { ReportsKpis } from '@/entities/report'
import { formatCurrency } from '@/shared/lib'
import { Card, Typography } from '@/shared/ui'

interface ReportsKpiGridProps {
  kpis: ReportsKpis
}

interface KpiCardProps {
  label: string
  value: string
}

function KpiCard({ label, value }: KpiCardProps) {
  return (
    <Card className="space-y-3">
      <Typography variant="caption" muted>
        {label}
      </Typography>
      <Typography variant="h2">{value}</Typography>
    </Card>
  )
}

export function ReportsKpiGrid({ kpis }: ReportsKpiGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard label="Revenue" value={formatCurrency(kpis.revenue)} />
      <KpiCard label="Won Deals" value={String(kpis.wonDeals)} />
      <KpiCard label="Win Rate" value={`${kpis.winRate}%`} />
      <KpiCard
        label="Pipeline Value"
        value={formatCurrency(kpis.pipelineValue)}
      />
    </div>
  )
}
