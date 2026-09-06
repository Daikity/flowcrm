import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTranslation } from 'react-i18next'
import type { ReportPipelineItem } from '@/entities/report'
import { formatCurrency } from '@/shared/lib'
import { Card, CardDescription, CardHeader, CardTitle, Typography } from '@/shared/ui'

const BAR_FILL = '#2563eb'
const BAR_FILL_HOVER = '#1d4ed8'

interface ReportsPipelineChartProps {
  data: ReportPipelineItem[]
}

function parseActiveIndex(value: unknown): number | null {
  if (value == null || value === '') return null
  const next = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(next) ? next : null
}

export function ReportsPipelineChart({ data }: ReportsPipelineChartProps) {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const hasData = data.some((item) => item.count > 0)

  const chartData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        label: t(`enums.dealStage.${item.stage}`),
      })),
    [data, t],
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('reports.pipeline.title')}</CardTitle>
        <CardDescription>{t('reports.pipeline.description')}</CardDescription>
      </CardHeader>
      {!hasData ? (
        <Typography muted className="py-16 text-center">
          {t('reports.pipeline.empty')}
        </Typography>
      ) : (
        <div className="space-y-6">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                onMouseMove={(state) => {
                  setActiveIndex(parseActiveIndex(state.activeTooltipIndex))
                }}
                onMouseLeave={() => setActiveIndex(null)}
              >
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
                  cursor={false}
                  formatter={(value) =>
                    formatCurrency(Number(value))
                  }
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: '#d5dde5',
                    fontSize: 13,
                  }}
                />
                <Bar
                  dataKey="value"
                  fill={BAR_FILL}
                  radius={[6, 6, 0, 0]}
                  activeBar={false}
                  shape={(props) => {
                    const isActive = props.originalDataIndex === activeIndex
                    return (
                      <Rectangle
                        x={props.x}
                        y={props.y}
                        width={props.width}
                        height={props.height}
                        radius={props.radius}
                        fill={isActive ? BAR_FILL_HOVER : BAR_FILL}
                        style={{
                          fill: isActive ? BAR_FILL_HOVER : BAR_FILL,
                          transition: 'fill 200ms ease',
                        }}
                      />
                    )
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {chartData.map((item) => {
              const maxValue = Math.max(...chartData.map((row) => row.value), 1)
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
