import {
  DEAL_STAGE_LABEL,
  DEAL_STAGES,
  type DealStage,
} from '@/entities/deal'
import type { User } from '@/entities/user'
import { Select } from '@/shared/ui'

interface DealFiltersProps {
  stage?: DealStage | ''
  ownerId?: string
  users: User[]
  onStageChange: (value: DealStage | '') => void
  onOwnerChange: (value: string) => void
}

const stageOptions = [
  { value: '', label: 'All stages' },
  ...DEAL_STAGES.map((stage) => ({
    value: stage,
    label: DEAL_STAGE_LABEL[stage],
  })),
]

export function DealFilters({
  stage = '',
  ownerId = '',
  users,
  onStageChange,
  onOwnerChange,
}: DealFiltersProps) {
  const ownerOptions = [
    { value: '', label: 'All owners' },
    ...users.map((user) => ({ value: user.id, label: user.name })),
  ]

  return (
    <div className="flex flex-wrap gap-2">
      <Select
        options={stageOptions}
        value={stage}
        onChange={(value) => onStageChange(value as DealStage | '')}
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
