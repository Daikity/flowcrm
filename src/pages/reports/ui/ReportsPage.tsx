import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { DealStage } from '@/entities/deal'
import type { ReportsParams } from '@/entities/report'
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

function parseParams(searchParams: URLSearchParams): ReportsParams & {
  fromInput: string
  toInput: string
  ownerInput: string
  stageInput: DealStage | ''
} {
  const stage = searchParams.get('stage') as DealStage | null

  return {
    from: searchParams.get('from') ?? undefined,
    to: searchParams.get('to') ?? undefined,
    ownerId: searchParams.get('ownerId') ?? undefined,
    stage: stage ?? undefined,
    fromInput: searchParams.get('from') ?? '',
    toInput: searchParams.get('to') ?? '',
    ownerInput: searchParams.get('ownerId') ?? '',
    stageInput: stage ?? '',
  }
}

function setParam(
  prev: URLSearchParams,
  key: string,
  value: string | undefined,
) {
  const next = new URLSearchParams(prev)
  if (!value) {
    next.delete(key)
  } else {
    next.set(key, value)
  }
  return next
}

export function ReportsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const parsed = useMemo(() => parseParams(searchParams), [searchParams])

  const queryParams: ReportsParams = {
    from: parsed.from,
    to: parsed.to,
    ownerId: parsed.ownerId,
    stage: parsed.stage,
  }

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

  const isEmpty =
    data.kpis.wonDeals === 0 &&
    data.kpis.pipelineValue === 0 &&
    data.pipeline.every((item) => item.count === 0)

  return (
    <div className={`space-y-6 ${isFetching ? 'opacity-70' : ''}`}>
      <ReportsHeader />

      <ReportFilters
        from={parsed.fromInput}
        to={parsed.toInput}
        ownerId={parsed.ownerInput}
        stage={parsed.stageInput}
        users={users}
        onFromChange={(value) =>
          setSearchParams((prev) => setParam(prev, 'from', value || undefined))
        }
        onToChange={(value) =>
          setSearchParams((prev) => setParam(prev, 'to', value || undefined))
        }
        onOwnerChange={(value) =>
          setSearchParams((prev) =>
            setParam(prev, 'ownerId', value || undefined),
          )
        }
        onStageChange={(value) =>
          setSearchParams((prev) =>
            setParam(prev, 'stage', value || undefined),
          )
        }
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
