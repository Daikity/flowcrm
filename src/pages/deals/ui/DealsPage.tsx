import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type {
  DealListItem,
  DealStage,
  DealsParams,
  DealsView,
} from '@/entities/deal'
import { CreateDealButton } from '@/features/deal-create'
import { EditDealModal } from '@/features/deal-edit'
import { DealFilters } from '@/features/deal-filter'
import { DealSearch } from '@/features/deal-search'
import {
  useGetCustomersQuery,
  useGetDealsQuery,
  useGetUsersQuery,
} from '@/shared/api'
import { useDebouncedValue } from '@/shared/lib'
import { Button, Typography } from '@/shared/ui'
import { DealsKanban } from '@/widgets/deals-kanban'
import {
  DealsEmpty,
  DealsError,
  DealsPagination,
  DealsPipelineTotals,
  DealsSkeleton,
  DealsTable,
} from '@/widgets/deals-table'

type SortBy = NonNullable<DealsParams['sortBy']>

function parseParams(searchParams: URLSearchParams): DealsParams & {
  searchInput: string
} {
  const page = Number(searchParams.get('page') ?? '1')
  const sortBy = (searchParams.get('sortBy') as SortBy | null) ?? 'createdAt'
  const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc'
  const view =
    searchParams.get('view') === 'kanban' ? 'kanban' : ('table' as DealsView)

  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    limit: 10,
    search: searchParams.get('search') ?? undefined,
    searchInput: searchParams.get('search') ?? '',
    stage: (searchParams.get('stage') as DealStage | null) ?? undefined,
    ownerId: searchParams.get('ownerId') ?? undefined,
    sortBy,
    sortOrder,
    view,
  }
}

export function DealsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const parsed = useMemo(() => parseParams(searchParams), [searchParams])
  const [searchInput, setSearchInput] = useState(parsed.searchInput)
  const [prevSearchFromUrl, setPrevSearchFromUrl] = useState(parsed.searchInput)
  const debouncedSearch = useDebouncedValue(searchInput, 300)

  if (parsed.searchInput !== prevSearchFromUrl) {
    setPrevSearchFromUrl(parsed.searchInput)
    setSearchInput(parsed.searchInput)
  }

  const [editDeal, setEditDeal] = useState<DealListItem | null>(null)

  const { data: users = [] } = useGetUsersQuery()
  const { data: customersData } = useGetCustomersQuery({
    page: 1,
    limit: 100,
    sortBy: 'company',
    sortOrder: 'asc',
  })
  const customers = customersData?.items ?? []

  useEffect(() => {
    setSearchParams(
      (prev) => {
        const current = prev.get('search') ?? ''
        if (debouncedSearch === current) return prev

        const next = new URLSearchParams(prev)
        if (debouncedSearch) {
          next.set('search', debouncedSearch)
        } else {
          next.delete('search')
        }
        next.set('page', '1')
        return next
      },
      { replace: true },
    )
  }, [debouncedSearch, setSearchParams])

  const queryParams: DealsParams = {
    page: parsed.page,
    limit: parsed.limit,
    search: parsed.search,
    stage: parsed.stage,
    ownerId: parsed.ownerId,
    sortBy: parsed.sortBy,
    sortOrder: parsed.sortOrder,
    view: parsed.view,
  }

  const { data, currentData, isLoading, isError, isFetching, refetch } =
    useGetDealsQuery(queryParams)

  useEffect(() => {
    if (!currentData) return
    if (parsed.view === 'kanban') return
    if (currentData.page === parsed.page) return

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('page', String(currentData.page))
        return next
      },
      { replace: true },
    )
  }, [currentData, parsed.page, parsed.view, setSearchParams])

  function updateParams(patch: Record<string, string | null>, resetPage = false) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)

      for (const [key, value] of Object.entries(patch)) {
        if (value === null || value === '') {
          next.delete(key)
        } else {
          next.set(key, value)
        }
      }

      if (resetPage) {
        next.set('page', '1')
      }

      return next
    })
  }

  function handleSort(column: SortBy) {
    const isSame = parsed.sortBy === column
    const nextOrder = isSame && parsed.sortOrder === 'asc' ? 'desc' : 'asc'

    updateParams(
      {
        sortBy: column,
        sortOrder: isSame ? nextOrder : 'asc',
      },
      true,
    )
  }

  function setView(view: DealsView) {
    updateParams(
      {
        view: view === 'table' ? null : view,
        page: '1',
      },
      false,
    )
  }

  const hasFilters = Boolean(parsed.search || parsed.stage || parsed.ownerId)
  const listData = data
  const showSkeleton = isLoading && !listData
  const isPagePending = isFetching && !currentData
  const isTable = parsed.view === 'table'

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Typography variant="h1">Deals</Typography>
          <Typography muted>Pipeline table and kanban board</Typography>
        </div>
        <CreateDealButton users={users} customers={customers} />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <DealSearch value={searchInput} onChange={setSearchInput} />
        <div className="flex flex-wrap items-end gap-3">
          <DealFilters
            stage={parsed.stage ?? ''}
            ownerId={parsed.ownerId ?? ''}
            users={users}
            onStageChange={(value) =>
              updateParams({ stage: value || null }, true)
            }
            onOwnerChange={(value) =>
              updateParams({ ownerId: value || null }, true)
            }
          />
          <div
            className="inline-flex rounded-md border border-border p-0.5"
            role="group"
            aria-label="Deals view"
          >
            <Button
              type="button"
              size="sm"
              variant={isTable ? 'primary' : 'ghost'}
              onClick={() => setView('table')}
            >
              Table
            </Button>
            <Button
              type="button"
              size="sm"
              variant={!isTable ? 'primary' : 'ghost'}
              onClick={() => setView('kanban')}
            >
              Kanban
            </Button>
          </div>
        </div>
      </div>

      {showSkeleton ? <DealsSkeleton /> : null}

      {isError ? <DealsError onRetry={() => void refetch()} /> : null}

      {/* `data`/`listData` держит предыдущий ответ на время fetch — totals не должны исчезать */}
      {!showSkeleton && !isError && listData ? (
        <div
          className={`transition-opacity ${isPagePending || isFetching ? 'opacity-60' : ''}`}
          aria-busy={isPagePending || isFetching}
        >
          <DealsPipelineTotals totals={listData.totals} />
        </div>
      ) : null}

      {!showSkeleton && !isError && currentData && currentData.items.length === 0 ? (
        <DealsEmpty
          hasFilters={hasFilters}
          action={<CreateDealButton users={users} customers={customers} />}
        />
      ) : null}

      {!showSkeleton && !isError && listData && listData.items.length > 0 ? (
        <div
          className={`space-y-4 transition-opacity ${isPagePending || isFetching ? 'opacity-60 pointer-events-none' : ''}`}
          aria-busy={isPagePending || isFetching}
        >
          {isTable ? (
            <>
              <DealsTable
                deals={listData.items}
                users={users}
                sortBy={parsed.sortBy}
                sortOrder={parsed.sortOrder}
                onSort={handleSort}
                onEdit={setEditDeal}
              />
              <DealsPagination
                page={parsed.page}
                totalPages={listData.totalPages}
                total={listData.total}
                onPageChange={(page) => updateParams({ page: String(page) })}
              />
            </>
          ) : (
            <DealsKanban
              deals={listData.items}
              users={users}
              totals={listData.totals}
              onEdit={setEditDeal}
            />
          )}
        </div>
      ) : null}

      <EditDealModal
        deal={editDeal}
        users={users}
        customers={customers}
        open={Boolean(editDeal)}
        onClose={() => setEditDeal(null)}
      />
    </div>
  )
}
