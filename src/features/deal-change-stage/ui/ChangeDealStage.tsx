import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  DEAL_STAGE_PROBABILITY,
  DEAL_STAGES,
  type DealListItem,
  type DealStage,
} from '@/entities/deal'
import { useUpdateDealMutation } from '@/shared/api'
import { Select } from '@/shared/ui'

interface ChangeDealStageProps {
  deal: DealListItem
  className?: string
  /** Hide label visually but keep it for a11y */
  compact?: boolean
}

export function ChangeDealStage({
  deal,
  className,
  compact = true,
}: ChangeDealStageProps) {
  const { t } = useTranslation()
  const [updateDeal, { isLoading }] = useUpdateDealMutation()

  const stageOptions = useMemo(
    () =>
      DEAL_STAGES.map((stage) => ({
        value: stage,
        label: t(`enums.dealStage.${stage}`),
      })),
    [t],
  )

  async function handleChange(value: string) {
    const stage = value as DealStage
    if (stage === deal.stage) return

    try {
      await updateDeal({
        id: deal.id,
        data: {
          stage,
          probability: DEAL_STAGE_PROBABILITY[stage],
        },
      }).unwrap()
    } catch {
      // UI остаётся на текущем stage из кэша при ошибке
    }
  }

  return (
    <div className={compact ? '[&_label]:sr-only' : undefined}>
      <Select
        options={stageOptions}
        value={deal.stage}
        onChange={(value) => void handleChange(value)}
        disabled={isLoading}
        className={className ?? 'w-36'}
        label={t('deals.changeStage.aria', { title: deal.title })}
      />
    </div>
  )
}
