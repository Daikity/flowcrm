import type { ReactNode } from 'react'
import { EmptyState } from '@/shared/ui'

interface CustomerTableEmptyProps {
  hasFilters: boolean
  action?: ReactNode
}

export function CustomerTableEmpty({
  hasFilters,
  action,
}: CustomerTableEmptyProps) {
  return (
    <EmptyState
      title="No customers found."
      description={
        hasFilters
          ? 'Try changing your filters or create a new customer.'
          : 'Create your first customer to get started.'
      }
      action={action}
    />
  )
}
