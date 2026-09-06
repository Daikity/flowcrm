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

const statusOptions = [
  { value: '', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'lead', label: 'Lead' },
]

const industryOptions = [
  { value: '', label: 'All industries' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Manufacturing', label: 'Manufacturing' },
]

export function CustomerFilters({
  status = '',
  industry = '',
  ownerId = '',
  users,
  onStatusChange,
  onIndustryChange,
  onOwnerChange,
}: CustomerFiltersProps) {
  const ownerOptions = [
    { value: '', label: 'All owners' },
    ...users.map((user) => ({ value: user.id, label: user.name })),
  ]

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
