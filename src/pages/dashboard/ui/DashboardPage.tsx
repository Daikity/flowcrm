import { useGetDashboardQuery } from '@/shared/api'
import {
  DashboardEmpty,
  DashboardError,
  DashboardHeader,
  DashboardSkeleton,
  KpiGrid,
  RecentActivity,
  RecentDeals,
  RevenueChart,
  SalesPipeline,
} from '@/widgets/dashboard'

export function DashboardPage() {
  const { data, isLoading, isError, refetch } = useGetDashboardQuery()

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (isError) {
    return <DashboardError onRetry={() => void refetch()} />
  }

  if (!data) {
    return <DashboardEmpty />
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <KpiGrid stats={data.stats} />

      <div className="grid gap-4 xl:grid-cols-2">
        <RevenueChart data={data.revenue} />
        <SalesPipeline data={data.pipeline} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <RecentDeals deals={data.recentDeals} />
        <RecentActivity activities={data.recentActivity} />
      </div>
    </div>
  )
}
