import { ReportFilters } from '@/features/report-filter'
import { useGetReportsQuery, useGetUsersQuery } from '@/shared/api'
import {
  ReportsEmpty,
  ReportsError,
  ReportsHeader,
  ReportsKpiGrid,
  ReportsOwnerTable,
  ReportsPipelineChart,
  ReportsRevenueChart,
  ReportsSkeleton,
} from '@/widgets/reports'
import { hasReportsData } from '../model/hasReportsData'
import { useReportsFilters } from '../model/useReportsFilters'

export function ReportsPage() {
  const { filters, queryParams, setFilters } = useReportsFilters()
  const { data: users = [] } = useGetUsersQuery()
  const { data, isLoading, isError, isFetching, refetch } =
    useGetReportsQuery(queryParams)

  if (isLoading) {
    return <ReportsSkeleton />
  }

  if (isError) {
    return <ReportsError onRetry={() => void refetch()} />
  }

  if (!data) {
    return <ReportsEmpty />
  }

  const isEmpty = !hasReportsData(data)

  return (
    <div className="space-y-6">
      <ReportsHeader />

      <ReportFilters
        value={filters}
        onChange={setFilters}
        users={users}
        isFetching={isFetching && !isLoading}
      />

      {isEmpty ? (
        <ReportsEmpty />
      ) : (
        <>
          <ReportsKpiGrid kpis={data.kpis} />

          <div className="grid gap-4 xl:grid-cols-2">
            <ReportsRevenueChart data={data.revenue} />
            <ReportsPipelineChart data={data.pipeline} />
          </div>

          <ReportsOwnerTable data={data.byOwner} />
        </>
      )}
    </div>
  )
}
