import { useTranslation } from 'react-i18next'
import { Badge } from '@/shared/ui'
import { DEAL_STAGE_VARIANT } from '../model/constants'
import type { DealStage } from '../model/types'

interface DealStageBadgeProps {
  stage: DealStage
}

export function DealStageBadge({ stage }: DealStageBadgeProps) {
  const { t } = useTranslation()

  return (
    <Badge variant={DEAL_STAGE_VARIANT[stage]}>
      {t(`enums.dealStage.${stage}`)}
    </Badge>
  )
}
