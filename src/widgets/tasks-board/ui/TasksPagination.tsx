import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui'

interface TasksPaginationProps {
  page: number
  totalPages: number
  total: number
  onPageChange: (page: number) => void
}

export function TasksPagination({
  page,
  totalPages,
  total,
  onPageChange,
}: TasksPaginationProps) {
  const { t } = useTranslation()

  if (totalPages <= 1) {
    return (
      <p className="text-small text-text-secondary">
        {t('tasks.pagination.count', { count: total })}
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
        {t('common.pagination.pageOf', {
          page,
          totalPages,
          total,
        })}
      </p>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          {t('common.pagination.prev')}
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
          {t('common.pagination.next')}
        </Button>
      </div>
    </div>
  )
}
