import { EmptyState } from '@/shared/ui'

export function DashboardEmpty() {
  return (
    <EmptyState
      title="Нет данных для dashboard"
      description="Как только появятся сделки и активность, здесь будет обзор."
    />
  )
}
