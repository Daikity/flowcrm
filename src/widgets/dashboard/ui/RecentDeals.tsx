import { useTranslation } from 'react-i18next'
import type { Deal, DealStage } from '@/entities/deal'
import { formatCurrency, formatDate } from '@/shared/lib'
import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
} from '@/shared/ui'

interface RecentDealsProps {
  deals: Deal[]
}

const stageVariant: Record<
  DealStage,
  'neutral' | 'primary' | 'success' | 'warning' | 'danger'
> = {
  lead: 'neutral',
  qualified: 'primary',
  proposal: 'warning',
  negotiation: 'warning',
  won: 'success',
  lost: 'danger',
}

export function RecentDeals({ deals }: RecentDealsProps) {
  const { t, i18n } = useTranslation()

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-5 pb-0">
        <CardHeader>
          <CardTitle>{t('dashboard.recentDeals.title')}</CardTitle>
          <CardDescription>
            {t('dashboard.recentDeals.description')}
          </CardDescription>
        </CardHeader>
      </div>
      <Table>
        <THead>
          <TR>
            <TH>{t('dashboard.recentDeals.columns.deal')}</TH>
            <TH>{t('dashboard.recentDeals.columns.stage')}</TH>
            <TH>{t('dashboard.recentDeals.columns.value')}</TH>
            <TH>{t('dashboard.recentDeals.columns.created')}</TH>
          </TR>
        </THead>
        <TBody>
          {deals.map((deal) => (
            <TR key={deal.id}>
              <TD className="font-medium">{deal.title}</TD>
              <TD>
                <Badge variant={stageVariant[deal.stage]}>
                  {t(`enums.dealStage.${deal.stage}`)}
                </Badge>
              </TD>
              <TD>{formatCurrency(deal.value)}</TD>
              <TD>{formatDate(deal.createdAt, i18n.language)}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </Card>
  )
}
