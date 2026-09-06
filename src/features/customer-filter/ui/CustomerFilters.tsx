import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { CustomerIndustry, CustomerStatus } from '@/entities/customer'
import type { User } from '@/entities/user'
import { Select } from '@/shared/ui'

interface CustomerFiltersProps {
  status?: CustomerStatus | ''
  industry?: CustomerIndustry | ''
  ownerId?: string
  users: User[]
  onStatusChange: (value: CustomerStatus | '') => void
  onIndustryChange: (value: CustomerIndustry | '') => void
  onOwnerChange: (value: string) => void
}

const STATUSES = ['active', 'inactive', 'lead'] as const
const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Retail',
  'Manufacturing',
] as const

export function CustomerFilters({
  status = '',
  industry = '',
  ownerId = '',
  users,
  onStatusChange,
  onIndustryChange,
  onOwnerChange,
}: CustomerFiltersProps) {
  const { t } = useTranslation()

  const statusOptions = useMemo(
    () => [
      { value: '', label: t('customers.filters.allStatuses') },
      ...STATUSES.map((item) => ({
        value: item,
        label: t(`enums.customerStatus.${item}`),
      })),
    ],
    [t],
  )

  const industryOptions = useMemo(
    () => [
      { value: '', label: t('customers.filters.allIndustries') },
      ...INDUSTRIES.map((item) => ({
        value: item,
        label: t(`enums.industry.${item}`),
      })),
    ],
    [t],
  )

  const ownerOptions = useMemo(
    () => [
      { value: '', label: t('common.filters.allOwners') },
      ...users.map((user) => ({ value: user.id, label: user.name })),
    ],
    [t, users],
  )

  return (
    <div className="flex flex-wrap gap-2">
      <Select
        options={statusOptions}
        value={status}
        onChange={(value) => onStatusChange(value as CustomerStatus | '')}
        className="w-40"
      />
      <Select
        options={industryOptions}
        value={industry}
        onChange={(value) => onIndustryChange(value as CustomerIndustry | '')}
        className="w-44"
      />
      <Select
        options={ownerOptions}
        value={ownerId}
        onChange={onOwnerChange}
        className="w-44"
      />
    </div>
  )
}
