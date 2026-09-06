import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type {
  TaskDueFilter,
  TaskListItem,
  TaskPriority,
  TasksParams,
  TaskStatus,
} from '@/entities/task'
import { CreateTaskButton } from '@/features/task-create'
import { EditTaskModal } from '@/features/task-edit'
import { TaskFilters } from '@/features/task-filter'
import { TaskSearch } from '@/features/task-search'
import {
  useGetCustomersQuery,
  useGetDealsQuery,
  useGetTasksQuery,
  useGetUsersQuery,
} from '@/shared/api'
import { useDebouncedValue } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import {
  TasksBoard,
  TasksEmpty,
  TasksError,
  TasksPagination,
  TasksSkeleton,
} from '@/widgets/tasks-board'

type SortBy = NonNullable<TasksParams['sortBy']>

const DUE_FILTERS = new Set<TaskDueFilter>([
  'overdue',
  'today',
  'upcoming',
  'week',
])

function parseDue(value: string | null): TaskDueFilter | undefined {
  if (!value) return undefined
  return DUE_FILTERS.has(value as TaskDueFilter)
    ? (value as TaskDueFilter)
    : undefined
}

function parseParams(searchParams: URLSearchParams): TasksParams & {
  searchInput: string
} {
  const page = Number(searchParams.get('page') ?? '1')
  const sortBy = (searchParams.get('sortBy') as SortBy | null) ?? 'dueDate'
  const sortOrder = searchParams.get('sortOrder') === 'desc' ? 'desc' : 'asc'

  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    limit: 10,
    search: searchParams.get('search') ?? undefined,
    searchInput: searchParams.get('search') ?? '',
    status: (searchParams.get('status') as TaskStatus | null) ?? undefined,
    priority:
      (searchParams.get('priority') as TaskPriority | null) ?? undefined,
    assigneeId: searchParams.get('assigneeId') ?? undefined,
    due: parseDue(searchParams.get('due')),
    sortBy,
    sortOrder,
  }
}

export function TasksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const parsed = useMemo(() => parseParams(searchParams), [searchParams])
  const [searchInput, setSearchInput] = useState(parsed.searchInput)
  const [prevSearchFromUrl, setPrevSearchFromUrl] = useState(parsed.searchInput)
  const debouncedSearch = useDebouncedValue(searchInput, 300)

  if (parsed.searchInput !== prevSearchFromUrl) {
    setPrevSearchFromUrl(parsed.searchInput)
    setSearchInput(parsed.searchInput)
  }

  const [editTask, setEditTask] = useState<TaskListItem | null>(null)

  const { data: users = [] } = useGetUsersQuery()
  const { data: customersData } = useGetCustomersQuery({
    page: 1,
    limit: 100,
    sortBy: 'company',
    sortOrder: 'asc',
  })
  const { data: dealsData } = useGetDealsQuery({
    page: 1,
    limit: 100,
    sortBy: 'title',
    sortOrder: 'asc',
    view: 'kanban',
  })
  const customers = customersData?.items ?? []
  const deals = dealsData?.items ?? []

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

  const queryParams: TasksParams = {
    page: parsed.page,
    limit: parsed.limit,
    search: parsed.search,
    status: parsed.status,
    priority: parsed.priority,
    assigneeId: parsed.assigneeId,
    due: parsed.due,
    sortBy: parsed.sortBy,
    sortOrder: parsed.sortOrder,
  }

  const { data, currentData, isLoading, isError, isFetching, refetch } =
    useGetTasksQuery(queryParams)

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

  function updateParams(
    patch: Record<string, string | null>,
    resetPage = false,
  ) {
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

  const hasFilters = Boolean(
    parsed.search ||
      parsed.status ||
      parsed.priority ||
      parsed.assigneeId ||
      parsed.due,
  )
  const listData = data
  const showSkeleton = isLoading && !listData
  const isPagePending = isFetching && !currentData

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Typography variant="h1">Tasks</Typography>
          <Typography muted>
            Track work linked to customers and deals
          </Typography>
        </div>
        <CreateTaskButton
          users={users}
          customers={customers}
          deals={deals}
        />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <TaskSearch value={searchInput} onChange={setSearchInput} />
        <TaskFilters
          status={parsed.status ?? ''}
          priority={parsed.priority ?? ''}
          assigneeId={parsed.assigneeId ?? ''}
          due={parsed.due ?? ''}
          users={users}
          onStatusChange={(value) =>
            updateParams({ status: value || null }, true)
          }
          onPriorityChange={(value) =>
            updateParams({ priority: value || null }, true)
          }
          onAssigneeChange={(value) =>
            updateParams({ assigneeId: value || null }, true)
          }
          onDueChange={(value) => updateParams({ due: value || null }, true)}
        />
      </div>

      {showSkeleton ? <TasksSkeleton /> : null}

      {isError ? <TasksError onRetry={() => void refetch()} /> : null}

      {!showSkeleton && !isError && currentData && currentData.items.length === 0 ? (
        <TasksEmpty
          hasFilters={hasFilters}
          action={
            <CreateTaskButton
              users={users}
              customers={customers}
              deals={deals}
            />
          }
        />
      ) : null}

      {!showSkeleton && !isError && listData && listData.items.length > 0 ? (
        <div
          className={`space-y-4 transition-opacity ${isPagePending || isFetching ? 'opacity-60 pointer-events-none' : ''}`}
          aria-busy={isPagePending || isFetching}
        >
          <TasksBoard
            tasks={listData.items}
            users={users}
            onEdit={setEditTask}
          />
          <TasksPagination
            page={parsed.page}
            totalPages={listData.totalPages}
            total={listData.total}
            onPageChange={(page) => updateParams({ page: String(page) })}
          />
        </div>
      ) : null}

      <EditTaskModal
        task={editTask}
        users={users}
        customers={customers}
        deals={deals}
        open={Boolean(editTask)}
        onClose={() => setEditTask(null)}
      />
    </div>
  )
}
