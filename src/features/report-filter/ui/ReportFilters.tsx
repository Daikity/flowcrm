import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DEAL_STAGES, type DealStage } from '@/entities/deal'
import type { User } from '@/entities/user'
import { DatePicker, Select } from '@/shared/ui'

export type ReportFilterValue = {
  from: string
  to: string
  ownerId: string
  stage: DealStage | ''
}

interface ReportFiltersProps {
  value: ReportFilterValue
  onChange: (value: ReportFilterValue) => void
  users: User[]
  isFetching?: boolean
}

export function ReportFilters({
  value,
  onChange,
  users,
  isFetching = false,
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

  function patch(partial: Partial<ReportFilterValue>) {
    onChange({ ...value, ...partial })
  }

  return (
    <div className="flex flex-wrap items-end gap-2">
      <DatePicker
        label={t('reports.filters.from')}
        value={value.from}
        max={value.to || undefined}
        onChange={(from) => patch({ from })}
        className="w-44"
      />
      <DatePicker
        label={t('reports.filters.to')}
        value={value.to}
        min={value.from || undefined}
        onChange={(to) => patch({ to })}
        className="w-44"
      />
      <Select
        label={t('reports.filters.owner')}
        options={ownerOptions}
        value={value.ownerId}
        onChange={(ownerId) => patch({ ownerId })}
        className="w-44"
      />
      <Select
        label={t('reports.filters.stage')}
        options={stageOptions}
        value={value.stage}
        onChange={(stage) => patch({ stage: stage as DealStage | '' })}
        className="w-44"
      />
      {isFetching ? (
        <span
          className="mb-2 inline-block size-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700"
          aria-label={t('common.loading')}
          role="status"
        />
      ) : null}
    </div>
  )
}
