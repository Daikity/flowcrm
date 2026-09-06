import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DEAL_STAGES, type DealStage } from '@/entities/deal'
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
  const { t } = useTranslation()

  const stageOptions = useMemo(
    () => [
      { value: '', label: t('reports.filters.allStages') },
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
    <div className="flex flex-wrap items-end gap-2">
      <DatePicker
        label={t('reports.filters.from')}
        value={from}
        max={to || undefined}
        onChange={onFromChange}
        className="w-44"
      />
      <DatePicker
        label={t('reports.filters.to')}
        value={to}
        min={from || undefined}
        onChange={onToChange}
        className="w-44"
      />
      <Select
        label={t('reports.filters.owner')}
        options={ownerOptions}
        value={ownerId}
        onChange={onOwnerChange}
        className="w-44"
      />
      <Select
        label={t('reports.filters.stage')}
        options={stageOptions}
        value={stage}
        onChange={(value) => onStageChange(value as DealStage | '')}
        className="w-44"
      />
    </div>
  )
}
