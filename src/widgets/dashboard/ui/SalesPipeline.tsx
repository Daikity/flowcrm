import type { PipelineItem } from '@/entities/dashboard'
import { formatCurrency } from '@/shared/lib'
import { Card, CardDescription, CardHeader, CardTitle, Typography } from '@/shared/ui'

interface SalesPipelineProps {
  data: PipelineItem[]
}

export function SalesPipeline({ data }: SalesPipelineProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales pipeline</CardTitle>
        <CardDescription>Стадии воронки и объём сделок</CardDescription>
      </CardHeader>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.stage} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Typography variant="small" className="font-medium">
                {item.stage}
              </Typography>
              <Typography variant="small" muted>
                {item.count} · {formatCurrency(item.value)}
              </Typography>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
