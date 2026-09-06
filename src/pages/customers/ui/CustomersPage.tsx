import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type {
  Customer,
  CustomerIndustry,
  CustomersParams,
  CustomerStatus,
} from '@/entities/customer'
import { CreateCustomerButton } from '@/features/customer-create'
import { DeleteCustomerModal } from '@/features/customer-delete'
import { EditCustomerModal } from '@/features/customer-edit'
import { CustomerFilters } from '@/features/customer-filter'
import { CustomerSearch } from '@/features/customer-search'
import { useGetCustomersQuery, useGetUsersQuery } from '@/shared/api'
import { useDebouncedValue } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import {
  CustomerPagination,
  CustomerTable,
  CustomerTableEmpty,
  CustomerTableError,
  CustomerTableSkeleton,
} from '@/widgets/customer-table'

type SortBy = NonNullable<CustomersParams['sortBy']>

function parseParams(searchParams: URLSearchParams): CustomersParams & {
  searchInput: string
} {
  const page = Number(searchParams.get('page') ?? '1')
  const sortBy = (searchParams.get('sortBy') as SortBy | null) ?? 'createdAt'
  const sortOrder =
    searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc'

  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    limit: 10,
    search: searchParams.get('search') ?? undefined,
    searchInput: searchParams.get('search') ?? '',
    status: (searchParams.get('status') as CustomerStatus | null) ?? undefined,
    industry:
      (searchParams.get('industry') as CustomerIndustry | null) ?? undefined,
    ownerId: searchParams.get('ownerId') ?? undefined,
    sortBy,
    sortOrder,
  }
}

export function CustomersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const parsed = useMemo(() => parseParams(searchParams), [searchParams])
  const [searchInput, setSearchInput] = useState(parsed.searchInput)
  const [prevSearchFromUrl, setPrevSearchFromUrl] = useState(parsed.searchInput)
  const debouncedSearch = useDebouncedValue(searchInput, 300)

  if (parsed.searchInput !== prevSearchFromUrl) {
    setPrevSearchFromUrl(parsed.searchInput)
    setSearchInput(parsed.searchInput)
  }

  const [editCustomer, setEditCustomer] = useState<Customer | null>(null)
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | null>(null)

  const { data: users = [] } = useGetUsersQuery()

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

  const queryParams: CustomersParams = {
    page: parsed.page,
    limit: parsed.limit,
    search: parsed.search,
    status: parsed.status,
    industry: parsed.industry,
    ownerId: parsed.ownerId,
    sortBy: parsed.sortBy,
    sortOrder: parsed.sortOrder,
  }

  const { data, currentData, isLoading, isError, isFetching, refetch } =
    useGetCustomersQuery(queryParams)

  // Синхронизируем URL только когда сервер реально ответил с другой page
  // (например после delete). Нельзя опираться на `data` — там ещё старая страница.
  useEffect(() => {
    if (!currentData) return
    if (currentData.page === parsed.page) return

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('page', String(currentData.page))
        return next
      },
      { replace: true },
    )
  }, [currentData, parsed.page, setSearchParams])

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
    const nextOrder =
      isSame && parsed.sortOrder === 'asc' ? 'desc' : 'asc'

    updateParams(
      {
        sortBy: column,
        sortOrder: isSame ? nextOrder : 'asc',
      },
      true,
    )
  }

  const hasFilters = Boolean(
    parsed.search || parsed.status || parsed.industry || parsed.ownerId,
  )

  // `data` сохраняет предыдущую страницу на время запроса; `currentData` — только актуальный ответ
  const listData = data
  const showSkeleton = isLoading && !listData
  const isPagePending = isFetching && !currentData

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Typography variant="h1">Customers</Typography>
          <Typography muted>Manage CRM customer records</Typography>
        </div>
        <CreateCustomerButton users={users} />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <CustomerSearch value={searchInput} onChange={setSearchInput} />
        <CustomerFilters
          status={parsed.status ?? ''}
          industry={parsed.industry ?? ''}
          ownerId={parsed.ownerId ?? ''}
          users={users}
          onStatusChange={(value) =>
            updateParams({ status: value || null }, true)
          }
          onIndustryChange={(value) =>
            updateParams({ industry: value || null }, true)
          }
          onOwnerChange={(value) =>
            updateParams({ ownerId: value || null }, true)
          }
        />
      </div>

      {showSkeleton ? <CustomerTableSkeleton /> : null}

      {isError ? (
        <CustomerTableError onRetry={() => void refetch()} />
      ) : null}

      {!showSkeleton && !isError && currentData && currentData.items.length === 0 ? (
        <CustomerTableEmpty
          hasFilters={hasFilters}
          action={<CreateCustomerButton users={users} />}
        />
      ) : null}

      {!showSkeleton && !isError && listData && listData.items.length > 0 ? (
        <div
          className={`space-y-4 transition-opacity ${isPagePending || isFetching ? 'opacity-60 pointer-events-none' : ''}`}
          aria-busy={isPagePending || isFetching}
        >
          <CustomerTable
            customers={listData.items}
            users={users}
            sortBy={parsed.sortBy}
            sortOrder={parsed.sortOrder}
            onSort={handleSort}
            onEdit={setEditCustomer}
            onDelete={setDeleteCustomer}
          />
          <CustomerPagination
            page={parsed.page}
            totalPages={listData.totalPages}
            total={listData.total}
            onPageChange={(page) => updateParams({ page: String(page) })}
          />
        </div>
      ) : null}

      <EditCustomerModal
        customer={editCustomer}
        users={users}
        open={Boolean(editCustomer)}
        onClose={() => setEditCustomer(null)}
      />

      <DeleteCustomerModal
        customer={deleteCustomer}
        open={Boolean(deleteCustomer)}
        onClose={() => setDeleteCustomer(null)}
      />
    </div>
  )
}
