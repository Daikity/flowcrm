import {
  DEAL_STAGE_LABEL,
  DEAL_STAGES,
  type DealStage,
} from '@/entities/deal'
import type { User } from '@/entities/user'
import { DatePicker, Select } from '@/shared/ui'

interface ReportFiltersProps {
  from: string
  to: string
  ownerId: string
  stage: DealStage | ''
  users: User[]
  onFromChange: (value: string) => void
  onToChange: (value: string) => void
  onOwnerChange: (value: string) => void
  onStageChange: (value: DealStage | '') => void
}

const stageOptions = [
  { value: '', label: 'All stages' },
  ...DEAL_STAGES.map((stage) => ({
    value: stage,
    label: DEAL_STAGE_LABEL[stage],
  })),
]

export function ReportFilters({
  from,
  to,
  ownerId,
  stage,
  users,
  onFromChange,
  onToChange,
  onOwnerChange,
  onStageChange,
}: ReportFiltersProps) {
  const ownerOptions = [
    { value: '', label: 'All owners' },
    ...users.map((user) => ({ value: user.id, label: user.name })),
  ]

  return (
    <div className="flex flex-wrap items-end gap-2">
      <DatePicker
        label="From"
        value={from}
        max={to || undefined}
        onChange={onFromChange}
        className="w-44"
      />
      <DatePicker
        label="To"
        value={to}
        min={from || undefined}
        onChange={onToChange}
        className="w-44"
      />
      <Select
        label="Owner"
        options={ownerOptions}
        value={ownerId}
        onChange={onOwnerChange}
        className="w-44"
      />
      <Select
        label="Stage"
        options={stageOptions}
        value={stage}
        onChange={(value) => onStageChange(value as DealStage | '')}
        className="w-44"
      />
    </div>
  )
}
