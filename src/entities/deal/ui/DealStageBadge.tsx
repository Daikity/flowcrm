import { Badge } from '@/shared/ui'
import { DEAL_STAGE_LABEL, DEAL_STAGE_VARIANT } from '../model/constants'
import type { DealStage } from '../model/types'

interface DealStageBadgeProps {
  stage: DealStage
}

export function DealStageBadge({ stage }: DealStageBadgeProps) {
  return (
    <Badge variant={DEAL_STAGE_VARIANT[stage]}>{DEAL_STAGE_LABEL[stage]}</Badge>
  )
}
