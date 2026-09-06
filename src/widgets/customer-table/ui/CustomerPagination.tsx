import { Button } from '@/shared/ui'

interface CustomerPaginationProps {
  page: number
  totalPages: number
  total: number
  onPageChange: (page: number) => void
}

export function CustomerPagination({
  page,
  totalPages,
  total,
  onPageChange,
}: CustomerPaginationProps) {
  if (totalPages <= 1) {
    return (
      <p className="text-small text-text-secondary">
        {total} customer{total === 1 ? '' : 's'}
      </p>
    )
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(
    Math.max(0, page - 3),
    Math.min(totalPages, page + 2),
  )

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-small text-text-secondary">
        Page {page} of {totalPages} · {total} total
      </p>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </Button>
        {pages.map((item) => (
          <Button
            key={item}
            type="button"
            variant={item === page ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
