import type { ReactNode } from 'react'
import { EmptyState } from '@/shared/ui'

interface DealsEmptyProps {
  hasFilters: boolean
  action?: ReactNode
}

export function DealsEmpty({ hasFilters, action }: DealsEmptyProps) {
  return (
    <EmptyState
      title="No deals found."
      description={
        hasFilters
          ? 'Try changing your filters or create a new deal.'
          : 'Create your first deal to get started.'
      }
      action={action}
    />
  )
}
