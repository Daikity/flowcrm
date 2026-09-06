import type { CustomerStatus } from '../model/types'
import { Badge } from '@/shared/ui'

const statusLabel: Record<CustomerStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  lead: 'Lead',
}

const statusVariant: Record<
  CustomerStatus,
  'success' | 'neutral' | 'warning'
> = {
  active: 'success',
  inactive: 'neutral',
  lead: 'warning',
}

interface CustomerStatusBadgeProps {
  status: CustomerStatus
}

export function CustomerStatusBadge({ status }: CustomerStatusBadgeProps) {
  return <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>
}
