import { useTranslation } from 'react-i18next'
import type { CustomerStatus } from '../model/types'
import { Badge } from '@/shared/ui'

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
  const { t } = useTranslation()

  return (
    <Badge variant={statusVariant[status]}>
      {t(`enums.customerStatus.${status}`)}
    </Badge>
  )
}
