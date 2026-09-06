import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DEAL_STAGES, type DealStage } from '@/entities/deal'
import type { User } from '@/entities/user'
import { Select } from '@/shared/ui'

interface DealFiltersProps {
  stage?: DealStage | ''
  ownerId?: string
  users: User[]
  onStageChange: (value: DealStage | '') => void
  onOwnerChange: (value: string) => void
}

export function DealFilters({
  stage = '',
  ownerId = '',
  users,
  onStageChange,
  onOwnerChange,
}: DealFiltersProps) {
  const { t } = useTranslation()

  const stageOptions = useMemo(
    () => [
      { value: '', label: t('deals.filters.allStages') },
      ...DEAL_STAGES.map((item) => ({
        value: item,
        label: t(`enums.dealStage.${item}`),
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
