import { EmptyState } from '@/shared/ui'

export function ReportsEmpty() {
  return (
    <EmptyState
      title="Нет данных для reports"
      description="Измените фильтры или добавьте сделки — здесь появится аналитика."
    />
  )
}
