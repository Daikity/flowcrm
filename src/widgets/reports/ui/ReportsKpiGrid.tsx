import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        label={t('reports.kpi.revenue')}
        value={formatCurrency(kpis.revenue)}
      />
      <KpiCard label={t('reports.kpi.wonDeals')} value={String(kpis.wonDeals)} />
      <KpiCard label={t('reports.kpi.winRate')} value={`${kpis.winRate}%`} />
      <KpiCard
        label={t('reports.kpi.pipelineValue')}
        value={formatCurrency(kpis.pipelineValue)}
      />
    </div>
  )
}
