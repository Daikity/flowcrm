import { Typography } from '@/shared/ui'

export function ReportsHeader() {
  return (
    <div className="space-y-1">
      <Typography variant="h1">Sales Performance</Typography>
      <Typography muted>
        Выручка, win rate и pipeline — агрегация по сделкам с фильтрами.
      </Typography>
    </div>
  )
}
