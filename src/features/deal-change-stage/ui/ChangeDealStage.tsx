import {
  DEAL_STAGE_LABEL,
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

const stageOptions = DEAL_STAGES.map((stage) => ({
  value: stage,
  label: DEAL_STAGE_LABEL[stage],
}))

export function ChangeDealStage({
  deal,
  className,
  compact = true,
}: ChangeDealStageProps) {
  const [updateDeal, { isLoading }] = useUpdateDealMutation()

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
        label={`Change stage for ${deal.title}`}
      />
    </div>
  )
}
