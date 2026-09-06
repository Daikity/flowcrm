import {
  DEAL_STAGE_LABEL,
  DEAL_STAGES,
  type DealsTotals,
} from '@/entities/deal'
import { formatCurrency } from '@/shared/lib'
import { Card, Typography } from '@/shared/ui'

interface DealsPipelineTotalsProps {
  totals: DealsTotals
}

export function DealsPipelineTotals({ totals }: DealsPipelineTotalsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="p-4">
        <Typography muted className="text-small">
          Pipeline value
        </Typography>
        <Typography variant="h2" className="mt-1">
          {formatCurrency(totals.pipelineValue)}
        </Typography>
        <Typography muted className="mt-1 text-small">
          Open stages only
        </Typography>
      </Card>

      <Card className="p-4">
        <Typography muted className="text-small">
          Total value
        </Typography>
        <Typography variant="h2" className="mt-1">
          {formatCurrency(totals.totalValue)}
        </Typography>
        <Typography muted className="mt-1 text-small">
          Including won / lost
        </Typography>
      </Card>

      <Card className="p-4 sm:col-span-2">
        <Typography muted className="text-small">
          By stage
        </Typography>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {DEAL_STAGES.map((stage) => {
            const item = totals.byStage[stage]
            return (
              <div key={stage} className="min-w-24">
                <div className="text-small font-medium">
                  {DEAL_STAGE_LABEL[stage]}
                </div>
                <div className="text-small text-text-secondary">
                  {item.count} · {formatCurrency(item.value)}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
