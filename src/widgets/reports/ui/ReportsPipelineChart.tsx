import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ReportPipelineItem } from '@/entities/report'
import { formatCurrency } from '@/shared/lib'
import { Card, CardDescription, CardHeader, CardTitle, Typography } from '@/shared/ui'

interface ReportsPipelineChartProps {
  data: ReportPipelineItem[]
}

export function ReportsPipelineChart({ data }: ReportsPipelineChartProps) {
  const hasData = data.some((item) => item.count > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline by Stage</CardTitle>
        <CardDescription>Объём и количество сделок по стадиям</CardDescription>
      </CardHeader>
      {!hasData ? (
        <Typography muted className="py-16 text-center">
          Нет сделок для воронки
        </Typography>
      ) : (
        <div className="space-y-6">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#e9eef3" vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#667085', fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#667085', fontSize: 12 }}
                  tickFormatter={(value: number) =>
                    `$${Math.round(value / 1000)}k`
                  }
                />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: '#d5dde5',
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {data.map((item) => {
              const maxValue = Math.max(...data.map((row) => row.value), 1)
              return (
                <div key={item.stage} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <Typography variant="small" className="font-medium">
                      {item.label}
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
              )
            })}
          </div>
        </div>
      )}
    </Card>
  )
}
